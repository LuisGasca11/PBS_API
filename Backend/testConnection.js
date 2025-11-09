const db = require('./db/firebird');

(async () => {
  try {
    const result = await db.query('SELECT FIRST 1 ARTICULO_ID FROM ARTICULOS');
    console.log('Conexión exitosa! Resultado de prueba:', result);
  } catch (err) {
    console.error(err);
  }
})();
