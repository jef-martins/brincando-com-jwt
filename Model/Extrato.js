const sequelize = require('./bd');
const Sequelize = require('sequelize');
const Extrato = sequelize.define('extratos', {
        idExtrato:{
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descricao: {
                type: Sequelize.STRING
        }
    }
);

module.exports = Extrato;