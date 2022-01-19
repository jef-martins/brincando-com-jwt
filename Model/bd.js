const Sequelize = require('sequelize');

const sequelize = new Sequelize('cuca', 'osni', 'osni', {
    host: "10.4.1.72",
    port: "5433",
    schema: "teste",
    dialect: "postgres"
});
/*
var sequelize = new Sequelize({
  dialect: 'mssql',
  dialectModulePath: 'sequelize-msnodesqlv8',
  dialectOptions: {
    connectionString: 'Server=localhost\MSSQLSERVER01;Database=master; Trusted_Connection=yes;'
  },
});

*/
/*
const sequelize = new Sequelize('bank', 'sa', '1234', {
    host: "localhost",
    //port: "1433",
    //schema: "teste",
    dialect: "mssql"
});
/**/
 module.exports = sequelize;