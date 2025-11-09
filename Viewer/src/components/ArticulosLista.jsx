import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ArticulosList() {
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticulos();
  }, []);

  const fetchArticulos = async () => {
    try {
      const res = await axios.get('http://localhost:3000/v1/public/articulos/?limit=10');
      setArticulos(res.data);
    } catch (error) {
      console.error('Error al obtener artículos:', error);
      if (error.response) {
        console.error('Respuesta del servidor:', error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Cargando artículos...</p>;

  return (
    <table border="1" cellPadding="5">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Estatus</th>
          <th>Clave Artículo</th>
        </tr>
      </thead>
      <tbody>
        {articulos.map((art) => (
          <tr key={art.ARTICULO_ID}>
            <td>{art.ARTICULO_ID}</td>
            <td>{art.NOMBRE}</td>
            <td>{art.ESTATUS}</td>
            <td>{art.CLAVE_ARTICULO}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ArticulosList;
