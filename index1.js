const express = require('express');
const sequelize = require('./conexion1.js');
const app = express();
const jwt = require('jsonwebtoken');
// const { QueryTypes } = require('sequelize');
const { validacionjwt } = require('../DATA-WEREHOUSE/middlewares1.js');
const { validateAdminJWT } = require('../DATA-WEREHOUSE/middlewares1.js');
const { validationJwtUser } = require('../DATA-WEREHOUSE/middlewares1.js');
// const {validateAdminJWT, validacionjwt, validateOrderData, validationJwtUser, validateProduct} = require ('./middlewares');
const tokenKey = 'asdfghjkl';
// let infoToken; 


app.use((req, res, next) => {
    // res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
});
app.listen(3000, () => {
    console.log('server iniciado');
});


// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// VARIABLES

// let nombre = document.getElementById('input-name');
// let apellido = document.getElementById('input-lastName');
// let email = document.getElementById('input-email');
// let perfil = document.getElementById('input-profile');
// let pass = document.getElementById('input-password');

app.post('/usuarios', validateAdminJWT, async function(req, res) {
    const {nombre, apellido, email, perfil, pass, admin, active} = req.body; 

    if (!nombre || !apellido || !email || !perfil || !pass || !admin || !active) {
        res.status(400).json('Todos los campos deben estar completos');
    } else {
        try {
            let data = await sequelize.query('INSERT INTO usuarios (nombre, apellido, email, perfil, pass, admin, active) VALUES (?, ?, ?, ?, ?, ?, ?)',
            {
                replacements: [nombre, apellido, email, perfil, pass, admin, active],
                type: sequelize.QueryTypes.INSERT
            });
            // console.log(data);
            res.status(200).json(`El usuario ${req.body.perfil} ha sido creado correctamente`);
        } catch (error) {
            console.log(error);
            res.status(500).json('Error de servidor');
        }
    }
});

// ----------------USUARIOS (GET)--------------------//

app.get('/usuarios', validateAdminJWT, async function (req, res) {
    try {
        const dataUsuarios = await sequelize.query('SELECT * FROM usuarios WHERE active = "si"', 
        {
            type: sequelize.QueryTypes.SELECT
        });
        res.status(200).json(dataUsuarios);
    } catch (error) {
        console.log('error' + error);
        res.status(400).json('Error al encontrar los usuarios, intente nuevamente');
    }
});


// ---------TRAER EL LISTADO DE USUARIOS (GET)--------//


app.get('/usuarios/:id_usuario', validacionjwt, async function(req, res) {
    const {id_usuario} = req.params;
    // console.log('req info token');
    // console.log(req.infoToken, id_usuario);
    // console.log('req info token');
    try {
        if (id_usuario == req.infoToken.id_usuario) {
            let data = await sequelize.query('SELECT * FROM usuarios WHERE id_usuario = ?, active = 1',
            {
                replacements: [id_usuario],
                type: sequelize.QueryTypes.SELECT
            });
            // console.log(data);
            res.status(200).json(data);
        } else {
            res.status(400).json('El usuario que intenta buscar no pertenece al id de usuario');
        }
    } catch (error) {
        console.log(error);
        res.status(500).json('Error de servidor');
    }
});

// -------------------POST (LOGIN)-----------------------//


app.post('/usuarios/login', async function(req, res) {
    const {perfil, pass} = req.body;

    try {
        const data = await sequelize.query('SELECT * FROM usuarios WHERE perfil = ? AND pass = ?',
        {
            replacements: [perfil, pass],
            type: sequelize.QueryTypes.SELECT
        });

        if(data.length == 0) {
            res.status(400).json('Error de LogIn');
        } else {
            let dataToken = {
                'id_usuario': data[0].id_usuario,
                'email': data[0].email,
                'nombre': data[0].nombre,
                'apellido': data[0].apellido,
                'perfil': data[0].perfil,
                'pass': data[0].pass,
                'admin': data[0].admin
            };
            // console.log('dataToken')
            // console.log(dataToken)
            // console.log('dataToken')
            req.infoToken = jwt.sign(dataToken, tokenKey, { expiresIn: '1h' });
            // console.log('ínfor cifrada')
            
            // console.log(jwt.verify(req.infoToken,tokenKey))
            // console.log('infor cifrada')
            res.status(200).json({ status: "Logueo exitoso", token: req.infoToken, admin: data[0].admin});
        }
    } catch (err) {
        console.log('error' + err);
    }

});



