const usuario = require("../Server/services");
const UsuarioController = require('../Controller/usuarioController');
const Login = require('../Middleware/login');
const Refresh = require('../Middleware/refresh')

u = new UsuarioController;


/******Rotas******/

usuario.get("/usuario/",Login, async(req, res)=>{
    const response = await u.list();

    res.status(response.status).send(response.data);
});

//Selecionar
usuario.post("/usuario/logar/", async(req, res)=>{
    const response = await u.login(req);

    res.status(response.status).send(response.data);
});

usuario.post("/usuario/", async(req, res)=>{
    const response = await u.add(req);

    res.status(response.status).send(response.data);
});

usuario.get("/usuario/:id",Login,Refresh, async(req, res)=>{
    const response = await u.select(req.params.id);

    res.status(response.status).send({data: response.data, token: req.token});
});
 
usuario.put("/usuario/:id", async(req, res)=>{
    const response = await u.update(req, req.params.id); 

    res.status(response.status).send(response.data);
});

usuario.delete("/usuario/:id", async(req, res)=>{
    const response = await u.delete(req.params.id);

    res.status(response.status).send(response.data);
});

module.exports = usuario;

