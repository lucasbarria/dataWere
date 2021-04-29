let token,aprobado;
let btnIniciar = document.getElementById('input-login-btn');
let logo = document.getElementById('logo');
    
    logo.addEventListener('click', () => {
        window.location.reload();
    });
// FUNCIONAMIENTO DEL BOTON DEL LOGO PARA REFRESCAR LA PAGINA //


// let btnLogo = () => {
//     let logo = document.getElementById('logo');
    
//     logo.addEventListener('click', () => {
//         window.location.reload();
//     });

// }

// btnLogo();


// LLENAR LA TABLA DE CONTACTOS Y ELIMINAR CONTACTOS//////////////////

let llenaTablaContactos = () =>{

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch("http://localhost:3000/contactos", requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result); 
          let tBody = document.getElementById('tBody');

         for(i = 0; i < result.length; i++){
          console.log(i)
            let tr = document.createElement('tr');
            let id_contacto = document.createElement('td');
            let fullname = document.createElement('td');
            let cargo = document.createElement('td');
            let email = document.createElement('td');
            let compania = document.createElement('td');
            let id_region = document.createElement('td');
            let id_pais = document.createElement('td');
            let id_ciudad = document.createElement('td');
            let direccion = document.createElement('td');

            let editar = document.createElement('td');
            //MORE ACA DEBEERIA ESTAR LA CREACION DEL EDITAR
            let editarI = document.createElement('i')
            let eliminarI = document.createElement('i')
           
            editarI.classList.add('fas', 'fa-edit')
            eliminarI.classList.add('far', 'fa-trash-alt')



            tBody.appendChild(tr);
            tr.appendChild(id_contacto);
            tr.appendChild(fullname);
            tr.appendChild(cargo);
            tr.appendChild(email);
            tr.appendChild(compania);
            tr.appendChild(id_region);
            tr.appendChild(id_pais);
            tr.appendChild(id_ciudad);
            tr.appendChild(direccion);
            tr.appendChild(editar);
            id_contacto.textContent = result[i].id_contacto;
            fullname.textContent = result[i].fullname;
            cargo.textContent = result[i].cargo;
            email.textContent = result[i].email;
            compania.textContent = result[i].compania;
            id_region.textContent = result[i].id_region;
            id_pais.textContent = result[i].id_pais;
            id_ciudad.textContent = result[i].id_ciudad;
            direccion.textContent = result[i].direccion;
            editar.appendChild(editarI);
            editar.appendChild(eliminarI);

            let resultado = result[i];

            editarI.addEventListener('click', function(){ventanaEditarContactos(resultado)});
            eliminarI.addEventListener('click', () => {

                var myHeaders = new Headers();
                myHeaders.append("Authorization", `Bearer ${token}` );
                myHeaders.append("Content-Type", "application/json");
                
                var requestOptions = {
                  method: 'DELETE',
                  headers: myHeaders,
                  redirect: 'follow'
                };
                
                fetch(`http://localhost:3000/contactos/${resultado.id_contacto}`, requestOptions)
                  .then(response => response.json())
                  .then(result => {

                    alert('Estas seguro que desea eliminar este contacto?');

                      document.getElementById('tBody').innerHTML = '';
                      llenaTablaContactos();
                
                })
                  .catch(error => console.log('error', error));
    
            
            });
            
        }
        })
        
        .catch(error => console.log('error', error));

}


// FUNCIONAMIENTO DE LA VENTANA DE EDITAR CONTACTOS//////////////////////////////////

let ventanaEditarContactos = (resultado) => {
console.log('ventana edita r cotasdas')
    let ventana = document.createElement('div');
    let popUp = document.createElement('div');
    let tituloEditar = document.createElement('h3');
    let form = document.createElement('div');
    let contenedorInput = document.createElement('div');
    let nombreInput = document.createElement('input');
    let cargoInput = document.createElement('input');
    let emailInput = document.createElement('input');
    let companiaInput = document.createElement('input');
    let regionInput = document.createElement('input');
    let paisInput = document.createElement('input');
    let ciudadInput = document.createElement('input');
    let direccionInput = document.createElement('input');
    let nombreLabel = document.createElement('label');
    let cargoLabel = document.createElement('label');
    let emailLabel = document.createElement('label');
    let companiaLabel = document.createElement('label');
    let regionLabel = document.createElement('label');
    let paisLabel = document.createElement('label');
    let ciudadLabel = document.createElement('label');
    let direccionLabel = document.createElement('label');
    let btnConfirmar = document.createElement('button');
    let btnCerrar = document.createElement('i');

    document.getElementById('main').appendChild(ventana);

    ventana.appendChild(popUp);
    popUp.appendChild(tituloEditar);
    popUp.appendChild(btnCerrar);
    popUp.appendChild(form);
    form.appendChild(contenedorInput);
    contenedorInput.appendChild(nombreLabel);
    contenedorInput.appendChild(nombreInput);
    contenedorInput.appendChild(cargoLabel);
    contenedorInput.appendChild(cargoInput);
    contenedorInput.appendChild(emailLabel);
    contenedorInput.appendChild(emailInput);
    contenedorInput.appendChild(companiaLabel);
    contenedorInput.appendChild(companiaInput);
    contenedorInput.appendChild(regionLabel);
    contenedorInput.appendChild(regionInput);
    contenedorInput.appendChild(paisLabel);
    contenedorInput.appendChild(paisInput);
    contenedorInput.appendChild(ciudadLabel);
    contenedorInput.appendChild(ciudadInput);
    contenedorInput.appendChild(direccionLabel);
    contenedorInput.appendChild(direccionInput);
    form.appendChild(btnConfirmar);

    ventana.id = 'ventana-editar-contactos';

    tituloEditar.textContent = 'Crear Contactos';
    tituloEditar.className = 'titulo-editar-contactos';

    btnCerrar.className = 'fas fa-times';
    btnCerrar.id = 'btn-cerrar';

    ventana.className = 'ventana';
    popUp.className = 'popUp-editar';
    form.className = 'form-editar';
    contenedorInput.className = 'contenedor-input';
    nombreInput.className = 'input-editar';
    cargoInput.className = 'input-editar';
    emailInput.className = 'input-editar';
    companiaInput.className = 'input-editar';
    regionInput.className = 'input-editar';
    paisInput.className = 'input-editar';
    ciudadInput.className = 'input-editar';
    direccionInput.className = 'input-editar';

    nombreInput.id = 'input-nombre-editar';
    cargoInput.id = 'input-cargo-editar';
    emailInput.id = 'input-email-editar';
    companiaInputide = 'input-compania-editar';
    regionInput.id = 'input-region-editar';
    paisInput.id = 'input-pais-editar';
    ciudadInput.id = 'input-ciudad-editar';
    direccionInput.id = 'input-direccion-editar';

    btnConfirmar.className = 'btn-confirmar-editar';
    btnConfirmar.id = 'btn-confirmar-editar';

    nombreLabel.className = 'label-editar';
    cargoLabel.className = 'label-editar';
    emailLabel.className = 'label-editar';
    companiaLabel.className = 'label-editar';
    regionLabel.className = 'label-editar';
    paisLabel.className = 'label-editar';
    ciudadLabel.className = 'label-editar';
    direccionLabel.className = 'label-editar';

    nombreLabel.textContent = 'Nombre Completo';
    cargoLabel.textContent = 'Cargo';
    emailLabel.textContent = 'Email';
    companiaLabel.textContent = 'Compania';
    regionLabel.textContent = 'Region';
    paisLabel.textContent = 'Pais';
    ciudadLabel.textContent = 'Ciudad';
    direccionLabel.textContent = 'Direccion';

    if (resultado) {

        console.log(resultado);
        nombreInput.value = resultado.fullname
        cargoInput.value = resultado.cargo
        emailInput.value = resultado.email
        companiaInput.value = resultado.compania
        regionInput.value = resultado.id_region
        paisInput.value = resultado.id_pais
        ciudadInput.value = resultado.id_ciudad
        direccionInput.value = resultado.direccion

        btnConfirmar.addEventListener('click', () => {

            console.log('lo confirmo');
            let nombre = nombreInput.value;
            let cargo = cargoInput.value;
            let email = emailInput.value;
            let compania = companiaInput.value;
            let id_region = regionInput.value;
            let id_pais = paisInput.value;
            let id_ciudad = ciudadInput.value;
            let direccion = direccionInput.value;
    
            var myHeaders = new Headers();
                myHeaders.append("Authorization", `Bearer ${token}` );
                myHeaders.append("Content-Type", "application/json");
                
                var raw = JSON.stringify({"fullname":nombre ,"cargo": cargo,"email": email,"compania": compania,"id_region":id_region ,"id_pais": id_pais,"id_ciudad": id_ciudad,"direccion": direccion, "active": 'si'});
                
                console.log(raw);
                var requestOptions = {
                  method: 'PATCH',
                  headers: myHeaders,
                  body: raw,
                  redirect: 'follow'
                };
                
                fetch(`http://localhost:3000/contactos/${resultado.id_contacto}`, requestOptions)
                  .then(response => response.json())
                  .then(result => {
                      ventana.remove()
                    
                      document.getElementById('tBody').innerHTML = '';
                      llenaTablaContactos();
                
                })
                  .catch(error => console.log('error', error));
    
            
        });
        
    } else {
        console.log('entro al else');

        btnConfirmar.addEventListener('click', () => {

            console.log('HIZO CLICK');
            let nombre = nombreInput.value;
            let cargo = cargoInput.value;
            let email = emailInput.value;
            let compania = companiaInput.value;
            let id_region = regionInput.value;
            let id_pais = paisInput.value;
            let id_ciudad = ciudadInput.value;
            let direccion = direccionInput.value;
    
            var myHeaders = new Headers();
                myHeaders.append("Authorization", `Bearer ${token}` );
                myHeaders.append("Content-Type", "application/json");
                
                var raw = JSON.stringify({"fullname":nombre ,"cargo": cargo,"email": email,"compania": compania,"id_region":id_region ,"id_pais": id_pais,"id_ciudad": id_ciudad,"direccion": direccion, "active": 'si'});
                
                console.log(raw);
                var requestOptions = {
                  method: 'POST',
                  headers: myHeaders,
                  body: raw,
                  redirect: 'follow'
                };
                
                fetch(`http://localhost:3000/contactos`, requestOptions)
                  .then(response => response.json())
                  .then(result => {
                      ventana.remove()
                      console.log(result);
                      document.getElementById('tBody').innerHTML = '';
                      llenaTablaContactos();
                
                })
                  .catch(error => console.log('error', error));
    
            
        });
        

    }

    btnConfirmar.textContent = 'Confirmar';

    document.getElementById('btn-cerrar').addEventListener('click', () => {
        document.getElementById('ventana-editar-contactos').remove();
    });
    
    
    

}

