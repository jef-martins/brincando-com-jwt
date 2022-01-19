const Conta = require('./Conta');
const Usuario = require('./Usuario');
const Extrato = require('./Extrato');
const boo = true;

Usuario.hasMany(Conta, { foreignKey: 'fkUsuario' });
Conta.belongsTo(Usuario, { foreignKey: 'fkUsuario' });

Conta.hasMany(Extrato, { foreignKey: 'fkConta' });
Extrato.belongsTo(Conta, { foreignKey: 'fkConta' });


Usuario.sync({force: boo})
    .then(()=>Conta.sync({force: boo})
        .then(()=>Extrato.sync({force: boo})))




      