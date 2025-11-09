const db = require('../db/firebird');

const getArticuloByClave = async (req, res) => {
  try {
    const clave = req.params.clave;
    
    const sql = `
      SELECT a.ARTICULO_ID, a.NOMBRE, a.ESTATUS, c.CLAVE_ARTICULO
      FROM ARTICULOS a
      JOIN CLAVES_ARTICULOS c ON a.ARTICULO_ID = c.ARTICULO_ID
      WHERE c.CLAVE_ARTICULO = ?
    `;
    
    const rows = await db.query(sql, [clave]);
    
    if (!rows || rows.length === 0) {
      return res.status(404).json({ 
        error: 'Artículo no encontrado',
        clave: clave
      });
    }
    
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ 
      error: error.message || 'Error al buscar artículo por clave' 
    });
  }
};

module.exports = { getArticuloByClave };