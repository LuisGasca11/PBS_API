const express = require('express');
const router = express.Router();
const { getArticulos, getArticuloById, getClavesByArticulo } = require('../controllers/articulosController');

router.get('/articulos', getArticulos);
router.get('/articulos/:id', getArticuloById);
router.get('/articulos/:id/claves', getClavesByArticulo);

module.exports = router;