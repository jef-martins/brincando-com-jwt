const app = require("./services");
const conta = require('../Routes/conta');
const usuario = require('../Routes/usuario');
const cors = require("cors");

app.use(cors());
app.use(usuario);
app.use(conta);

app.listen(8082, () => console.log("Server Iniciado"));