import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../../css/Matricula/Actualizar.css";

const ActMatricula = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [estudiantes, setEstudiantes] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const cargarDatos = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const [resEst, resMat] = await Promise.all([
        axios.get("http://localhost:3000/listarES", config),
        axios.get("http://localhost:3000/listarMat", config)
      ]);

      setEstudiantes(resEst.data);
      setMaterias(resMat.data);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const obtenerMatricula = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/obtenerMa/${id}`);
        const matricula = response.data;

        setValue("codigo", matricula.codigo);
        setValue("descripcion", matricula.descripcion);
        setValue("estudiante", matricula.estudiante);
        setValue("materia", matricula.materia);
      } catch (error) {
        console.error("Error al cargar matrícula:", error);
      }
    };

    obtenerMatricula();
    cargarDatos();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await axios.put(`http://localhost:3000/actualizarMa/${id}`, data);
      alert("Matrícula actualizada correctamente");
      navigate("/listMatriculas");
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  if (loading) return <p>Cargando datos...</p>;

  return (
    <div className="container-crear-flex">
      <form onSubmit={handleSubmit(onSubmit)} className="form-matricula">
        <h2>Editar Matrícula</h2>

        <input
          type="text"
          placeholder="Código"
          {...register("codigo", { required: true })}
        />
        {errors.codigo && <p className="error">Código obligatorio</p>}

        <input
          type="text"
          placeholder="Descripción"
          {...register("descripcion", { required: true })}
        />
        {errors.descripcion && <p className="error">Descripción obligatoria</p>}

        <select {...register("estudiante", { required: true })}>
          <option value="">Selecciona un estudiante</option>
          {estudiantes.map((est) => (
            <option key={est._id} value={est._id}>
              {est.nombre} {est.apellido}
            </option>
          ))}
        </select>
        {errors.estudiante && <p className="error">Estudiante obligatorio</p>}

        <select {...register("materia", { required: true })}>
          <option value="">Selecciona una materia</option>
          {materias.map((mat) => (
            <option key={mat._id} value={mat._id}>
              {mat.nombre || mat.nombreMateria || mat.nombre_materia || "Sin nombre"}
            </option>
          ))}
        </select>
        {errors.materia && <p className="error">Materia obligatoria</p>}

        <button type="submit">Actualizar</button>
        <Link to="/matricula" className="reg">
          <label>Regresar</label>
        </Link>
      </form>

      <div className="cards-container-right">
        <div className="info-card">
          <div className="card-header"><h3>Estudiantes</h3></div>
          <div className="card-body">
            {estudiantes.length === 0 ? (
              <p className="alert">No hay registros</p>
            ) : (
              estudiantes.map((est) => (
                <div key={est._id} className="item-data">
                  <p className="item-id">ID: {est._id}</p>
                  <p className="item-name">{est.nombre} {est.apellido}</p>
                  <p className="item-email">{est.email}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="info-card">
          <div className="card-header"><h3>Materias</h3></div>
          <div className="card-body">
            {materias.length === 0 ? (
              <p className="alert">No hay registros</p>
            ) : (
              materias.map((mat) => (
                <div key={mat._id} className="item-data">
                  <p className="item-id">ID: {mat._id}</p>
                  <p className="item-name">{mat.nombre || mat.nombreMateria || mat.nombre_materia || "Sin nombre"}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActMatricula;
