const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    const token = jwt.sign({
        nome: req.usuario.nome,
        cpf: req.usuario.cpf
    },
        "chave_secreta",
        {
            expiresIn: "1m"
        }
    );
    req.token = token;
    console.log(" ");
    console.log("token", token);
    console.log(" ")
    next();
}