// ----------------------USUARIOS (PATCH)--------------------//


app.patch('/usuarios/:id_usuario', validateAdminJWT, async function(req, res) {
    const {nombre, apellido, email, perfil, pass, admin} = req.body;
    const {id_usuario} = req.params;

    try {
        const selectUsuario = await sequelize.query('SELECT * FROM usuarios WHERE id_usuario = ?', 
        {
            replacements: [id_usuario],
            type: sequelize.QueryTypes.SELECT
        });
        if (selectUsuario.length != 0) {
            if (nombre && apellido && email && perfil && pass && admin) {
                try {
                    const updateUsuario = await sequelize.query('UPDATE usuarios SET nombre = ?, apellido = ?, email = ?, perfil = ?, pass = ?, admin = ? WHERE id_usuario = ?', 
                    {
                        replacements: [nombre, apellido, email, perfil, pass, admin, id_usuario],
                        type: sequelize.QueryTypes.UPDATE
                    });
                    res.status(200).json('El usuario se ha modificado correctamente');
                } catch (error) {
                    console.log('error' + error);
                }
            } else {
                res.status(400).json('Error al modificar el usuario. intente nuevamente');
            }
        } else {
            res.status(500).json('Error interno del servidor');
        }
    } catch (error) {
        console.log('error' + error);
    }
});


// --------------------USUARIOS (DELETE)---------------------//


app.delete('/usuarios/:id_usuario', validateAdminJWT, async function(req, res) {
    const active = 'no'; 
    const id_usuario = req.params.id_usuario;

    try {
        const selectUsuario = await sequelize.query('SELECT id_usuario FROM usuarios WHERE id_usuario = ?', 
        {
            replacements: [id_usuario],
            type: sequelize.QueryTypes.SELECT
        });
        if (selectUsuario.length != 0) {
            try {
                updateUsuarioForDelete = await sequelize.query('UPDATE usuarios SET active = ? WHERE id_usuario = ?', 
                {
                    replacements: [active, id_usuario],
                    type: sequelize.QueryTypes.UPDATE
                });
                res.status(200).json('El usuario ha sido desactivado correctamente');
            } catch (error) {
                console.log('error' + error);
            }
        } else {
            res.status(400).json('Error al desactivar el usuario, intente nuevamente');
        }
    } catch (error) {
        console.log('error' + error);
    }
});


// ------------------REGIONES (GET)------------------------//

app.get('/regiones', async function(req, res) {
    try {
        const data = await sequelize.query('SELECT * FROM regiones WHERE ACTIVE = "si"', 
        {
            type: sequelize.QueryTypes.SELECT,
        });
        res.status(200).json(data);
    } catch (error) {
        console.log('error' + error);
    }
});



// --------------------REGIONES (POST)--------------------//


app.post('/regiones', async function (req, res) {
    const { nombre} = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const verificarToken = jwt.verify(token, tokenKey);
    
    try {
       

        const data = await sequelize.query('INSERT INTO regiones ( nombre,active) VALUES ( ?,?)', 
        {
            replacements: [nombre,'si'],
            type: sequelize.QueryTypes.INSERT
        });
        res.status(200).json('La region ha sido agregada correctamente');
    } catch (error) {
        console.log('error' + error);
    }
});



// ----------------REGIONES (DELETE)----------------------//

app.patch('/regiones/:id_region', async function (req, res) {
    const {nombre} = req.body;
    const {id_region} = req.params;

    try {
        const selectRegion = await sequelize.query('SELECT id_region FROM regiones WHERE id_region = ?', 
        {
            replacements: [id_region],
            type: sequelize.QueryTypes.SELECT
        });
        
        if (selectRegion.length != 0) {
            if (nombre) {
                try {
                    const updateRegion = await sequelize.query('UPDATE regiones SET nombre = ? WHERE id_region = ?', 
                    {
                        replacements: [nombre, id_region],
                        type: sequelize.QueryTypes.UPDATE
                    });
                    
                    res.status(200).json('La region se ha modificado correctamente');
                } catch (error) {
                    console.log('error' + error);
                }
            } else {
                res.status(400).json('Error al modificar la region, intentelo nuevamente');
            }
        } else {
            res.status(500).json('Error interno del servidor');
        }
    } catch (error) {
        console.log('error' + error);
    }
});


