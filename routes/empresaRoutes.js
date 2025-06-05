const express = require('express');
const { listarEmpresas, criarEmpresa } = require('../controllers/empresaController');

const router = express.Router();

router.get('/', listarEmpresas);
router.post('/', criarEmpresa);

module.exports = router;