// FUNCION QUE CREA LA SECCION DE CONTACTOS/////////////////////////

let creaContactos = () => {

    let seccionContactos = document.createElement('section');
    seccionContactos.id = 'seccion-contactos'
    seccionContactos.className = 'seccion-contactos'
    document.getElementById('main').appendChild(seccionContactos);
    let tablaContactos = document.createElement('table');
    tablaContactos.className = 'tablaContactos';
    tablaContactos.id = 'tablaContactos';
    let tHead = document.createElement('thead');
    let tBody = document.createElement('tbody');
    tBody.id = 'tBody';
    let tr = document.createElement('tr');

    let tituloContactos = document.createElement('h2');

    tituloContactos.className = 'tituloContactos';

    let th1 = document.createElement('th');
    let th2 = document.createElement('th');
    let th3 = document.createElement('th');
    let th4 = document.createElement('th');
    let th5 = document.createElement('th');
    let th6 = document.createElement('th');
    let th7 = document.createElement('th');
    let th8 = document.createElement('th');
    let th9 = document.createElement('th');
    let th10 = document.createElement('th');
    let btnEditar = document.createElement('button');

    btnEditar.className = 'btn-editar';
    btnEditar.textContent = 'Crear Contacto';
    btnEditar.id = 'btn-editar';

    th1.textContent = 'Id';
    th2.textContent = 'Nombre Completo';
    th3.textContent = 'Cargo';
    th4.textContent = 'Email';
    th5.textContent = 'Compania';
    th6.textContent = 'Id_region';
    th7.textContent = 'Id_pais';
    th8.textContent = 'Id_ciudad';
    th9.textContent = 'Direccion';
    th10.textContent = 'Acciones';

    tituloContactos.textContent = 'Contactos';
    

   
    seccionContactos.appendChild(tituloContactos);
    tHead.appendChild(th1);
    tHead.appendChild(th2);
    tHead.appendChild(th3);
    tHead.appendChild(th4);
    tHead.appendChild(th5);
    tHead.appendChild(th6);
    tHead.appendChild(th7);
    tHead.appendChild(th8);
    tHead.appendChild(th9);
    tHead.appendChild(th10);
    

    seccionContactos.appendChild(tablaContactos);
    seccionContactos.appendChild(btnEditar);
    tablaContactos.appendChild(tHead);
    tablaContactos.appendChild(tBody);
    tBody.appendChild(tr);
    

    btnEditar.addEventListener('click', () => {
        ventanaEditarContactos();



    });

    
 llenaTablaContactos();
    

}






let bigBang = () => {

    document.getElementById('header').style.display = 'flex';
    // let seccionContactos = document.getElementById('seccion-contactos');
    // let nav = document.getElementById('menu');
    let ul = document.getElementById('lista');
    let liContactos = document.createElement('li');
    let liCompanias = document.createElement('li');
    let liUsuarios;
    if(aprobado == 'si'){  liUsuarios = document.createElement('li');
    }
    
    let liRegiones = document.createElement('li');
    let link1 = document.createElement('a');
    let link2 = document.createElement('a');
    let link3 = document.createElement('a');
    let link4 = document.createElement('a');

    liContactos.id = 'li-contactos';
    liCompanias.id = 'li-companias';
    if(aprobado == 'si'){ liUsuarios.id = 'li-usuarios';}
    liRegiones.id = 'li-regiones';

    liContactos.className = 'li-contactos';
    liCompanias.className = 'li-companias';
    if(aprobado == 'si'){ liUsuarios.className = 'li-usuarios';}
    liRegiones.className = 'li-region';

    link1.id = 'a-contactos';
    link2.id = 'a-companias';
    link3.id = 'a-usuarios';
    link4.id = 'a-region';

    link1.className = 'a-contactos';
    link2.className = 'a-companias';
    link3.className = 'a-usuarios';
    link4.className = 'a-region';

    link1.textContent = 'Contactos';
    link2.textContent = 'Companias';
    link3.textContent = 'Usuarios';
    link4.textContent = 'Regiones';


    // nav.appendChild(ul);
    ul.appendChild(liContactos);
    ul.appendChild(liCompanias);
    if(aprobado == 'si'){ul.appendChild(liUsuarios);}
    
    ul.appendChild(liRegiones);
    liContactos.appendChild(link1);
    liCompanias.appendChild(link2);
    if(aprobado == 'si'){liUsuarios.appendChild(link3);}
    
    liRegiones.appendChild(link4);

    creaContactos();
    
    liContactos.addEventListener('click', () => {
        creaContactos();
        // llenaTablaContactos();
        // document.getElementById('seccion-companias').remove();
        // document.getElementById('seccion-usuarios').remove();
        document.getElementsByTagName('section')[1].remove()
    });

    liCompanias.addEventListener('click', () => {
        creaSeccionCompanias();
        // llenaTablaCompanias();
        // document.getElementById('seccion-contactos').remove();
        // document.getElementById('seccion-usuarios').remove();
        document.getElementsByTagName('section')[1].remove()

        

    });
    if(aprobado == 'si'){
    liUsuarios.addEventListener('click', () => {
        creaSeccionUsuarios();
        // llenaTablaUsuarios();
        // document.getElementById('seccion-contactos').remove();
        // document.getElementById('seccion-companias').remove();
        // document.getElementById('seccion-regiones').remove();
        document.getElementsByTagName('section')[1].remove()


    });}

    liRegiones.addEventListener('click', () => {
        creaSeccionRegiones();
        // document.getElementById('seccion-contactos').remove();
        // document.getElementById('seccion-companias').remove();
        // document.getElementById('seccion-usuarios').remove();
        document.getElementsByTagName('section')[1].remove()
    });
    
}





