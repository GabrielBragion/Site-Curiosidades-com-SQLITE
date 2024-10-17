const express = require("express");
const db = require("./db"); // Importar a configuração do banco de dados
const path = require("path");

// Criar um roteador do Express
const router = express.Router();

// Rota para a página inicial
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

// Rota para a página sobre
router.get("/sobre", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "sobre.html"));
});

// Rota para a página de login
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "login.html"));
});

// Definir a rota para buscar uma curiosidade aleatória
router.get("/curiosidade", (req, res) => {
  db.get("SELECT * FROM curiosidades ORDER BY RANDOM() LIMIT 1", (err, row) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao buscar a curiosidade." });
    }
    res.json({
      texto: row ? row.texto : "Nenhuma curiosidade encontrada",
      data: row ? row.data : null,
    });
  });
});

// Definir a rota para adicionar uma nova curiosidade
router.post("/curiosidade", (req, res) => {
  const { texto } = req.body; // Pega o texto da curiosidade do corpo da requisição

  // Insere a nova curiosidade no banco de dados
  db.run(
    "INSERT INTO curiosidades (texto) VALUES (?)",
    [texto],
    function (err) {
      if (err) {
        return res
          .status(500)
          .json({ error: "Erro ao adicionar a curiosidade." });
      }
      res.status(201);
    }
  );
});

// Definir a rota para buscar todas as curiosidades
router.get("/lista", (req, res) => {
  db.all("SELECT * FROM curiosidades", (err, row) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao buscar as curiosidades." });
    }
    res.json(row);
  });
});

// Exportar as rotas para serem usadas no servidor principal
module.exports = router;
