import { MdDeleteForever, MdPublishedWithChanges } from "react-icons/md";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../css/listarc.css";

const ListMatriculas = () => {
  const navigate = useNavigate();
  const [matriculas, setMatriculas] = useState([]);
  const [loading, setLoading] = useState(true);

  const listMatriculas = async () => {
    try {
      const response = await axios.get(`${API}/api/matricula/listarMa`);
      setMatriculas(response.data);
    } catch (error) {
      console.error("Error al cargar matrículas:", error);
    } finally {
      setLoading(false);
    }
  };
  const eliminarMatricula = async (id) => {
  const confirmar = window.confirm("¿Seguro que deseas eliminar?");
  if (!confirmar) return;

  try {
    await axios.delete(`${API}/api/matricula/eliminarMa/${id}`);
    listMatriculas();
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    listMatriculas();
  }, []);

  if (loading) return <p className="loading">Cargando...</p>;

  if (matriculas.length === 0) {
    return (
      <div className="alert">
        <strong>No existen registros de matrículas</strong>
      </div>
    );
  }

  return (
    <table className="tabla">
      <thead>
        <tr>
          <th>N°</th>
          <th>Código</th>
          <th>Descripción</th>
          <th>Estudiante</th>
          <th>Materia</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {matriculas.map((matricula, index) => (
          <tr key={matricula._id}>
            <td>{index + 1}</td>
            <td>{matricula.codigo}</td>
            <td>{matricula.descripcion}</td>
            <td>{matricula.estudiante?.nombre} {matricula.estudiante?.apellido}</td>
            <td>{matricula.materia?.nombre}</td>

             <td className="acciones">
              <MdPublishedWithChanges
                title="Actualizar"
                className="icon actualizar"
                onClick={() => navigate(`/actmatricula/${matricula._id}`)}
              />
              <MdDeleteForever
                title="Eliminar"
                className="icon eliminar"
                onClick={() => eliminarMatricula(matricula._id)}
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

export default ListMatriculas;
