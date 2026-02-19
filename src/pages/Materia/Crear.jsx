import axios from "axios";
import API from "../../config";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "../../css/Materia/Crear.css";

const CrearMateria = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${API}/api/materias/Materia`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Materia creada correctamente");
      navigate("/listmaterias");

    } catch (error) {
      console.error("Error al crear materia:", error);
    }
  };


  return (
    <form className="form-materia" onSubmit={handleSubmit(onSubmit)}>
        <h2>Crear Materia</h2>

        <div className="materia-form-group">
            <label>Nombre</label>
            <input
            type="text"
            placeholder="Ingresa el nombre"
            {...register("nombre", { required: "El nombre es obligatorio" })}
            />
            {errors.nombre && <p className="error">{errors.nombre.message}</p>}
        </div>

        <div className="materia-form-group">
            <label>Código</label>
            <input
            type="text"
            placeholder="Ingresa el código"
            {...register("codigo", { required: "El código es obligatorio" })}
            />
            {errors.codigo && <p className="error">{errors.codigo.message}</p>}
        </div>

        <div className="materia-form-group">
            <label>Descripción</label>
            <input
            type="text"
            placeholder="Ingresa la descripción"
            {...register("descripcion", { required: "La descripción es obligatoria" })}
            />
            {errors.descripcion && <p className="error">{errors.descripcion.message}</p>}
        </div>

        <div className="materia-form-group">
            <label>Creditos</label>
            <input
            type="number"
            placeholder="Ingresa la creditos"
            {...register("creditos", { required: "La creditos es obligatoria" })}
            />
            {errors.creditos && <p className="error">{errors.creditos.message}</p>}
        </div>
        
        <button type="submit" className="btn-submit">
            Crear Materia
        </button>

        <Link to="/materia" className="reg"> 
        <label>Regresar</label>
        </Link>
      
    </form>
  );
};

export default CrearMateria;