// -----------------------REGIONES (DELETE)-------------------//


app.delete('/regiones/:id_region', async function (req, res) {
    
    const {id_region} = req.params;
    try {
        const selectRegion = await sequelize.query('SELECT * FROM regiones WHERE id_region = ?', 
        {
            replacements: [id_region],
            type: sequelize.QueryTypes.SELECT
        });
        if (selectRegion.length != 0) {
            try {
                const desactivarRegion = await sequelize.query('UPDATE regiones  SET active = "no" WHERE id_region = ?', 
                
                {
                    replacements: [id_region],
                    type: sequelize.QueryTypes.UPDATE
                });
                res.status(200).json('La region se ha desactivado correctamente');
            } catch {
                console.log(error);
            }
        } else {
            res.status(400).json('Error al desactivar la region, intente nuevamente');
        }
    } catch (error) {
        console.log(error);
    }
});



// ------------------PAISES (GET)--------------------------//


app.get('/paises/:id_region', validationJwtUser, async function (req, res) {
    const {id_region} = req.params;
    // console.log(req.infoToken);
    try {
        let dataPaises = await sequelize.query('SELECT * FROM paises WHERE id_region = ? AND ACTIVE = "si"', 
        {
            replacements: [id_region],
            type: sequelize.QueryTypes.SELECT
        });
        let regiones = {
            region: dataPaises
        }
        // console.log(dataPaises)
        if (dataPaises[0].active === 'si') {
            res.status(200).json(regiones);
        } else {
            res.status(400).json('Pais inexistente');
        }
    } catch (error) {
        console.log('error' + error);
    } 
});



// ------------------PAISES (POST)-----------------------//

app.post('/paises', validationJwtUser, async function (req, res) {
    let { id_region, nombre} = req.body;
    // let active = 'si';

    if (id_region && nombre) {
        try {
            let id = await sequelize.query('SELECT MAX(id_pais) AS id FROM paises',
            {
                type: sequelize.QueryTypes.SELECT
            });


            let nuevoPais = await sequelize.query('INSERT INTO paises (id_pais, id_region, nombre, active) VALUES (?, ?, ?, ?)', 
            {
                replacements: [ id[0].id+1,id_region, nombre, 'si'],
                type: sequelize.QueryTypes.INSERT
            });
            // console.log(nuevoPais);
            res.status(200).json('Pais agregado correctamente');
        } catch (error) {
            console.log('error' + error);
            res.status(400).json('Error al agregar el nuevo pais, intente nuevamente'); 
        }
    } else {
        res.status(401).json('Error, faltan datos');
    }
});


// -----------------PAISES (PATCH)-----------------------//

app.patch('/paises/:id_pais', async function (req, res) {
    const {id_pais} = req.params;
    const {nombre} = req.body;
    try {
        const dataPais = await sequelize.query('SELECT id_pais FROM paises WHERE id_pais = ?', 
        {
            replacements: [id_pais],
            type: sequelize.QueryTypes.SELECT
        });
        // console.log(dataPais);
        if (dataPais.length != 0) {
            if (nombre) {
                const editarPais = await sequelize.query('UPDATE paises SET nombre = ? WHERE id_pais = ?', 
                {
                    replacements: [nombre, id_pais],
                    type: sequelize.QueryTypes.UPDATE
                });
                res.status(200).json('El pais ha sido editado correctamente');
            } else {
                res.status(400).json('Error al intentar editar el pais, intente nuevamente');
            }
        }
    } catch (error) {
        console.log('error' + error);
    }
});


// ------------------PAISES (DELETE)-------------------------//


app.delete('/paises/:id_pais', async function (req, res) {
    const id_pais = req.params.id_pais;
    const active = 'no';

    try {
        const selectPais = await sequelize.query('SELECT id_pais FROM paises WHERE id_pais = ?', 
        {
            replacements: [id_pais],
            type: sequelize.QueryTypes.SELECT
        });
        if (selectPais.length != 0) {
            try {
                const deletePais = await sequelize.query('UPDATE paises SET active = ? WHERE id_pais = ?', 
                {
                    replacements: ['no', id_pais],
                    type: sequelize.QueryTypes.UPDATE
                });
                res.status(200).json('El pais se ha desactivado correctamente');
            } catch {
                console.log('error' + error);
            }
        } else {
            res.status(400).json('Error al dar de baja al pais, intentelo nuevamente');
        }
    } catch (error) {
        console.log('error' + error);
    }
});