let inicioSesion = () => {
    let user = document.getElementById('input-user').value;
    let pass = document.getElementById('input-pass-log').value;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({"perfil": user, "pass": pass});
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://localhost:3000/usuarios/login", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result); 
            token = result.token;
            aprobado = result.admin;
            console.log(result)
            
            
            if(token){

                bigBang();

               document.getElementById('seccion-login').remove();
                
     
            }
        })
         .catch(error => console.log('error', error));

      
    
}
btnIniciar.addEventListener('click', inicioSesion);
// elimina more
// let btnIniciarSesion = () => {

   
// let btnIniciar = document.getElementById('input-login-btn');

// btnIniciar.addEventListener('click', inicioSesion);


// }
// btnIniciarSesion();




// SECCION DE COMPANIAS ///////////////////////////////////////////////////////////////


let creaSeccionCompanias = () => {

    let seccionCompanias = document.createElement('section');
    seccionCompanias.id = 'seccion-companias'
    seccionCompanias.className = 'seccion-companias'
    document.getElementById('main').appendChild(seccionCompanias);
    let tablaCompanias = document.createElement('table');
    tablaCompanias.className = 'tablaCompanias';
    tablaCompanias.id = 'tablaCompanias';
    let tHead = document.createElement('thead');
    let tBody = document.createElement('tbody');
    tBody.id = 'tBodyCompanias';
    let tr = document.createElement('tr');

    let tituloCompanias = document.createElement('h2');

    tituloCompanias.className = 'tituloCompanias';

    let th1 = document.createElement('th');
    let th2 = document.createElement('th');
    let th3 = document.createElement('th');
    let th4 = document.createElement('th');
    let th5 = document.createElement('th');
    let th6 = document.createElement('th');
    // let th7 = document.createElement('th');
    let th8 = document.createElement('th');
    let th10 = document.createElement('th');
    // let th9 = document.createElement('th');
    let btnEditar = document.createElement('button');

    btnEditar.className = 'btn-editar';
    btnEditar.textContent = 'Crear Companias';
    btnEditar.id = 'btn-editar';

    th1.textContent = 'Id';
    th2.textContent = 'Id_pais';
    th3.textContent = 'Nombre';
    th4.textContent = 'Direccion';
    th5.textContent = 'Email';
    th6.textContent = 'Telefono';
    // th7.textContent = 'Id_pais'; 
    th8.textContent = 'Id_ciudad';
    th10.textContent = 'Acciones';
    // th9.textContent = 'Direccion';

    tituloCompanias.textContent = 'Companias';
    

   
    seccionCompanias.appendChild(tituloCompanias);
    tHead.appendChild(th1);
    tHead.appendChild(th2);
    tHead.appendChild(th3);
    tHead.appendChild(th4);
    tHead.appendChild(th5);
    tHead.appendChild(th6);
    // tHead.appendChild(th7);
    tHead.appendChild(th8);
    tHead.appendChild(th10);
    // tHead.appendChild(th9);
    

    seccionCompanias.appendChild(tablaCompanias);
    seccionCompanias.appendChild(btnEditar);
    tablaCompanias.appendChild(tHead);
    tablaCompanias.appendChild(tBody);
    tBody.appendChild(tr);
    

    btnEditar.addEventListener('click', () => {
        ventanaCrearCompanias();


    });
    llenaTablaCompanias();
//  llenaTablaContactos();
    
}


let llenaTablaCompanias = () =>{

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch("http://localhost:3000/companias", requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result); 
          let tBody = document.getElementById('tBodyCompanias');

         for(i = 0; i < result.length; i++){

            let tr = document.createElement('tr');
            let id_compania= document.createElement('td');
            let id_pais = document.createElement('td');
            let nombre = document.createElement('td');
            let direccion = document.createElement('td');
            let email = document.createElement('td');
            let telefono = document.createElement('td');
            let id_ciudad = document.createElement('td');
            // let compania = document.createElement('td');
            // let id_region = document.createElement('td');

            let editar = document.createElement('td');
            //MORE ACA DEBEERIA ESTAR LA CREACION DEL EDITAR
            let editarI = document.createElement('i')
            let eliminarI = document.createElement('i')
           
            editarI.classList.add('fas', 'fa-edit')
            // editarI.id = 'btn-editar';
            eliminarI.classList.add('far', 'fa-trash-alt')



            tBody.appendChild(tr);
            tr.appendChild(id_compania);
            tr.appendChild(id_pais);
            tr.appendChild(nombre);
            tr.appendChild(direccion);
            tr.appendChild(email);
            tr.appendChild(telefono);
            tr.appendChild(id_ciudad);
            // tr.appendChild(id_pais);
            // tr.appendChild(direccion);
            tr.appendChild(editar);
            id_compania.textContent = result[i].id_compania;
            id_pais.textContent = result[i].id_pais;
            nombre.textContent = result[i].nombre;
            direccion.textContent = result[i].direccion;
            email.textContent = result[i].email;
            telefono.textContent = result[i].telefono;
            id_ciudad.textContent = result[i].id_ciudad;
            // id_pais.textContent = result[i].id_pais;
            // direccion.textContent = result[i].direccion;
            editar.appendChild(editarI);
            editar.appendChild(eliminarI);

            let resultado = result[i];

            editarI.addEventListener('click', function(){ventanaEditarCompanias(resultado)});
            eliminarI.addEventListener('click', () => {

                var myHeaders = new Headers();
                myHeaders.append("Authorization", `Bearer ${token}` );
                myHeaders.append("Content-Type", "application/json");
                
                var requestOptions = {
                  method: 'DELETE',
                  headers: myHeaders,
                  redirect: 'follow'
                };
                
                fetch(`http://localhost:3000/companias/${resultado.id_compania}`, requestOptions)
                  .then(response => response.json())
                  .then(result => {

                    console.log(result);
                      document.getElementById('tBodyCompanias').innerHTML = '';
                      llenaTablaCompanias();
                
                })
                  .catch(error => console.log('error', error));
    
            
            });
            
        }
        })
        
        .catch(error => console.log('error', error));

}




