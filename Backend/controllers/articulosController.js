const db = require('../db/firebird');

const getArticulos = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 100;
    const offset = parseInt(req.query.offset) || 0;
    const { nombre, estatus } = req.query;

    let sql = `
      SELECT FIRST ${limit} SKIP ${offset}
      a.ARTICULO_ID, a.NOMBRE, a.ESTATUS, c.CLAVE_ARTICULO
      FROM ARTICULOS a
      LEFT JOIN CLAVES_ARTICULOS c ON a.ARTICULO_ID = c.ARTICULO_ID
    `;
    
    const conditions = [];
    const params = [];

    if (nombre) {
      conditions.push('UPPER(a.NOMBRE) LIKE UPPER(?)');
      params.push(`%${nombre}%`);
    }

    if (estatus) {
      conditions.push('a.ESTATUS = ?');
      params.push(estatus);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY a.ARTICULO_ID';

    const rows = await db.query(sql, params);
    
    res.json(rows);
  } catch (error) {
    res.status(500).json({ 
      error: error.message || 'Error al obtener artículos',
      details: error.toString()
    });
  }
};

const getArticuloById = async (req, res) => {
  try {
    const articuloId = req.params.id;
    
    const sql = `
      SELECT a.ARTICULO_ID, a.NOMBRE, a.ESTATUS, c.CLAVE_ARTICULO 
      FROM ARTICULOS a
      LEFT JOIN CLAVES_ARTICULOS c ON a.ARTICULO_ID = c.ARTICULO_ID
      WHERE a.ARTICULO_ID = ?
    `;
    
    const rows = await db.query(sql, [articuloId]);
    
    if (!rows || rows.length === 0) {
      return res.status(404).json({ 
        error: 'Artículo no encontrado',
        id: articuloId 
      });
    }
    
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ 
      error: error.message || 'Error al obtener artículo' 
    });
  }
};

const getClavesByArticulo = async (req, res) => {
  try {
    const articuloId = req.params.id;
    const { q } = req.query;
        
    let sql = `
      SELECT CLAVE_ARTICULO, UNIDAD_VENTA 
      FROM CLAVES_ARTICULOS 
      WHERE ARTICULO_ID = ?
    `;
    
    const params = [articuloId];
    
    if (q) {
      sql += ' AND UPPER(CLAVE_ARTICULO) LIKE UPPER(?)';
      params.push(`%${q}%`);
    }

    sql += ' ORDER BY CLAVE_ARTICULO';
    
    const rows = await db.query(sql, params);
    
    res.json(rows);
  } catch (error) {
    res.status(500).json({ 
      error: error.message || 'Error al obtener claves' 
    });
  }
};

module.exports = { getArticulos, getArticuloById, getClavesByArticulo };