// --------------------COMPANIAS (GET)-----------------------//


app.get('/companias', validationJwtUser, async function (req, res) {
    try {
        const dataCompanias = await sequelize.query('SELECT * FROM companias WHERE active = "si"', 
        {
            type: sequelize.QueryTypes.SELECT
        });
        res.status(200).json(dataCompanias);
    } catch (error) {
        res.status(400).json('No se ha podido encontrar las compañias, intente nuevamente');
        console.log('error' + error);
    }
});



app.get('/companias/:id_compania', validationJwtUser, async function (req, res) {
    const {id_compania} = req.params;
    
    try {
        if (id_compania != 0) {
            const dataCompania = await sequelize.query('SELECT * FROM companias WHERE id_compania = ? ', 
            {
                replacements: [id_compania],
                type: sequelize.QueryTypes.SELECT
            });
            res.status(200).json(dataCompania);
        } else {
            res.status(400).json('La compania que desea buscar no pertenece al id de compania que ingreso');
        }
    } catch { 
        console.log('error' + error);
        res.status(500).json('Error interno del servidor');
    }
});


// -------------------COMPANIAS (POST)-----------------------------//

app.post('/companias', async function (req, res) {
    const {id_compania, id_pais, nombre, direccion, email, telefono, id_ciudad, active} = req.body;

    try {
        const postCompanias = await sequelize.query('INSERT INTO companias (id_compania, id_pais, nombre, direccion, email, telefono, id_ciudad, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
        {
            replacements: [id_compania, id_pais, nombre, direccion, email, telefono, id_ciudad, active],
            type: sequelize.QueryTypes.INSERT
        });
        res.status(200).json(`La compania ${nombre} se ha agregado con exito`);
    } catch (error) {
        res.status(400).json('Error al agregar la nueva compania, intentelo nuevamente');
        console.log('error' + error);
    }
});


// -------------------COMPANIAS (PATCH)-----------------------------//

app.patch('/companias/:id_compania', async function (req, res) {

    const {id_compania} = req.params;
    const {id_pais, nombre, direccion, email, telefono, id_ciudad, active} = req.body;

    try {
        const dataCompanias = await sequelize.query('SELECT id_compania FROM companias WHERE id_compania = ?', 
        {
            replacements: [id_compania],
            type: sequelize.QueryTypes.SELECT
        });
        if (dataCompanias.length != 0) {
            if (id_pais && nombre && direccion && email && telefono && id_ciudad && active) {
                try {
                    const updateCompanias = await sequelize.query('UPDATE companias SET id_pais = ?, nombre = ?, direccion = ?, email = ?, telefono = ?, id_ciudad = ?, active = ? WHERE id_compania = ?', 
                    {
                        replacements: [id_pais, nombre, direccion, email, telefono, id_ciudad, active, id_compania], 
                        type: sequelize.QueryTypes.UPDATE
                    });
                    res.status(200).json('La compania se ha modificado correctamente');     
                } catch (error) {
                    console.log('error' + error);
                }
            } else {
                res.status(400).json('Error al editar la compania, intente nuevamente');
            }
        } else {
            res.status(500).json('Error interno del servidor');
        }
    } catch (error) {
        console.log('error' + error);
        
    }
});


// -------------------COMPANIAS (DELETE)-----------------------------//

app.delete('/companias/:id_compania', async function (req, res) {
    const id_compania = req.params.id_compania;
    
    const active = 'no';

    try {
        const selectCompanias = await sequelize.query('SELECT id_compania FROM companias WHERE id_compania = ?', 
        {
            replacements: [id_compania],
            type: sequelize.QueryTypes.SELECT
        });
        if (selectCompanias.length != 0) {
            try {
                const editActive = await sequelize.query('UPDATE companias SET active = ? WHERE id_compania = ?', 
                {
                    replacements: ['no', id_compania],
                    type: sequelize.QueryTypes.UPDATE
                });
                res.status(200).json('El producto se ha desactivado correctamente');
            } catch (error) {
                console.log('error' + error);
            }
        } else {
            res.status(400).json('Error al desactivar el producto, intente nuevamente');
        }
    } catch (error) {
        console.log('error' + error);
        res.status(500).json('Error interno del servidor');
    }
});


// -------------------CONTACTOS (GET)-----------------------------//


