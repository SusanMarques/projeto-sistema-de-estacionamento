const express = require('express');
const pool = require('./db.js'); // Conexão com o banco de dados
const registrosRouter = require('./routes/registros.js'); // Importa as rotas de registros
const path = require('path');

const app = express();
const port = 3001;

app.use(express.json());

// Rotas
app.use('/api', registrosRouter); // Usa o router de registros

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'public/app','layout.html'));
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
