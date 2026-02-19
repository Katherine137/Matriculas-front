import { MdDeleteForever, MdPublishedWithChanges } from "react-icons/md";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../css/listarc.css";

const ListEstudiante = () => {
  const navigate = useNavigate();
  const [estudiantes, setEstudiante] = useState([]);
  const [loading, setLoading] = useState(true);

  const listEstudiante = async () => {
    try {
      const response = await axios.get("http://localhost:3000/listarES");
      setEstudiante(response.data);
    } catch (error) {
      console.error("Error al cargar estudiantes:", error);
    } finally {
      setLoading(false);
    }
  };
  const eliminarEstudiante = async (id) => {
  const confirmar = window.confirm("¿Seguro que deseas eliminar?");
  if (!confirmar) return;

  try {
    await axios.delete(`http://localhost:3000/eliminarES/${id}`);
    listEstudiante();
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    listEstudiante();
  }, []);

  if (loading) return <p className="loading">Cargando...</p>;

  if (estudiantes.length === 0) {
    return (
      <div className="alert">
        <strong>No existen registros de estudiantes</strong>
      </div>
    );
  }

  return (
    <table className="tabla">
      <thead>
        <tr>
          <th>N°</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Cedula</th>
          <th>Fecha de nacimiento</th>
          <th>Ciudad</th>
          <th>Dirección</th>
          <th>Teléfono</th>
          <th>Email</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {estudiantes.map((estudiante, index) => (
          <tr key={estudiante._id}>
            <td>{index + 1}</td>
            <td>{estudiante.nombre}</td>
            <td>{estudiante.apellido}</td>
            <td>{estudiante.cedula}</td>
            <td>{estudiante.fecha_nacimiento}</td>
            <td>{estudiante.ciudad}</td>
            <td>{estudiante.direccion}</td>
            <td>{estudiante.telefono}</td>
            <td>{estudiante.email}</td>

             <td className="acciones">
              <MdPublishedWithChanges
                title="Actualizar"
                className="icon actualizar"
                onClick={() => navigate(`/actestudiante/${estudiante._id}`)}
              />

              <MdDeleteForever
                title="Eliminar"
                className="icon eliminar"
                onClick={() => eliminarEstudiante(estudiante._id)}
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

export default ListEstudiante;