let ventanaEditarCompanias = (resultado) => {

    let ventana = document.createElement('div');
    let popUp = document.createElement('div');
    let tituloEditar = document.createElement('h3');
    let form = document.createElement('div');
    let contenedorInput = document.createElement('div');
    let id_paisInput = document.createElement('input');
    let nombreInput = document.createElement('input');
    let direccionInput = document.createElement('input');
    let emailInput = document.createElement('input');
    let telefonoInput = document.createElement('input');
    let id_ciudadInput = document.createElement('input');
    
    let id_paisLabel = document.createElement('label');
    let nombreLabel = document.createElement('label');
    let direccionLabel = document.createElement('label');
    let emailLabel = document.createElement('label');
    let telefonoLabel = document.createElement('label');
    let id_ciudadLabel = document.createElement('label');
    
    let btnConfirmar = document.createElement('button');
    let btnCerrar = document.createElement('i');

    document.getElementById('main').appendChild(ventana);

    ventana.appendChild(popUp);
    popUp.appendChild(tituloEditar);
    popUp.appendChild(btnCerrar);
    popUp.appendChild(form);
    form.appendChild(contenedorInput);
    contenedorInput.appendChild(id_paisLabel);
    contenedorInput.appendChild(id_paisInput);
    contenedorInput.appendChild(nombreLabel);
    contenedorInput.appendChild(nombreInput);
    contenedorInput.appendChild(direccionLabel);
    contenedorInput.appendChild(direccionInput);
    contenedorInput.appendChild(emailLabel);
    contenedorInput.appendChild(emailInput);
    contenedorInput.appendChild(telefonoLabel);
    contenedorInput.appendChild(telefonoInput);
    contenedorInput.appendChild(id_ciudadLabel);
    contenedorInput.appendChild(id_ciudadInput);
  
    form.appendChild(btnConfirmar);

    id_paisLabel.textContent = 'Id_pais';
    nombreLabel.textContent = 'Nombre';
    direccionLabel.textContent = 'Direccion';
    emailLabel.textContent = 'Email';
    telefonoLabel.textContent = 'Telefono';
    id_ciudadLabel.textContent = 'Id_ciudad';



    ventana.id = 'ventana-editar-compania';

    tituloEditar.textContent = 'Editar Compania';
    tituloEditar.className = 'titulo-editar-compania';

    btnCerrar.className = 'fas fa-times';
    btnCerrar.id = 'btn-cerrar-editar-compania';

    ventana.className = 'ventana';
    popUp.className = 'popUp-editar';
    form.className = 'form-editar';
    contenedorInput.className = 'contenedor-input';
    id_paisInput.className = 'input-editar';
    nombreInput.className = 'input-editar';
    direccionInput.className = 'input-editar';
    emailInput.className = 'input-editar';
    telefonoInput.className = 'input-editar';
    id_ciudadInput.className = 'input-editar';
    // paisInput.className = 'input-editar';
    // ciudadInput.className = 'input-editar';

    id_paisInput.id = 'input-id_pais-editar-compania';
    nombreInput.id = 'input-nombre-editar-compania';
    direccionInput.id = 'input-direccion-editar-compania';
    emailInput.id = 'input-email-editar-compania';
    telefonoInput.id = 'input-telefono-editar-compania';
    id_ciudadInput.id = 'input-id_ciudad-editar-compania';
    // ciudadInput.id = 'input-ciudad-editar';
    // direccionInput.id = 'input-direccion-editar';

    btnConfirmar.className = 'btn-confirmar-editar';
    btnConfirmar.id = 'btn-confirmar-editar';

    id_paisLabel.className = 'label-editar';
    nombreLabel.className = 'label-editar';
    direccionLabel.className = 'label-editar';
    emailLabel.className = 'label-editar';
    telefonoLabel.className = 'label-editar';
    id_ciudadLabel.className = 'label-editar';
    // ciudadLabel.className = 'label-editar';
    // direccionLabel.className = 'label-editar';

    btnConfirmar.textContent = 'Confirmar';
    
    // ciudadLabel.textContent = 'Ciudad';
    // direccionLabel.textContent = 'Direccion';

    if (resultado) {

        console.log(resultado);
        id_paisInput.value = resultado.id_pais
        nombreInput.value = resultado.nombre
        direccionInput.value = resultado.direccion
        emailInput.value = resultado.email
        telefonoInput.value = resultado.telefono
        id_ciudadInput.value = resultado.id_ciudad
        // ciudadInput.value = resultado.id_ciudad
        // direccionInput.value = resultado.direccion

        btnConfirmar.addEventListener('click', () => {

            console.log('lo confirmo');
            let id_pais = id_paisInput.value;
            let nombre = nombreInput.value;
            let direccion = direccionInput.value;
            let email = emailInput.value;
            let telefono = telefonoInput.value;
            let id_ciudad = id_ciudadInput.value;
            // let id_region = regionInput.value;
            // let id_pais = paisInput.value;
    
            var myHeaders = new Headers();
                myHeaders.append("Authorization", `Bearer ${token}` );
                myHeaders.append("Content-Type", "application/json");
                
                var raw = JSON.stringify({"id_pais": id_pais,"nombre": nombre, "direccion": direccion, "email": email, "telefono": telefono, "id_ciudad": id_ciudad, "active": 'si'});
                
                console.log(raw);
                var requestOptions = {
                  method: 'PATCH',
                  headers: myHeaders,
                  body: raw,
                  redirect: 'follow'
                };
                
                fetch(`http://localhost:3000/companias/${resultado.id_compania}`, requestOptions)
                  .then(response => response.json())
                  .then(result => {
                      ventana.remove()
                    
                      document.getElementById('tBodyCompanias').innerHTML = '';
                      llenaTablaCompanias();
                      
                })
                  .catch(error => console.log('error', error));
    
            
        });
        
    } else {
        console.log('entro al else');

        btnConfirmar.addEventListener('click', () => {

            console.log('HIZO CLICK');
            let id_pais = id_paisInput.value;
            let nombre = nombreInput.value;
            let direccion = direccionInput.value;
            let email = emailInput.value;
            let telefono = telefonoInput.value;
            let id_ciudad = id_ciudadInput.value;
    
            var myHeaders = new Headers();
                myHeaders.append("Authorization", `Bearer ${token}` );
                myHeaders.append("Content-Type", "application/json");
                
                var raw = JSON.stringify({"id_pais": id_pais,"nombre": nombre, "direccion": direccion, "email": email, "telefono": telefono, "id_ciudad": id_ciudad, "active": 'si'});
                
                console.log(raw);
                var requestOptions = {
                  method: 'POST',
                  headers: myHeaders,
                  body: raw,
                  redirect: 'follow'
                };
                
                fetch(`http://localhost:3000/companias`, requestOptions)
                  .then(response => response.json())
                  .then(result => {
                      ventana.remove()
                      console.log(result);
                      document.getElementById('tBodyCompanias').innerHTML = '';
                      llenaTablaCompanias();
                
                })
                  .catch(error => console.log('error', error));
    
            
        });
        

    }

    btnConfirmar.textContent = 'Confirmar';

    document.getElementById('btn-cerrar-editar-compania').addEventListener('click', () => {
        document.getElementById('ventana-editar-compania').remove();
    });
        

}





