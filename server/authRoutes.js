const express = require("express");
const path = require("path");
const session = require("express-session");
const router = express.Router();
require("dotenv").config(); // Carrega as variáveis de ambiente do arquivo .env
const bcrypt = require("bcrypt");

// A senha deve ser definida como uma variável de ambiente no Railway
const CORRECT_PASSWORD_HASH = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10);

// Processando o envio do formulário de login
router.post("/login", (req, res) => {
  const password = req.body.password;

  // Comparar a senha inserida com o hash da senha correta
  bcrypt.compare(password, CORRECT_PASSWORD_HASH, (err, result) => {
    if (err) {
      console.error("Erro ao comparar senhas:", err);
      return res.status(500).send("Erro interno do servidor");
    }

    if (result) {
      // Se a senha estiver correta
      req.session.loggedIn = true;
      res.redirect("/adicionar");
    } else {
      res.send('Senha incorreta! <a href="/login">Tente novamente</a>');
    }
  });
});

// Middleware para proteger rotas privadas
function authMiddleware(req, res, next) {
  if (req.session.loggedIn) {
    next(); // Se o usuário estiver logado, permitir o acesso
  } else {
    res.redirect("/login"); // Caso contrário, redirecionar para o login
  }
}

// Rota para a página protegida
router.get("/adicionar", authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "../private", "adicionar.html"));
});

// Exportar as rotas para serem usadas no servidor principal
module.exports = router;
