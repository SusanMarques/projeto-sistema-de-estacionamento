const express = require('express');
const pool = require('./db.js'); // Conexão com o banco de dados
const registrosRouter = require('./routes/registros.js'); // Importa as rotas de registros

const app = express();
const port = 3001;

// Middleware
app.use(express.json());

// Rotas
app.use('/api', registrosRouter); // Usa o router de registros

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
