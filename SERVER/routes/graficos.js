const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/grafico/:indice', async (req, res) => {
    const { indice } = req.params;
    const datos1 = await pool.query(`SELECT d15 FROM ${process.env.TABLE_CRIPTO} WHERE cripto = ? ORDER BY escenario`, [indice]);
    const datos2 = await pool.query(`SELECT d30 FROM ${process.env.TABLE_CRIPTO} WHERE cripto = ? ORDER BY escenario`, [indice]);
    const datos3 = await pool.query(`SELECT d45 FROM ${process.env.TABLE_CRIPTO} WHERE cripto = ? ORDER BY escenario`, [indice]);

    const datosExtraidos1 = JSON.stringify(datos1);
    const datosExtraidos2 = JSON.stringify(datos2);
    const datosExtraidos3 = JSON.stringify(datos3);

    var matriz = []

    matriz.push(datos1, datos2, datos3);

    res.send(matriz);
});

module.exports = router;