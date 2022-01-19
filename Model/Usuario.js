const sequelize = require('./bd');
const Sequelize = require('sequelize');
const Usuario = sequelize.define('usuarios', {
        idUsuario:{
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
                type: Sequelize.STRING
        },
        cpf: {
            type: Sequelize.STRING,
            unique: true
        },
        senha: {
            type: Sequelize.STRING
        },
        foto:{
            type: Sequelize.TEXT
        }
    }
);

module.exports = Usuario;