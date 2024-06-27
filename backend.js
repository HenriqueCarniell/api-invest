const express = require('express');
const app = express();
const porta = 4001;
const cors = require('cors');
const { Pool } = require('pg');

let env = require('dotenv').config();

console.log(env.error)

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(cors());
app.use(express.json());

app.post("/add", async (req, res) => {
  const { Nome, Price, Option } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO investapp (nome, price, opcao) VALUES ($1, $2, $3) RETURNING *',
      [Nome, Price, Option]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Ocorreu um erro ao adicionar os dados");
  }
});

app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM investapp WHERE id = $1 RETURNING *',
      [id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Ocorreu um erro ao deletar os dados");
  }
});

app.put("/NewDados/:id", async (req, res) => {
  const { id } = req.params;
  const { NewNome, NewNumero, NewSelectType } = req.body;
  try {
    const result = await pool.query(
      'UPDATE investapp SET nome = $1, price = $2, opcao = $3 WHERE id = $4 RETURNING *',
      [NewNome, NewNumero, NewSelectType, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Ocorreu um erro ao atualizar os dados");
  }
});

app.get("/dados", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM investapp');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Ocorreu um erro ao buscar os dados");
  }
});

app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});
