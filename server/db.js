const sqlite = require("sqlite3").verbose();

//Cria o banco de dados
const db = new sqlite.Database("./curiosidades.db", (error) => {
  if (error) {
    return console.log("Erro na conexão com banco de dados:", error.message);
  }
  console.log("Banco de dados conectado");
});

// Criar a tabela de curiosidades (se não existir)
db.run(`CREATE TABLE IF NOT EXISTS curiosidades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    texto TEXT NOT NULL,
    data DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

module.exports = db;
