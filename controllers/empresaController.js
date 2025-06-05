const pool = require('../config/db');

// Listar todas as empresas
const listarEmpresas = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM empresas');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar empresas' });
  }
};

// Criar uma nova empresa
const criarEmpresa = async (req, res) => {
  const { nome, cnpj, endereco, telefone, email, status } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO empresas (nome, cnpj, endereco, telefone, email, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [nome, cnpj, endereco, telefone, email, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar empresa' });
  }
};

module.exports = { listarEmpresas, criarEmpresa };