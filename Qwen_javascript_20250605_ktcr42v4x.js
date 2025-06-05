const nodemailer = require('nodemailer');
const pool = require('../config/db');

async function verificarLicencasExpiradas() {
  try {
    const result = await pool.query(
      "SELECT * FROM licencas WHERE status = 'ativa' AND data_expiracao < NOW()"
    );

    for (const licenca of result.rows) {
      // Suspender licença
      await pool.query(
        "UPDATE licencas SET status = 'expirada' WHERE id = $1",
        [licenca.id]
      );

      // Enviar e-mail de notificação
      const empresa = await pool.query(
        "SELECT email FROM empresas WHERE id = $1",
        [licenca.empresa_id]
      );
      const email = empresa.rows[0].email;
      await sendEmail(email, 'Sua licença expirou. Renove agora!');
    }
  } catch (error) {
    console.error('Erro ao verificar licenças expiradas:', error);
  }
}

async function sendEmail(to, message) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Notificação de Licença Expirada',
    text: message,
  };

  await transporter.sendMail(mailOptions);
}

// Execute a verificação periodicamente
setInterval(verificarLicencasExpiradas, 60000); // A cada 1 minuto