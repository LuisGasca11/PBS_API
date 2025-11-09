const express = require('express');
const router = express.Router();
const { getArticuloByClave } = require('../controllers/clavesController');

router.get('/claves/:clave', getArticuloByClave);

module.exports = router;