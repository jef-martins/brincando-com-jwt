const conta = require("../Server/services");
const ContaController = require('../Controller/contaController');
const Login = require('../Middleware/login');
const Refresh = require('../Middleware/refresh');

c = new ContaController;


/******Rotas******/

conta.get("/conta/", async(req, res)=>{
    const response = await c.list();
    
    res.status(response.status).send(response.data);
});

conta.get("/conta/:id/:page",Login,Refresh, async(req, res)=>{
    const response = await c.select(req.params.id, req.params.page);

    res.status(response.status).send({data: response.data, token: req.token});
});

conta.post("/conta/", async(req, res)=>{
    const response = await c.add(req);

    res.status(response.status).send(response.data);
});
 
conta.put("/conta/:id",Login, Refresh, async(req, res)=>{
    const response = await c.update(req, req.params.id);

    res.status(response.status).send({data: response.data, token: req.token});
});

conta.delete("/conta/:id", async(req, res)=>{
    const response = await c.delete(req.params.id);

    res.status(response.status).send(response.data);
});

module.exports = conta;

