const express = require('express');
const pool = require('../db');
const router = express.Router();

// Rota para obter todos os registros
router.get('/registros', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM registros');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro ao obter registros');
    }
});

// Rota para adicionar um novo registro
router.post('/registros', async (req, res) => {
    const { placa, tipo, descricao, valor_hora, forma_pagamento, status } = req.body;
    const hora_entrada = new Date();

    try {
        const result = await pool.query(
            'INSERT INTO registros (placa, tipo, descricao, hora_entrada, valor_hora, forma_pagamento, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [placa, tipo, descricao, hora_entrada, valor_hora, forma_pagamento, status]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro ao adicionar registro');
    }
});

// Rota para atualizar a hora de saída de um registro
router.put('/registros/:id/saida', async (req, res) => {
    const id = req.params.id;
    const hora_saida = new Date();

    try {
        const result = await pool.query(
            'UPDATE registros SET hora_saida = $1 WHERE id = $2 RETURNING *',
            [hora_saida, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).send('Registro não encontrado');
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro ao marcar saída');
    }
});

// Rota para deletar um registro
router.delete('/registros/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const result = await pool.query('DELETE FROM registros WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Registro não encontrado');
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro ao deletar registro');
    }
});

router.get('/registros/apagar', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM registros WHERE status = $1', ['A pagar']);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro ao obter registros a pagar');
    }
});

module.exports = router;