app.get('/contactos',validacionjwt, async function (req, res) {
   
    try {
        const dataContactos = await sequelize.query("SELECT * FROM contactos WHERE active = 'si' and id_usuario = ?", 
        {
            replacements: [req.infoToken.id_usuario],
            type: sequelize.QueryTypes.SELECT
        });
        res.status(200).json(dataContactos);
    } catch (error) {
        console.log('error' + error);
        res.status(400).json('Error al encontrar los contactos');
    }
});


// -------------------CONTACTOS (POST)-----------------------------//


app.post('/contactos',validacionjwt,  async function (req, res) { 
    const {fullname, cargo, email, compania, id_region, id_pais, id_ciudad, direccion} = req.body;

    if (!fullname || !cargo || !email || !compania || !id_region || !id_pais || !id_ciudad || !direccion) {
        res.status(400).json('Todos los campos deben estar completos');
    } else {
        try {
            let data = await sequelize.query('INSERT INTO contactos (fullname, cargo, email, compania, id_region, id_pais, id_ciudad, direccion, active, id_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)', 
            {
                replacements: [fullname, cargo, email, compania, id_region, id_pais, id_ciudad, direccion, 'si',req.infoToken.id_usuario],
                type: sequelize.QueryTypes.INSERT
            });
            res.status(200).json(`El contacto ${req.body.fullname}, ha sido agregado correctamente`);
        } catch (error) {
            console.log(error);
            res.status(500).json('Error interno del servidor');
        }
    }
});


// -------------------CONTACTOS (GET)-----------------------------//


app.get('/contactos/:id_contacto', async function (req, res) {
    const {id_contacto} = req.params;
    try {
        if (id_contacto != 0) {
            let data = await sequelize.query('SELECT * FROM contactos WHERE id_contacto = ?', 
            {
                replacements: [id_contacto],
                type: sequelize.QueryTypes.SELECT
            });
            res.status(200).json(data);
        } else {
            res.status(400).json('El contacto que intenta buscar no pertenece al id que ingreso');
        }
    } catch (error) {
        console.log('error' + error);
        res.status(500).json('Error interno del servidor');
    }
});

// -------------------CONTACTOS (PATCH)-----------------------------//


app.patch('/contactos/:id_contacto', validationJwtUser, async function (req, res) {

    const {id_contacto} = req.params;
    const {fullname, cargo, email, compania, id_region, id_pais, id_ciudad, direccion, active} = req.body;

    try {
        const dataContactos = await sequelize.query('SELECT id_contacto FROM contactos WHERE id_contacto = ?', 
        {
            replacements: [id_contacto],
            type: sequelize.QueryTypes.SELECT
        });
        if (dataContactos.length != 0) {
            if (fullname && cargo && email && compania && id_region && id_pais && id_ciudad && direccion && active) {
                try {
                    const updateContactos = await sequelize.query('UPDATE contactos SET fullname = ?, cargo = ?, email = ?, compania = ?, id_region = ?, id_pais = ?, id_ciudad = ?, direccion = ?, active = ? WHERE id_contacto = ?', 
                    {
                        replacements: [fullname, cargo, email, compania, id_region, id_pais, id_ciudad, direccion, active, id_contacto], 
                        type: sequelize.QueryTypes.UPDATE
                    });
                    res.status(200).json('El contacto se ha modificado correctamente');     
                } catch (error) {
                    console.log('error' + error);
                }
            } else {
                res.status(400).json('Error al editar el contacto, intente nuevamente');
            }
        } else {
            res.status(500).json('Error interno del servidor');
        }
    } catch (error) {
        console.log('error' + error);
        
    }
});


// -------------------CONTACTOS (DELETE)-----------------------------//


app.delete('/contactos/:id_contacto', async function (req, res) {
    const id_contacto = req.params.id_contacto;
    const active = 'no';

    try {
        const selectContacto = await sequelize.query('SELECT id_contacto FROM contactos WHERE id_contacto = ?', 
        {
            replacements: [id_contacto],
            type: sequelize.QueryTypes.SELECT
        });
        if (selectContacto.length != 0) {
            try {
                const updateContactos = await sequelize.query('UPDATE contactos SET active = ? WHERE id_contacto = ?', 
                {
                    replacements: [active, id_contacto],
                    type: sequelize.QueryTypes.UPDATE
                });
                res.status(200).json('El contacto ha sido dado de baja con exito');
            } catch (error) {
                console.log('Error' + error);
            }
        } else {
            res.status(400).json('Error al dar de baja al contacto, intente nuevamente');
        }
    } catch (error) {
        console.log('error' + error);
        res.status(500).json('Error interno del servidor');
    }
});



