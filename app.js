const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./config/logger');
const empresaRoutes = require('./routes/empresaRoutes');
const licencaRoutes = require('./routes/licencaRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Logs
app.use(requestLogger);

// Rotas
app.use('/api/empresas', empresaRoutes);
app.use('/api/licencas', licencaRoutes);

// Tratamento de erros
app.use(errorLogger);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});