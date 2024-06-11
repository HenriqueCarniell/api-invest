const express = require('express')
const app = express()
const mysql = require('mysql2')
const porta = 4000
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "2006",
    database: "invest",
    port: 3306
});

app.use(cors());
app.use(express.json());

app.post("/add", (req,res) => {
    const {Nome} = req.body
    const {Price} = req.body
    const {Option} = req.body

    const sqldata = "INSERT INTO investapp(nome, price, opcao) VALUES (?,?,?)";

    db.query(sqldata, [Nome, Price, Option], (err, result) => {
    if(err) {
        console.log(err) 
    } else {
        console.log(result)
    }
    })
});

app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    const sqlDelete = "DELETE FROM investapp WHERE id = ?";

    db.query(sqlDelete, id, (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.put("/NewDados/:id", (req, res) => {
    const id = req.params.id;
    const { NewNome, NewNumero, NewSelectType } = req.body;
  
    const sqlUpdate = "UPDATE investapp SET nome = ?, price = ?, opcao = ? WHERE id = ?";
  
    db.query(sqlUpdate, [NewNome, NewNumero, NewSelectType, id], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

  app.get("/dados", async (req, res) => {
    try {
        const investapps = await prisma.investapp.findMany();
        res.send(investapps);
    } catch (err) {
        console.error(err);
        res.status(500).send("Ocorreu um erro ao buscar os dados");
    }
});


app.listen(porta, () => {
    console.log(`rodando na porta ${porta}`);
})