const Sequelize = require('sequelize');

// Use a variável de ambiente DATABASE_URL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  // O Railway, por ser um ambiente de nuvem, geralmente exige SSL/TLS para conexões externas.
  // Configure as opções de SSL/TLS aqui.
  dialectOptions: {
    ssl: {
      require: true, // Força o uso de SSL/TLS
      rejectUnauthorized: false // DESABILITE ISSO EM PRODUÇÃO. Use apenas para testes se houver problemas de certificado.
                               // Em produção, você idealmente configuraria o certificado CA raiz se o provedor exigir.
    }
  },
  // Opcional: Configurações de pool de conexão
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false // Desabilita o log de SQL do Sequelize (útil em produção)
});

module.exports = sequelize;