// -------------------CIUDADES (GET)-----------------------------//

app.get('/ciudades', async function (req, res) {
    try {
        const dataciudades = await sequelize.query('SELECT * FROM ciudades WHERE ACTIVE = "si"', 
        {
            type: sequelize.QueryTypes.SELECT
        });
        res.status(200).json(dataciudades);
    } catch (error) {
        res.status(400).json('No se han podido encontrar las ciudades, intente nuevamente');
        console.log('error' + error);
    }
});


// -------------------CIUDADES/:ID (GET)-----------------------------//

app.get('/ciudades/:id_pais', async function (req, res) {
    const id_pais = req.params.id_pais;
    try {
        if (id_pais != null) {
            const selectCiudad = await sequelize.query('SELECT * FROM ciudades WHERE id_pais = ? and ACTIVE = "si"', 
            {
                replacements: [id_pais],
                type: sequelize.QueryTypes.SELECT
            });
            res.status(200).json(selectCiudad);
        } else {
            res.status(400).json('El contacto que desea buscar no pertenece al id ingresado');
        }
        
    } catch (error) {
        res.status(500).json('Error interno del servidor');
        console.log('Error' + error);
    }
});


// -------------------CIUDADES (POST)-----------------------------//

app.post('/ciudades', validationJwtUser, async function (req, res) {
    const {id_pais, nombre} = req.body;

    if ( !id_pais || !nombre) {
        res.status(400).json('Error al agregar la nueva ciudad');
    } else {
        try {
            const dataCiudad = await sequelize.query('INSERT INTO ciudades (id_pais, nombre, active) VALUES ( ?, ?, ?)', 
            {
                replacements: [id_pais, nombre, 'si'],
                type: sequelize.QueryTypes.INSERT
            });
            res.status(200).json('La ciudad ha sido agregada');
        } catch (error) {
            console.log('error' + error);
            res.status(500).json('Error interno del servidor');
        }
    }
});


// -------------------CIUDADES (PATCH)-----------------------------//


app.patch('/ciudades/:id_ciudad', async function (req, res) {
    const id_ciudad = req.params.id_ciudad;
    const {nombre} = req.body;

    try {
        let selectCiudad = await sequelize.query('SELECT id_ciudad FROM ciudades WHERE id_ciudad = ?', 
        {
            replacements: [id_ciudad],
            type: sequelize.QueryTypes.SELECT
        });
        if (selectCiudad.length != 0) {
            if (nombre) {
                try {
                    const updateCiudad = await sequelize.query('UPDATE ciudades  SET nombre = ? WHERE id_ciudad = ?', 
                    {
                        replacements: [nombre, id_ciudad],
                        type: sequelize.QueryTypes.UPDATE
                    });
                    res.status(200).json('La ciudad ha sido modificada con exito');
                } catch (error) {
                    console.log('error' + error);
                }
            } else {
                res.status(400).json('Error al modificar la ciudad, intente nuevamente');
            }
        } else {
            res.status(500).json('Error interno del servidor');
        }
    } catch (error) {
        console.log('error' + error);
    }
});



// -------------------CIUDADES (DELETE)-----------------------------//


app.delete('/ciudades/:id_ciudad', async function (req, res) {
    const active = 'no';
    const {id_ciudad} = req.params;

    try {
        const selectCiudad = await sequelize.query('SELECT id_ciudad FROM ciudades WHERE id_ciudad = ?', 
        {
            replacements: [id_ciudad],
            type: sequelize.QueryTypes.SELECT
        });
        if (selectCiudad.length != 0) {
            try {
                const desactivarCiudad = await sequelize.query('UPDATE ciudades SET active = ? WHERE id_ciudad = ?', 
                {
                    replacements: [active, id_ciudad],
                    type: sequelize.QueryTypes.UPDATE
                });
                res.status(200).json('La ciudad fue desactivada correctamente');
            } catch (error) {
                console.log('error' + error);
            }
        } else {
            res.status(400).json('Error al intentar dar de baja la ciudad, intentelo nuevamente');
        }
    } catch (error) {
        res.status(500).json('Error interno del servidor');
        console.log('error' + error);
    }
});