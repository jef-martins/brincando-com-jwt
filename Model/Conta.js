const sequelize = require('./bd');
const Sequelize = require('sequelize');
const Conta = sequelize.define('contas', {
    idConta: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    saldo: {
        type: Sequelize.FLOAT
    },
    tipoConta: {
        type: Sequelize.STRING
    },
    nConta: {
        type: Sequelize.STRING,
        unique: true
    },
    agencia: {
        type: Sequelize.STRING
    }
});

module.exports = Conta;