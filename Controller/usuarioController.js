const UsuarioModel = require('../Model/Usuario');
const ContaModel = require('../Model/Conta');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('../Model/bd');

UsuarioModel.hasMany(ContaModel, { foreignKey: 'fkUsuario' });
ContaModel.belongsTo(UsuarioModel, { foreignKey: 'fkUsuario' });


class UsuarioController {

    async list() {
        let status = 200;
        let res;
        const response = await UsuarioModel.findAll().catch(error => { status = 422; res = error });
        if (response)
            res = response;

        return { "status": status, data: res };
    }


    async add(req) {
        let status = 201;
        let res, response;
        const t = await sequelize.transaction();

        try {
            const hash = bcrypt.hashSync(req.body.senha, 10);
            const usuario = await UsuarioModel.create({
                foto: req.body.foto,
                nome: req.body.nome,
                cpf: req.body.cpf,
                senha: hash
            }, { transaction: t }).catch(error => { status = 422; res = error });



            const conta = await ContaModel.create({
                saldo: 0,
                tipoConta: req.body.tipoConta,
                nConta: Math.floor(Math.random() * (9999999 - 1000000 + 1) + 1000000) + "-" + Math.floor(Math.random() * 10),
                agencia: Math.floor(Math.random() * (999 - 100 + 1) + 100),
                fkUsuario: usuario.idUsuario
            }, { transaction: t }).catch(error => { status = 422; res = error });

            await t.commit();

            if (usuario && conta)
                response = await UsuarioModel.findOne({
                    attributes: { exclude: ['senha'] },
                    include: {
                        model: ContaModel,
                        where: {
                            fkUsuario: usuario.idUsuario
                        },
                        required: true
                    }
                }).catch(error => { status = 404; res = error });

            if (response)
                res = response

        } catch (erro) {
            await t.rollback()
        }



        return { "status": status, data: res };

    }

    async select(id) {
        let status = 200;
        let res;
        const response = await UsuarioModel.findOne({
            attributes: { exclude: ['senha'] },
            include: {
                model: ContaModel
            },
            where: {
                idUsuario: id
            }
        }).catch(error => { status = 422; res = error });

        if (response)
            res = response;

        return { "status": status, data: res };
    }

    //Selecionar
    async login(req) {
        let status = 200;
        let res;

        const response = await UsuarioModel.findOne({
            where: {
                cpf: req.body.cpf,
            }
        }).catch(error => { status = 422; res = error });

        if (response)
            if (bcrypt.compareSync(req.body.senha, response.senha)) {
                const token = jwt.sign({
                    nome: response.nome,
                    cpf: response.cpf
                },
                    "chave_secreta",
                    {
                        expiresIn: "1m"
                    }
                );
                res = {
                    idUsuario: response.idUsuario,
                    nome: response.nome,
                    cpf: response.cpf,
                    token: token
                };
            }
            else {
                status = 422;
                res = "Usuario ou Senha Incorretos!!";
            }
        else {
            status = 422;
            res = "Usuario ou Senha Incorretos!!";
        }

        return { "status": status, data: res };
    }

    async update(req, id) {
        let status = 201;
        let res;

        const response = await UsuarioModel.update({
            nome: req.body.nome,
            cpf: req.body.cpf,
            senha: req.body.senha
        },
            {
                where: { idUsuario: id }
            }
        ).catch(error => { status = 422; res = error });

        if (response)
            res = await UsuarioModel.findByPk(id).catch(error => { status = 422; res = error });

        return { "status": status, data: res };
    }

    async delete(id) {
        let status = 204;
        let res;
        await UsuarioModel.destroy({
            where: { idUsuario: id }
        }).catch(error => { status = 422; res = error });

        return { "status": status, data: res };
    }
}

module.exports = UsuarioController;