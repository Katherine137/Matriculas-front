import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import API from "../../config";
import "../../css/Matricula/Crear.css";

const CrearMatricula = () => {
  const navigate = useNavigate();
  const [estudiantes, setEstudiantes] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const cargarDatos = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      const resEst = await axios.get(`${API}/api/estudiantes/listarES`, config);
      const resMat = await axios.get(`${API}/api/materias/listarMat`, config); 

      setEstudiantes(resEst.data);
      setMaterias(resMat.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API}/api/matricula/Matricula`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Matrícula creada correctamente");
      navigate("/listmatriculas");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p className="loading">Cargando datos...</p>;

  return (
    <div className="container-crear-flex">
      <form className="form-matricula" onSubmit={handleSubmit(onSubmit)}>
        <h2>Crear Matrícula</h2>
        <div className="matricula-form-group">
          <label>Código</label>
          <input type="text" {...register("codigo", { required: "Obligatorio" })} />
        </div>
        <div className="matricula-form-group">
          <label>Descripción</label>
          <input type="text" {...register("descripcion", { required: "Obligatorio" })} />
        </div>
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
        <button type="submit" className="btn-submit">Crear Matrícula</button>
        <Link to="/matricula" className="reg">Regresar</Link>
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

export default CrearMatricula;