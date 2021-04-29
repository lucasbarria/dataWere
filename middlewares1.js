const jwt = require('jsonwebtoken');
const tokenKey = 'asdfghjkl';

const validacionjwt = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const verificarToken = jwt.verify(token, tokenKey);
        if (verificarToken) {
            req.infoToken = verificarToken;
            console.log('req.infoToken en jwt');
            console.log(req.infoToken);
            console.log('req.infoToken en jwt');
            return next();
        }
    } catch (error) {
        res.send(error);
    }
}


function validateAdminJWT(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        
        const verificarToken = jwt.verify(token, tokenKey);

        if (verificarToken) {
            req.infoToken = verificarToken;
            console.log(req.infoToken);
            if (req.infoToken.admin == 'si') {
                console.log('req.infoToken en jwt')
                console.log(req.infoToken)
                console.log('req.infoToken en jwt')
                return next();
            } else {
                console.log(verificarToken)
                res.status(400).json('Error de validacion de token');
            }
        }
    } catch (error) {
        console.log('Error' + error);
        
    }
}


function validationJwtUser (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const verificarToken = jwt.verify(token, tokenKey);
        if (verificarToken) {
            req.infoToken = verificarToken;
            console.log('req.infoToken en jwt');
            console.log(req.infoToken);
            console.log('req.infoToken en jwt');
            return next();
        }
    } catch (error) {
        console.log(error);
        res.status(400).json('Error en la validacion del usuario');
    }
}



module.exports = {validacionjwt, validateAdminJWT, validationJwtUser};