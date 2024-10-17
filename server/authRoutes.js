const express = require("express");
const path = require("path");
const session = require("express-session");
const router = express.Router();
require("dotenv").config(); // Carrega as variáveis de ambiente do arquivo .env

// Definindo a senha correta diretamente
const CORRECT_PASSWORD = process.env.ADMIN_PASSWORD; // Certifique-se de que esta variável está definida no Railway



// Processando o envio do formulário de login
router.post("/login", (req, res) => {
  const password = req.body.password;
  // Verificar se a senha inserida está correta
  if (password === CORRECT_PASSWORD) {
    // Se a senha estiver correta
    req.session.loggedIn = true;
    res.redirect("/adicionar");
  } else {
    res.send('Senha incorreta! <a href="/login">Tente novamente</a>');
  }
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
