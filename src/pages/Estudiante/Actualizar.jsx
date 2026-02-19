import { useForm } from "react-hook-form";
import API from "../../config";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../css/Estudiante/Actualizar.css";

const ActEstudiante = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    const obtenerEstudiante = async () => {
      if (!id) return;

      try {
        const response = await axios.get(
          `${API}/api/estudiantes/obtenerES/${id}`
        );

        const estudiante = response.data;

        const fechaFormateada = estudiante.fecha_nacimiento 
            ? estudiante.fecha_nacimiento.split('T')[0] 
            : "";

        setValue("nombre", estudiante.nombre);
        setValue("apellido", estudiante.apellido);
        setValue("cedula", estudiante.cedula);
        setValue("fecha_nacimiento", fechaFormateada);
        setValue("ciudad", estudiante.ciudad);
        setValue("direccion", estudiante.direccion);
        setValue("telefono", estudiante.telefono);
        setValue("email", estudiante.email);

      } catch (error) {
        console.error("Error al cargar estudiante:", error);
      }
    };

    obtenerEstudiante();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await axios.put(
        `${API}/api/estudiantes/actualizarES/${id}`,
        data
      );

      alert("Estudiante actualizado correctamente");
      navigate("/listestudiante");

    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-estudiante">
        <h2>Editar Estudiante</h2>

        <input
            type="text"
            placeholder="Nombre"
            {...register("nombre", { required: true })}
        />
        {errors.nombre && <p>Nombre obligatorio</p>}

        <input
            type="text"
            placeholder="Apellido"
            {...register("apellido", { required: true })}
        />
        {errors.apellido && <p>Apellido obligatorio</p>}

        <input
            type="text"
            placeholder="Cedula"
            {...register("cedula", { required: true })}
        />
        {errors.cedula && <p>Cedula obligatoria</p>}
        
        <input
            type="date"
            placeholder="Fecha de nacimiento"
            {...register("fecha_nacimiento", { required: true })}
        />
        {errors.fecha_nacimiento && <p>Fecha de nacimiento obligatoria</p>}

        <input
            type="text"
            placeholder="Ciudad"
            {...register("ciudad", { required: true })}
        />
        {errors.ciudad && <p>Ciudad obligatoria</p>}

        <input
            type="text"
            placeholder="Direccion"
            {...register("direccion", { required: true })}
        />
        {errors.direccion && <p>Direccion obligatorio</p>}

        <input
            type="text"
            placeholder="telefono"
            {...register("telefono", { required: true })}
        />
        {errors.telefono && <p>Telefono obligatorio</p>}

        <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
        />
        {errors.email && <p>Email obligatorio</p>}

        <button type="submit">Actualizar</button>

        <Link to="/estudiante" className="reg"> 
        <label>Regresar</label>
        </Link>
    </form>
  );
};

export default ActEstudiante;