let ventanaCrearCompanias = () => {

    let ventana = document.createElement('div');
    let popUp = document.createElement('div');
    let tituloEditar = document.createElement('h3');
    let form = document.createElement('div');
    let contenedorInput = document.createElement('div');
    let id_paisInput = document.createElement('input');
    let nombreInput = document.createElement('input');
    let direccionInput = document.createElement('input');
    let emailInput = document.createElement('input');
    let telefonoInput = document.createElement('input');
    let id_ciudadInput = document.createElement('input');
    // let paisInput = document.createElement('input');
    // let ciudadInput = document.createElement('input');
    let id_paisLabel = document.createElement('label');
    let nombreLabel = document.createElement('label');
    let direccionLabel = document.createElement('label');
    let emailLabel = document.createElement('label');
    let telefonoLabel = document.createElement('label');
    let id_ciudadLabel = document.createElement('label');
    // let paisLabel = document.createElement('label');
    // let ciudadLabel = document.createElement('label');
    let btnConfirmar = document.createElement('button');
    let btnCerrar = document.createElement('i');

    document.getElementById('main').appendChild(ventana);

    ventana.appendChild(popUp);
    popUp.appendChild(tituloEditar);
    popUp.appendChild(btnCerrar);
    popUp.appendChild(form);
    form.appendChild(contenedorInput);
    contenedorInput.appendChild(id_paisLabel);
    contenedorInput.appendChild(id_paisInput);
    contenedorInput.appendChild(nombreLabel);
    contenedorInput.appendChild(nombreInput);
    contenedorInput.appendChild(direccionLabel);
    contenedorInput.appendChild(direccionInput);
    contenedorInput.appendChild(emailLabel);
    contenedorInput.appendChild(emailInput);
    contenedorInput.appendChild(telefonoLabel);
    contenedorInput.appendChild(telefonoInput);
    contenedorInput.appendChild(id_ciudadLabel);
    contenedorInput.appendChild(id_ciudadInput);
  
    form.appendChild(btnConfirmar);

    ventana.id = 'ventana-crear-compania';

    tituloEditar.textContent = 'Crear Compania';
    tituloEditar.className = 'titulo-editar-compania';

    btnCerrar.className = 'fas fa-times';
    btnCerrar.id = 'btn-cerrar-editar-compania';

    ventana.className = 'ventana';
    popUp.className = 'popUp-editar';
    form.className = 'form-editar';
    contenedorInput.className = 'contenedor-input';
    id_paisInput.className = 'input-editar';
    nombreInput.className = 'input-editar';
    direccionInput.className = 'input-editar';
    emailInput.className = 'input-editar';
    telefonoInput.className = 'input-editar';
    id_ciudadInput.className = 'input-editar';
  
    // id_paisInput.id = 'input-id_pais-editar-compania';
    // nombreInput.id = 'input-nombre-editar-compania';
    // direccionInput.id = 'input-direccion-editar-compania';
    // emailInput.id = 'input-email-editar-compania';
    // telefonoInput.id = 'input-telefono-editar-compania';
    // id_ciudadInput.id = 'input-id_ciudad-editar-compania';
    // ciudadInput.id = 'input-ciudad-editar';
    // direccionInput.id = 'input-direccion-editar';

    btnConfirmar.className = 'btn-confirmar-editar';
    btnConfirmar.id = 'btn-confirmar-editar';
    btnConfirmar.textContent = 'Confirmar';
    
    id_paisLabel.className = 'label-editar';
    nombreLabel.className = 'label-editar';
    direccionLabel.className = 'label-editar';
    emailLabel.className = 'label-editar';
    telefonoLabel.className = 'label-editar';
    id_ciudadLabel.className = 'label-editar';
    id_ciudadLabel.className = 'label-editar';
    direccionLabel.className = 'label-editar';

    id_paisLabel.textContent = 'Id_pais';
    nombreLabel.textContent = 'Nombre';
    direccionLabel.textContent = 'Direccion';
    emailLabel.textContent = 'Email';
    telefonoLabel.textContent = 'Telefono';
    id_ciudadLabel.textContent = 'Id_ciudad';


    btnConfirmar.addEventListener('click', () => {

        console.log('HIZO CLICK');
        let id_pais = id_paisInput.value;
        let nombre = nombreInput.value;
        let direccion = direccionInput.value;
        let email = emailInput.value;
        let telefono = telefonoInput.value;
        let id_ciudad = id_ciudadInput.value;

        var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}` );
            myHeaders.append("Content-Type", "application/json");
            
            var raw = JSON.stringify({"id_pais": id_pais,"nombre": nombre, "direccion": direccion, "email": email, "telefono": telefono, "id_ciudad": id_ciudad, "active": 'si'});
            
            console.log(raw);
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
            
            fetch(`http://localhost:3000/companias`, requestOptions)
              .then(response => response.json())
              .then(result => {
                  ventana.remove()
                  console.log(result);
                  document.getElementById('tBodyCompanias').innerHTML = '';
                  llenaTablaCompanias();
            
            })
              .catch(error => console.log('error', error));

        
    });


    btnCerrar.addEventListener('click', () => {
        document.getElementById('ventana-crear-compania').remove();
    });



}



// SECCION USUARIOS /////////////////////////////////////////////////////////

let creaSeccionUsuarios = () => {

    let seccionUsuarios = document.createElement('section');
    seccionUsuarios.id = 'seccion-Usuarios'
    seccionUsuarios.className = 'seccion-companias'
    document.getElementById('main').appendChild(seccionUsuarios);
    let tablaUsuarios = document.createElement('table');
    tablaUsuarios.className = 'tablaCompanias';
    tablaUsuarios.id = 'tablaUsuarios';
    let tHead = document.createElement('thead');
    let tBody = document.createElement('tbody');
    tBody.id = 'tBodyUsuarios';
    let tr = document.createElement('tr');

    let tituloUsuarios = document.createElement('h2');

    tituloUsuarios.className = 'tituloCompanias';

    let th1 = document.createElement('th');
    let th2 = document.createElement('th');
    let th3 = document.createElement('th');
    let th4 = document.createElement('th');
    let th5 = document.createElement('th');
    let th6 = document.createElement('th');
    let th7 = document.createElement('th');
    let th8 = document.createElement('th');
    let th9 = document.createElement('th');
    // let th9 = document.createElement('th');
    let btnEditar = document.createElement('button');

    btnEditar.className = 'btn-editar';
    btnEditar.textContent = 'Crear Usuarios';
    btnEditar.id = 'btn-editar';

    th1.textContent = 'Id';
    th2.textContent = 'Nombre';
    th3.textContent = 'Apellido';
    th4.textContent = 'Email';
    th5.textContent = 'Perfil';
    th6.textContent = 'Password';
    th7.textContent = 'Admin'; 
    th8.textContent = 'Active';
    th9.textContent = 'Acciones';
    // th9.textContent = 'Direccion';

    tituloUsuarios.textContent = 'Usuarios';
    

   
    seccionUsuarios.appendChild(tituloUsuarios);
    tHead.appendChild(th1);
    tHead.appendChild(th2);
    tHead.appendChild(th3);
    tHead.appendChild(th4);
    tHead.appendChild(th5);
    tHead.appendChild(th6);
    tHead.appendChild(th7);
    tHead.appendChild(th8);
    tHead.appendChild(th9);
    // tHead.appendChild(th10);
    

    seccionUsuarios.appendChild(tablaUsuarios);
    seccionUsuarios.appendChild(btnEditar);
    tablaUsuarios.appendChild(tHead);
    tablaUsuarios.appendChild(tBody);
    tBody.appendChild(tr);
    

    btnEditar.addEventListener('click', () => {
        ventanaCrearUsuarios();


    });
 llenaTablaUsuarios();
    
}




