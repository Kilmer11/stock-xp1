const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "jogador360",
    database: "estoqueDeItens",
})

router.post("/register", (req, res, err) => {
    const { nome } = req.body;
    const { subcategoria } = req.body;
    const { marca } = req.body;
    const { medida } = req.body;
    const { quantidade } = req.body;
    const { tipo } = req.body;

    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({text: "Nome inválido!"})
    }

    if(!req.body.marca || typeof req.body.marca == undefined || req.body.marca == null) {
        erros.push({text: "Marca inválida!"})
    }

    if(req.body.marca.length < 3) {
        erros.push({text: "Nome da marca pequeno demais!"})
    }

    if(!req.body.subcategoria || typeof req.body.subcategoria === undefined || req.body.subcategoria === null) {
        erros.push({text: "Subcategoria inválida!"})
    }

    if(req.body.subcategoria.length < 3) {
        erros.push({text: "Nome da subcategoria pequeno demais!"})
    }

    if(!req.body.medida || typeof req.body.medida == undefined || req.body.medida == null) {
        erros.push({text: "Medida inválida!"})
    }

    if(!req.body.tipo || typeof req.body.tipo == undefined || req.body.tipo == null) {
        erros.push({text: "Tipo inválido!"})
    }

    if(req.body.quantidade == null || req.body.quantidade < 1) {
        erros.push({text: "Quantidade inválida!"})
    }

    if(erros.length > 0){
        console.log(err)
    }else{
        let SQL = "INSERT INTO itens (nome, subcategoria, marca, medida, quantidade, tipo) VALUES (?, ?, ?, ?, ?, ?)";
            
            db.query(SQL, [nome, subcategoria, marca, medida, quantidade, tipo], (err, result) => {
                if(err)console.log(err)
                else res.send(result)
            })
        }
    })

    router.get("/getCards", (req, res) => {

        let SQL = "SELECT * FROM itens";

        db.query(SQL, (err, result) => {
            if(err) console.log(err)
            else res.send(result)
        })
    })

    router.put("/edit", (req, res, err) => {
        const { id } = req.body;
        const { nome } = req.body;
        const { marca } = req.body;
        const { subcategoria } = req.body;
        const { medida } = req.body;
        const { quantidade } = req.body;
        const { tipo } = req.body;

        var erros = []

        if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
            erros.push({text: "Nome inválido!"})
        }

        if(!req.body.marca || typeof req.body.marca == undefined || req.body.marca == null) {
            erros.push({text: "Marca inválida!"})
        }

        if(req.body.marca.length < 3) {
            erros.push({text: "Nome da marca pequeno demais!"})
        }

        if(!req.body.subcategoria || typeof req.body.subcategoria === undefined || req.body.subcategoria === null) {
            erros.push({text: "Subcategoria inválida!"})
        }

        if(req.body.subcategoria.length < 3) {
            erros.push({text: "Nome da subcategoria pequeno demais!"})
        }

        if(!req.body.medida || typeof req.body.medida == undefined || req.body.medida == null) {
            erros.push({text: "Medida inválida!"})
        }

        if(!req.body.tipo || typeof req.body.tipo == undefined || req.body.tipo == null) {
            erros.push({text: "Tipo inválido!"})
        }

        if(req.body.quantidade == null || req.body.quantidade < 1) {
            erros.push({text: "Quantidade inválida!"})
        }

        if(erros.length > 0) {
            console.log(err)
        }else{
                let SQL = "UPDATE itens SET nome = ?, subcategoria = ?, marca = ?, medida = ?, quantidade = ?, tipo = ? WHERE id = ?";

                db.query(SQL, [nome, subcategoria, marca, medida, quantidade, tipo, id], (err, result) => {
                if(err) console.log(err)
                else res.send(result)
            })
        }
    })

    router.delete("/delete/:id", (req, res) => {
        const { id } = req.params;

        let SQL = "DELETE FROM itens WHERE id = ?";

        db.query(SQL, [id], (err, result) => {
            if(err)console.log(err)
            else res.send(result)
        })
    })

    module.exports = router;