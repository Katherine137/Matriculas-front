import { MdDeleteForever, MdPublishedWithChanges } from "react-icons/md";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import API from "../../config";
import "../../css/listarc.css";

const ListMaterias = () => {
  const navigate = useNavigate();
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(true);

  const listMaterias = async () => {
    try {
      const response = await axios.get(`${API}/api/materias/listarMat`);
      setMaterias(response.data);
    } catch (error) {
      console.error("Error al cargar materias:", error);
    } finally {
      setLoading(false);
    }
  };
  const eliminarMateria = async (id) => {
  const confirmar = window.confirm("¿Seguro que deseas eliminar?");
  if (!confirmar) return;

  try {
    await axios.delete(`${API}/api/materias/eliminarMat/${id}`);
    listMaterias();
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    listMaterias();
  }, []);

  if (loading) return <p className="loading">Cargando...</p>;

  if (materias.length === 0) {
    return (
      <div className="alert">
        <strong>No existen registros de materias</strong>
      </div>
    );
  }

  return (
    <table className="tabla">
      <thead>
        <tr>
          <th>N°</th>
          <th>Nombre</th>
          <th>Código</th>
          <th>Descripción</th>
          <th>Creditos</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {materias.map((materia, index) => (
          <tr key={materia._id}>
            <td>{index + 1}</td>
            <td>{materia.nombre}</td>
            <td>{materia.codigo}</td>
            <td>{materia.descripcion}</td>
            <td>{materia.creditos}</td>

             <td className="acciones">
              <MdPublishedWithChanges
                title="Actualizar"
                className="icon actualizar"
                onClick={() => navigate(`/actmateria/${materia._id}`)}
              />
              <MdDeleteForever
                title="Eliminar"
                className="icon eliminar"
                onClick={() => eliminarMateria(materia._id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="10" class="footer-tabla">
            <Link to="/matricula" className="reg">Regresar</Link>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default ListMaterias;
