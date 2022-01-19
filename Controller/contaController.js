const ContaModel = require('../Model/Conta');
const ExtratoModel = require('../Model/Extrato');
const sequelize = require('../Model/bd');

ContaModel.hasMany(ExtratoModel, { foreignKey: 'fkConta' });
ExtratoModel.belongsTo(ContaModel, { foreignKey: 'fkConta' });

class ContaController {

    async list() {
        let status = 200;
        let res;
        const response = await ContaModel.findAll().catch(error => { status = 422; res = error });
        if (response)
            res = response;

        return { "status": status, data: res };
    }

    async add(req) {
        let status = 201;
        let res;

        const response = await ContaModel.create({
            saldo: req.body.saldo,
            tipoConta: req.body.tipoConta,
            nConta: req.body.nConta,
            agencia: req.body.agencia,

        }).catch(error => { status = 422; res = error });


        if (response)
            res = response;

        return { "status": status, data: res };
    }

    async select(id, page) {
        let status = 200;
        let res;
        console.log(page);
        const response = await ContaModel.findOne({
            include: {
                model: ExtratoModel,
                order: [
                    ['createdAt', 'DESC']
                ],
                limit: 10,
                offset: page
            },
            where: {
                fkUsuario: id
            }
        }).catch(error => { status = 422; res = error });
        

        if (response)
            res = response;

        return { "status": status, data: res };
    }

    async update(req, id) {
        let status = 201;
        let res, response;
        const t = await sequelize.transaction();


        try {
            const conta = await ContaModel.update({
                saldo: req.body.saldo,
                tipoConta: req.body.tipoConta,
                nConta: req.body.nConta,
                agencia: req.body.agencia,
                fkUsuario: req.body.fkUsuario
            },
                {
                    where: { idConta: req.body.idConta, fkUsuario: id }
                },
                { transaction: t }).catch(error => { status = 422; res = error });

            const extrato = await ExtratoModel.create({
                descricao: req.body.descricao,
                fkConta: req.body.idConta
            }, { transaction: t }).catch(error => { status = 422; res = error });

            await t.commit();

            if (extrato && conta)
                response = await ContaModel.findOne({
                    include: {
                        model: ExtratoModel
                    },
                    where: {
                        fkUsuario: id
                    }
                }).catch(error => { status = 404; res = error });

            if (response)
                res = response

        } catch (error) {
            await t.rollback()
        }


        return { "status": status, data: res };
    }

    async delete(id) {
        let status = 204;
        let res;
        await ContaModel.destroy({
            where: { idConta: id }
        }).catch(error => { status = 422; res = error });

        return { "status": status, data: res };
    }
}

module.exports = ContaController;