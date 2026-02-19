import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import API from "../config.js";
import "../../css/Materia/Actualizar.css";

const ActMateria = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    const obtenerMateria = async () => {
      try {
        const response = await axios.get(
          `${API}/api/materias/obtenerMat/${id}`
        );

        const materia = response.data;

        setValue("nombre", materia.nombre);
        setValue("codigo", materia.codigo);
        setValue("descripcion", materia.descripcion);
        setValue("creditos", materia.creditos);

      } catch (error) {
        console.error("Error al cargar la materia:", error);
      }
    };

    obtenerMateria();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await axios.put(
        `${API}/api/materias/actualizarMat/${id}`,
        data
      );

      alert("Materia actualizado correctamente");
      navigate("/listMaterias");

    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-materia">
        <h2>Editar Materia</h2>

        <input
            type="text"
            placeholder="Nombre"
            {...register("nombre", { required: true })}
        />
        {errors.nombre && <p>Nombre obligatorio</p>}

        <input
            type="text"
            placeholder="Código"
            {...register("codigo", { required: true })}
        />
        {errors.codigo && <p>Código obligatorio</p>}

        <input
            type="text"
            placeholder="Descripción"
            {...register("descripcion", { required: true })}
        />
        {errors.descripcion && <p>Descripcion obligatorio</p>}


        <input
            type="number"
            placeholder="Creditos"
            {...register("creditos", { required: true })}
        />
        {errors.creditos && <p>Creditos obligatorio</p>}

        <button type="submit">Actualizar</button>
        <Link to="/materia" className="reg"> 
          <label>Regresar</label>
        </Link>
    </form>
  );
};

export default ActMateria;
