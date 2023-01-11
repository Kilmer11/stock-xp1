const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cadastro = require("./routes/cadastro");

app.use(cors());
app.use(express.json());
//Body-Parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
 
    app.use("/cadastro", cadastro);

var PORT = 3001;
app.listen(PORT, () => {
    console.log("Servidor rodando na porta " +PORT);
})