let llenaTablaUsuarios = () =>{

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch("http://localhost:3000/usuarios", requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result); 
          let tBody = document.getElementById('tBodyUsuarios');

         for(i = 0; i < result.length; i++){

            let tr = document.createElement('tr');
            let id_usuario = document.createElement('td');
            let nombre = document.createElement('td');
            let apellido = document.createElement('td');
            let email = document.createElement('td');
            let perfil = document.createElement('td');
            let pass = document.createElement('td');
            let admin = document.createElement('td');
            let active = document.createElement('td');
            // let id_region = document.createElement('td');

            let editar = document.createElement('td');
            //MORE ACA DEBEERIA ESTAR LA CREACION DEL EDITAR
            let editarI = document.createElement('i')
            let eliminarI = document.createElement('i')
           
            editarI.classList.add('fas', 'fa-edit')
            eliminarI.classList.add('far', 'fa-trash-alt')



            tBody.appendChild(tr);
            tr.appendChild(id_usuario);
            tr.appendChild(nombre);
            tr.appendChild(apellido);
            tr.appendChild(email);
            tr.appendChild(perfil);
            tr.appendChild(pass);
            tr.appendChild(admin);
            tr.appendChild(active);
            // tr.appendChild(direccion);
            tr.appendChild(editar);
            id_usuario.textContent = result[i].id_usuario;
            nombre.textContent = result[i].nombre;
            apellido.textContent = result[i].apellido;
            email.textContent = result[i].email;
            perfil.textContent = result[i].perfil;
            pass.textContent = result[i].pass;
            admin.textContent = result[i].admin;
            active.textContent = result[i].active;
            // direccion.textContent = result[i].direccion;
            editar.appendChild(editarI);
            editar.appendChild(eliminarI);

            let resultado = result[i];

            editarI.addEventListener('click', function(){ventanaEditarUsuarios(resultado)});
            eliminarI.addEventListener('click', () => {

                var myHeaders = new Headers();
                myHeaders.append("Authorization", `Bearer ${token}` );
                myHeaders.append("Content-Type", "application/json");
                
                var requestOptions = {
                  method: 'DELETE',
                  headers: myHeaders,
                  redirect: 'follow'
                };
                
                fetch(`http://localhost:3000/usuarios/${resultado.id_usuario}`, requestOptions)
                  .then(response => response.json())
                  .then(result => {

                    console.log(result);
                      document.getElementById('tBodyUsuarios').innerHTML = '';
                      llenaTablaUsuarios();
                
                })
                  .catch(error => console.log('error', error));
    
            
            });
            
        }
        })
        
        .catch(error => console.log('error', error));

}




let ventanaEditarUsuarios = (resultado) => {

    let ventana = document.createElement('div');
    let popUp = document.createElement('div');
    let tituloEditar = document.createElement('h3');
    let form = document.createElement('div');
    let contenedorInput = document.createElement('div');
    let nombreInput = document.createElement('input');
    let apellidoInput = document.createElement('input');
    let emailInput = document.createElement('input');
    let perfilInput = document.createElement('input');
    let passInput = document.createElement('input');
    let adminInput = document.createElement('input');
    let activeInput = document.createElement('input');
    
    let nombreLabel = document.createElement('label');
    let apellidoLabel = document.createElement('label');
    let emailLabel = document.createElement('label');
    let perfilLabel = document.createElement('label');
    let passLabel = document.createElement('label');
    let adminLabel = document.createElement('label');
    let activeLabel = document.createElement('label');
    
    let btnConfirmar = document.createElement('button');
    let btnCerrar = document.createElement('i');

    document.getElementById('main').appendChild(ventana);

    ventana.appendChild(popUp);
    popUp.appendChild(tituloEditar);
    popUp.appendChild(btnCerrar);
    popUp.appendChild(form);
    form.appendChild(contenedorInput);
    contenedorInput.appendChild(nombreLabel);
    contenedorInput.appendChild(nombreInput);
    contenedorInput.appendChild(apellidoLabel);
    contenedorInput.appendChild(apellidoInput);
    contenedorInput.appendChild(emailLabel);
    contenedorInput.appendChild(emailInput);
    contenedorInput.appendChild(perfilLabel);
    contenedorInput.appendChild(perfilInput);
    contenedorInput.appendChild(passLabel);
    contenedorInput.appendChild(passInput);
    contenedorInput.appendChild(adminLabel);
    contenedorInput.appendChild(adminInput);
    contenedorInput.appendChild(activeLabel);
    contenedorInput.appendChild(activeInput);
  
    form.appendChild(btnConfirmar);

    nombreLabel.textContent = 'Nombre';
    apellidoLabel.textContent = 'Apellido';
    emailLabel.textContent = 'Email';
    perfilLabel.textContent = 'Perfil';
    passLabel.textContent = 'Password';
    adminLabel.textContent = 'Admin';
    activeLabel.textContent = 'Active';



    ventana.id = 'ventana-editar-usuario';

    tituloEditar.textContent = 'Editar Usuario';
    tituloEditar.className = 'titulo-editar-compania';

    btnCerrar.className = 'fas fa-times';
    btnCerrar.id = 'btn-cerrar-editar-usuario';

    ventana.className = 'ventana';
    popUp.className = 'popUp-editar';
    form.className = 'form-editar';
    contenedorInput.className = 'contenedor-input';
    nombreInput.className = 'input-editar';
    apellidoInput.className = 'input-editar';
    emailInput.className = 'input-editar';
    perfilInput.className = 'input-editar';
    passInput.className = 'input-editar';
    adminInput.className = 'input-editar';
    activeInput.className = 'input-editar';
    // paisInput.className = 'input-editar';
    // ciudadInput.className = 'input-editar';

    nombreInput.id = 'input-nombre-editar-compania';
    apellidoInput.id = 'input-apellido-editar-compania';
    emailInput.id = 'input-email-editar-compania';
    perfilInput.id = 'input-perfil-editar-compania';
    passInput.id = 'input-pass-editar-compania';
    adminInput.id = 'input-admin-editar-compania';
    activeInput.id = 'input-active-editar-compania';
    // ciudadInput.id = 'input-ciudad-editar';
    // direccionInput.id = 'input-direccion-editar';

    btnConfirmar.className = 'btn-confirmar-editar';
    btnConfirmar.id = 'btn-confirmar-editar';

    nombreLabel.className = 'label-editar';
    apellidoLabel.className = 'label-editar';
    emailLabel.className = 'label-editar';
    perfilLabel.className = 'label-editar';
    passLabel.className = 'label-editar';
    adminLabel.className = 'label-editar';
    activeLabel.className = 'label-editar';
    // ciudadLabel.className = 'label-editar';
    // direccionLabel.className = 'label-editar';

    btnConfirmar.textContent = 'Confirmar';
    
    // ciudadLabel.textContent = 'Ciudad';
    // direccionLabel.textContent = 'Direccion';

    if (resultado) {

        console.log(resultado);
        nombreInput.value = resultado.nombre
        apellidoInput.value = resultado.apellido
        emailInput.value = resultado.email
        perfilInput.value = resultado.perfil
        passInput.value = resultado.pass
        adminInput.value = resultado.admin
        activeInput.value = resultado.active
        // ciudadInput.value = resultado.id_ciudad
        // direccionInput.value = resultado.direccion

        btnConfirmar.addEventListener('click', () => {

            console.log('lo confirmo');
            let nombre = nombreInput.value;
            let apellido = apellidoInput.value;
            let email = emailInput.value;
            let perfil = perfilInput.value;
            let pass = passInput.value;
            let admin = adminInput.value;
            let active = activeInput.value;
            // let id_region = regionInput.value;
            // let id_pais = paisInput.value;
    
            var myHeaders = new Headers();
                myHeaders.append("Authorization", `Bearer ${token}` );
                myHeaders.append("Content-Type", "application/json");
                
                var raw = JSON.stringify({"nombre": nombre, "apellido": apellido, "email": email, "perfil": perfil, "pass": pass, "admin": admin, "active": 'si'});
                
                console.log(raw);
                var requestOptions = {
                  method: 'PATCH',
                  headers: myHeaders,
                  body: raw,
                  redirect: 'follow'
                };
                
                fetch(`http://localhost:3000/usuarios/${resultado.id_usuario}`, requestOptions)
                  .then(response => response.json())
                  .then(result => {
                      ventana.remove()
                    
                      document.getElementById('tBodyUsuarios').innerHTML = '';
                      llenaTablaUsuarios();
                      
                })
                  .catch(error => console.log('error', error));
    
            
        });
        
    } else {
        console.log('entro al else');

        btnConfirmar.addEventListener('click', () => {

            console.log('HIZO CLICK');
            let nombre = nombreInput.value;
            let apellido = apellidoInput.value;
            let email = emailInput.value;
            let perfil = perfilInput.value;
            let pass = passInput.value;
            let admin = adminInput.value;
            let active = activeInput.value;
    
            var myHeaders = new Headers();
                myHeaders.append("Authorization", `Bearer ${token}` );
                myHeaders.append("Content-Type", "application/json");
                
                var raw = JSON.stringify({"nombre": nombre, "apellido": apellido, "email": email, "perfil": perfil, "pass": pass, "admin": admin, "active": 'si'});
                
                console.log(raw);
                var requestOptions = {
                  method: 'POST',
                  headers: myHeaders,
                  body: raw,
                  redirect: 'follow'
                };
                
                fetch(`http://localhost:3000/usuarios`, requestOptions)
                  .then(response => response.json())
                  .then(result => {
                      ventana.remove()
                      console.log(result);
                      document.getElementById('tBodyusuarios').innerHTML = '';
                      llenaTablaUsuarios();
                
                })
                  .catch(error => console.log('error', error));
    
            
        });
        

    }

    btnConfirmar.textContent = 'Confirmar';

    document.getElementById('btn-cerrar-editar-usuario').addEventListener('click', () => {
        document.getElementById('ventana-editar-usuario').remove();
    });
        

}



