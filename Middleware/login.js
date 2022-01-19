const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, "chave_secreta");
        req.usuario = decode;
        next();
    }catch(e){
        return res.status(401).send({mensagem: "Login Expirado!!"});
    }
    
}