require('dotenv/config');

module.exports = {
  dialect: 'postgres',
  username: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: '5434',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
