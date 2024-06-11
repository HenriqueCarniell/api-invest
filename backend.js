const express = require('express');
const app = express();
const porta = 4000;
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.post("/add", async (req, res) => {
    const { Nome, Price, Option } = req.body;
    try {
        const newInvestapp = await prisma.investapp.create({
            data: {
                nome: Nome,
                price: Price,
                opcao: Option,
            },
        });
        res.json(newInvestapp);
    } catch (err) {
        console.error(err);
        res.send("Ocorreu um erro ao adicionar os dados");
    }
});

app.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deleteInvestapp = await prisma.investapp.delete({
            where: { id: parseInt(id) },
        });
        res.json(deleteInvestapp);
    } catch (err) {
        console.error(err);
        res.send("Ocorreu um erro ao deletar os dados");
    }
});

app.put("/NewDados/:id", async (req, res) => {
    const { id } = req.params;
    const { NewNome, NewNumero, NewSelectType } = req.body;
    try {
        const updateInvestapp = await prisma.investapp.update({
            where: { id: parseInt(id) },
            data: {
                nome: NewNome,
                price: NewNumero,
                opcao: NewSelectType,
            },
        });
        res.json(updateInvestapp);
    } catch (err) {
        console.error(err);
        res.send("Ocorreu um erro ao atualizar os dados");
    }
});

app.get("/dados", async (req, res) => {
    try {
        const investapps = await prisma.investapp.findMany();
        res.json(investapps);
    } catch (err) {
        console.error(err);
        res.send("Ocorreu um erro ao buscar os dados");
    }
});

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});
