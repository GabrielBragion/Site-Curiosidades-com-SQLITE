const express = require("express");
const routes = require("./routes");
const authRoutes = require("./authRoutes");
const path = require("path");
const session = require("express-session");

const app = express();
const PORT = 3000;

// Configuração da sessão
app.use(
  session({
    secret: "Ga130196#",
    resave: false,
    saveUninitialized: true,
  })
);

// Middleware para converter dados em json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, "../public")));

// Usar as rotas
app.use(routes);
app.use(authRoutes);

app.listen(PORT, () => console.log(`Servidor conectado na porta ${PORT}`));