let ventanaCrearUsuarios = () => {

    let ventana = document.createElement('div');
    let popUp = document.createElement('div');
    let tituloEditar = document.createElement('h3');
    let form = document.createElement('div');
    let contenedorInput = document.createElement('div');
    let nombreInput = document.createElement('input');
    let apellidoInput = document.createElement('input');
    let emailInput = document.createElement('input');
    let perfilInput = document.createElement('input');
    let passInput = document.createElement('input');
    let adminInput = document.createElement('input');
    let activeInput = document.createElement('input');
    // let ciudadInput = document.createElement('input');
    let nombreLabel = document.createElement('label');
    let apellidoLabel = document.createElement('label');
    let emailLabel = document.createElement('label');
    let perfilLabel = document.createElement('label');
    let passLabel = document.createElement('label');
    let adminLabel = document.createElement('label');
    let activeLabel = document.createElement('label');
    // let ciudadLabel = document.createElement('label');
    let btnConfirmar = document.createElement('button');
    let btnCerrar = document.createElement('i');

    document.getElementById('main').appendChild(ventana);

    ventana.appendChild(popUp);
    popUp.appendChild(tituloEditar);
    popUp.appendChild(btnCerrar);
    popUp.appendChild(form);
    form.appendChild(contenedorInput);
    contenedorInput.appendChild(nombreLabel);
    contenedorInput.appendChild(nombreInput);
    contenedorInput.appendChild(apellidoLabel);
    contenedorInput.appendChild(apellidoInput);
    contenedorInput.appendChild(emailLabel);
    contenedorInput.appendChild(emailInput);
    contenedorInput.appendChild(perfilLabel);
    contenedorInput.appendChild(perfilInput);
    contenedorInput.appendChild(passLabel);
    contenedorInput.appendChild(passInput);
    contenedorInput.appendChild(adminLabel);
    contenedorInput.appendChild(adminInput);
    // contenedorInput.appendChild(activeLabel);
    // contenedorInput.appendChild(activeInput);
  
    form.appendChild(btnConfirmar);

    ventana.id = 'ventana-crear-usuario';

    tituloEditar.textContent = 'Crear Usuario';
    tituloEditar.className = 'titulo-editar-compania';

    btnCerrar.className = 'fas fa-times';
    btnCerrar.id = 'btn-cerrar-editar-usuario';

    ventana.className = 'ventana';
    popUp.className = 'popUp-editar';
    form.className = 'form-editar';
    contenedorInput.className = 'contenedor-input';
    nombreInput.className = 'input-editar';
    apellidoInput.className = 'input-editar';
    emailInput.className = 'input-editar';
    perfilInput.className = 'input-editar';
    passInput.className = 'input-editar';
    adminInput.className = 'input-editar';
    // activeInput.className = 'input-editar'; saco more
  
    // id_paisInput.id = 'input-id_pais-editar-compania';
    // nombreInput.id = 'input-nombre-editar-compania';
    // direccionInput.id = 'input-direccion-editar-compania';
    // emailInput.id = 'input-email-editar-compania';
    // telefonoInput.id = 'input-telefono-editar-compania';
    // id_ciudadInput.id = 'input-id_ciudad-editar-compania';
    // ciudadInput.id = 'input-ciudad-editar';
    // direccionInput.id = 'input-direccion-editar';

    btnConfirmar.className = 'btn-confirmar-editar';
    btnConfirmar.id = 'btn-confirmar-editar';
    btnConfirmar.textContent = 'Confirmar';
    
    nombreLabel.className = 'label-editar';
    apellidoLabel.className = 'label-editar';
    emailLabel.className = 'label-editar';
    perfilLabel.className = 'label-editar';
    passLabel.className = 'label-editar';
    adminLabel.className = 'label-editar';
    // activeLabel.className = 'label-editar';
    // direccionLabel.className = 'label-editar';

    nombreLabel.textContent = 'Nombre';
    apellidoLabel.textContent = 'Apellido';
    emailLabel.textContent = 'Email';
    perfilLabel.textContent = 'Perfil';
    passLabel.textContent = 'Password';
    adminLabel.textContent = 'Admin';
    // activeLabel.textContent = 'Active';


    btnConfirmar.addEventListener('click', () => {

        console.log('HIZO CLICK');
        let nombre = nombreInput.value;
        let apellido = apellidoInput.value;
        let email = emailInput.value;
        let perfil = perfilInput.value;
        let pass = passInput.value;
        let admin = adminInput.value;
        let active = activeInput.value;

        var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}` );
            myHeaders.append("Content-Type", "application/json");
            
            var raw = JSON.stringify({"nombre": nombre, "apellido": apellido, "email": email, "perfil": perfil, "pass": pass, "admin": admin, "active": 'si'});
            
            console.log(raw);
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
            
            fetch(`http://localhost:3000/usuarios`, requestOptions)
              .then(response => response.json())
              .then(result => {
                  ventana.remove()
                  console.log(result);
                  document.getElementById('tBodyUsuarios').innerHTML = '';
                  llenaTablaUsuarios();
            
            })
              .catch(error => console.log('error', error));

        
    });


    btnCerrar.addEventListener('click', () => {
        document.getElementById('ventana-crear-usuario').remove();
    });



}







// ----------FUNCIONAMIENTO DEL BOTON AGREGAR CANAL---------------//


// let agregarBtn = () => {


//     let btnAgregarCanal = document.getElementById('btn-agregar-canal');
//     let dataAdicional3 = document.getElementById('adicional-data-contactos-3');
//     // dataAdicional3.style.display = 'none';
//     let newContactSection = document.getElementById('new-contact-section');
//     newContactSection.style.display = 'none';
    
//     btnAgregarCanal.addEventListener('click', () => {
            
//         if (newContactSection.style.display == 'block') {
//             dataAdicional3.style.display = 'flex';

//         } else {
//             dataAdicional3.style.display = 'none';
//         }
        
//     });
// }


// agregarBtn();
 



// // ------------FUNCIONAMIENTO DEL BOTON ELIMINAR CANAL-----------//


// let btnEliminarCanal = () => {

//     let newContactSection = document.getElementById('new-contact-section');
//     let dataAdicional3 = document.getElementById('adicional-data-contactos-3');

//     let deleteCanal = document.getElementById('delete-canal');

//     deleteCanal.addEventListener('click', () => {

//         if (newContactSection.style.display == 'block') {
//             dataAdicional3.style.display = 'none';
//         } else {
//             dataAdicional3.style.display = 'flex';
//         }
//     });
// }

// btnEliminarCanal();



// // ----------------CONEXION CON LA API (USUARIOS)-----------------//









// // SECCION REGIONES <--------------------------------------//

// let traerRegiones = (token) => {
//     var myHeaders = new Headers();
//     myHeaders.append("Authorization", `Bearer ${token}`);
    
    
//     var requestOptions = {
//       method: 'GET',
//       headers: myHeaders,
//       redirect: 'follow'
//     };
    
