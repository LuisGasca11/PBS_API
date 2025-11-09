const dotenv = require('dotenv');
dotenv.config();

const Firebird = require('node-firebird');

const options = {
  host: process.env.FB_HOST,
  port: parseInt(process.env.FB_PORT),
  database: process.env.FB_DB,
  user: process.env.FB_USER,
  password: process.env.FB_PASSWORD,
  WireCrypt: 'Disabled'
};

for (const [key, value] of Object.entries(options)) {
  if (!value) {
    throw new Error(`Variable de entorno ${key} no definida correctamente.`);
  }
}

function query(sql, params = []) {
  return new Promise((resolve, reject) => {
    Firebird.attach(options, (err, db) => {
      if (err) return reject(`Error al conectar a Firebird: ${err.message}`);
      db.query(sql, params, (err, result) => {
        db.detach();
        if (err) return reject(`Error en la consulta: ${err.message}`);
        resolve(result);
      });
    });
  });
}

module.exports = { query };