//     fetch("http://localhost:3000/regiones", requestOptions)
//       .then(response => response.json())
//       .then(result => token = result.token)
//       .catch(error => console.log('error', error));

// }

// traerRegiones();



// // FUNCIONAMIENTO DEL BOTON DE REGIONES EN EL HEADER <--------//

// let btnRegiones = () => {
//     let btnRegionesHeader = document.getElementById('li-region');
//     // btnUsuarios();
//     btnRegionesHeader.addEventListener('click', () => {
        
//         if (document.getElementById('search-section').style.display == 'block') {
//             document.getElementById('search-section').remove();
//             document.getElementById('contacts-section').remove();
//             document.getElementById('regiones-section').style.display = 'block';
            
//         } 

//         if (document.getElementById('contenedor-form').style.display == 'block') {
//             document.getElementById('contenedor-form').style.display = 'none';
//             document.getElementById('regiones-section').style.display = 'block';
//         } 

//         // if (document.getElementById('regiones-section').style.display == 'block') {
//         //     document.getElementById('regiones-section').style.display = 'none';
//         //     document.getElementById('contenedor-form').style.display = 'block';
            
//         // } 
 
//     });
// }

// btnRegiones();



// // FUNCIONAMIENTO DEL BOTON DE AGREGAR MAS REGIONES // 


// let btnAgregarRegion = () => {
//     let btnRegion = document.getElementById('btn-agregar-region');
    
//     btnRegion.addEventListener('click', () => {
        
//         let regionesSection = document.getElementById('regiones-section');

//         let contenedor = document.createElement('div');
//         let texto = document.createElement('input');
//         let divIconos = document.createElement('div');
//         let flechaAbajo = document.createElement('i');
//         let iconoBasura = document.createElement('i');
//         let iconoEditar = document.createElement('i');

//         contenedor.setAttribute('class', 'regiones-conteiner');
//         texto.setAttribute('class', 'input-texto');
//         texto.setAttribute('placeholder', 'ingrese NUEVA region');
//         divIconos.setAttribute('class', 'conteiner-icons');
//         flechaAbajo.setAttribute('class', 'fas fa-sort-down');
//         iconoBasura.setAttribute('class', 'fas fa-trash');
//         iconoEditar.setAttribute('class', 'fas fa-edit');
//         // iconoEditar.setAttribute('id', 'editar');

//         regionesSection.appendChild(contenedor);
//         contenedor.appendChild(texto);
//         contenedor.appendChild(divIconos);
//         divIconos.appendChild(flechaAbajo);
//         divIconos.appendChild(iconoBasura);
//         divIconos.appendChild(iconoEditar);

//         var iconosEditar = document.getElementsByClassName('fas fa edit');

//         for (let i = 0; i < iconosEditar.length; i++) {
//             iconosEditar[i].addEventListener('click', editarRegiones());
            
//         }
        
        
//     });
    
    
// }

// btnAgregarRegion();


// //  FUNCIONAMIENTO DEL BOTON DE ELIMINAR REGIONES // 

// // let btnEliminarRegiones = () => {
// //     let btnEliminar = document.getElementsByClassName('fas fa-trash');

// //     btnEliminar.addEventListener('click', () => {
// //         document.getElementById('regiones-section').style.display = 'none';
        
// //     });
// // }

// // btnEliminarRegiones();



// // FUNCIONAMIENTO DEL BOTON DE EDITAR REGIONES // 

// let editarRegiones = () => {
//     // let btnEditar1 = document.getElementById('editar-region-1');
//     // let btnEditar2 = document.getElementById('editar-region-2');
//     // let btnEditar3 = document.getElementById('editar-region-3');
//     // let btnEditar4 = document.getElementById('editar-region-4');
//     // let btnEditar5 = document.getElementById('editar-region-5');
//     // let btnEditar6 = document.getElementById('editar-region-6');
//     let btnEditar = document.getElementsByClassName('fas fa-edit');
    
//     // let btnConfirmar1 = document.getElementById('icon-confirmar1');
//     // let btnConfirmar2 = document.getElementById('icon-confirmar2');
//     // let btnConfirmar3 = document.getElementById('icon-confirmar3');
//     // let btnConfirmar4 = document.getElementById('icon-confirmar4');
//     // let btnConfirmar5 = document.getElementById('icon-confirmar5');
//     // let btnConfirmar6 = document.getElementById('icon-confirmar6');

//     for (let i = 0; i < btnEditar.length; i++) {
//         btnEditar[0].addEventListener('click', () => {
//             let input1 = document.getElementById('input-region1');
//             input1.focus();
//             input1.disabled = false;
//             input1.style.color = 'grey';     
//             let btnConfirmar = document.getElementById('icon-confirmar1');
//             btnConfirmar.style.display = 'block';  
//             btnConfirmar.addEventListener('click', () => {
//                 btnConfirmar.style.display = 'none';
//                 input1.disabled = true;
//                 input1.style.color = 'black'; 
//             });  
//         });

//         btnEditar[1].addEventListener('click', () => {
//             let input2 = document.getElementById('input-region2');
//             input2.focus();
//             input2.disabled = false;
//             input2.style.color = 'grey';  
//             let btnConfirmar = document.getElementById('icon-confirmar2');
//             btnConfirmar.style.display = 'block';  
//             btnConfirmar.addEventListener('click', () => {
//                 btnConfirmar.style.display = 'none';
//                 input2.disabled = true;
//                 input2.style.color = 'black'; 
//             });          
//         });

//         btnEditar[2].addEventListener('click', () => {
//             let input3 = document.getElementById('input-region3');
//             input3.focus();
//             input3.disabled = false;
//             input3.style.color = 'grey';  
//             let btnConfirmar = document.getElementById('icon-confirmar3');
//             btnConfirmar.style.display = 'block';  
//             btnConfirmar.addEventListener('click', () => {
//                 btnConfirmar.style.display = 'none';
//                 input3.disabled = true;
//                 input3.style.color = 'black'; 
//             });          
//         });

//         btnEditar[3].addEventListener('click', () => {
//             let input4 = document.getElementById('input-region4');
//             input4.focus();
//             input4.disabled = false;
//             input4.style.color = 'grey';  
//             let btnConfirmar = document.getElementById('icon-confirmar4');
//             btnConfirmar.style.display = 'block';  
//             btnConfirmar.addEventListener('click', () => {
//                 btnConfirmar.style.display = 'none';
//                 input4.disabled = true;
//                 input4.style.color = 'black'; 
//             });          
//         });

//         btnEditar[4].addEventListener('click', () => {
//             let input5 = document.getElementById('input-region5');
//             input5.focus();
//             input5.disabled = false;
//             input5.style.color = 'grey';  
//             let btnConfirmar = document.getElementById('icon-confirmar5');
//             btnConfirmar.style.display = 'block';  
//             btnConfirmar.addEventListener('click', () => {
//                 btnConfirmar.style.display = 'none';
//                 input5.disabled = true;
//                 input5.style.color = 'black'; 
//             });          
//         });

//         btnEditar[5].addEventListener('click', () => {
//             let input6 = document.getElementById('input-region6');
//             input6.focus();
//             input6.disabled = false;
//             input6.style.color = 'grey';  
//             let btnConfirmar = document.getElementById('icon-confirmar6');
//             btnConfirmar.style.display = 'block';  
//             btnConfirmar.addEventListener('click', () => {
//                 btnConfirmar.style.display = 'none';
//                 input6.disabled = true;
//                 input6.style.color = 'black'; 
//             });          
//         });

        
//     }

    
// }
//  editarRegiones();

// FUNCIONAMIENTO DEL BOTON QUE DESPLIEGA LAS RAMAS DE REGIONES // 
