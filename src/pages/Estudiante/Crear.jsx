import axios from "axios";
import API from "../config.js";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "../../css/Estudiante/Crear.css";

const CrearEstudiante = () => {
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
        `${API}/api/estudiantes/Estudiantes`,
        data,
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
        );

        alert("Estudiante creada correctamente");
        navigate("/listEstudiante");

    } catch (error) {
        console.error("Error al crear estudiante:", error);
    }
    };


    return (
        <form className="form-estudiante" onSubmit={handleSubmit(onSubmit)}>
            <h2>Crear Estudiante</h2>

            <div className="form-grid">

                <div className="form-section">
                <h3 className="section-title">Datos Personales</h3>

                <div className="estudiante-form-group">
                    <label>Nombre</label>
                    <input
                    type="text"
                    placeholder="Ingresa el nombre"
                    {...register("nombre", { required: "El nombre es obligatorio" })}
                    />
                    {errors.nombre && <p className="error">{errors.nombre.message}</p>}
                </div>

                <div className="estudiante-form-group">
                    <label>Apellido</label>
                    <input
                    type="text"
                    placeholder="Ingresa el apellido"
                    {...register("apellido", { required: "El apellido es obligatorio" })}
                    />
                    {errors.apellido && <p className="error">{errors.apellido.message}</p>}
                </div>

                <div className="estudiante-form-group">
                    <label>Cédula</label>
                    <input
                    type="text"
                    placeholder="Ingresa la cédula"
                    {...register("cedula", { required: "La cédula es obligatoria" })}
                    />
                    {errors.cedula && <p className="error">{errors.cedula.message}</p>}
                </div>

                <div className="estudiante-form-group">
                    <label>Fecha de Nacimiento</label>
                    <input
                    type="date"
                    {...register("fecha_nacimiento", { required: "La fecha es obligatoria" })}
                    />
                    {errors.fecha_nacimiento && <p className="error">{errors.fecha_nacimiento.message}</p>}
                </div>
                </div>

                <div className="form-section">
                <h3 className="section-title">Datos de Contacto</h3>

                <div className="estudiante-form-group">
                    <label>Ciudad</label>
                    <input
                    type="text"
                    placeholder="Ingresa la ciudad"
                    {...register("ciudad", { required: "La ciudad es obligatoria" })}
                    />
                    {errors.ciudad && <p className="error">{errors.ciudad.message}</p>}
                </div>

                <div className="estudiante-form-group">
                    <label>Dirección</label>
                    <input
                    type="text"
                    placeholder="Ingresa la dirección"
                    {...register("direccion", { required: "La dirección es obligatoria" })}
                    />
                    {errors.direccion && <p className="error">{errors.direccion.message}</p>}
                </div>

                <div className="estudiante-form-group">
                    <label>Teléfono</label>
                    <input
                    type="text"
                    placeholder="Ingresa el teléfono"
                    {...register("telefono", { required: "El teléfono es obligatorio" })}
                    />
                    {errors.telefono && <p className="error">{errors.telefono.message}</p>}
                </div>

                <div className="estudiante-form-group">
                    <label>Email</label>
                    <input
                    type="email"
                    placeholder="Ingresa el email"
                    {...register("email", { required: "El email es obligatorio" })}
                    />
                    {errors.email && <p className="error">{errors.email.message}</p>}
                </div>
                </div>

            </div>

            <button type="submit" className="btn-submit">
                Crear estudiante
            </button>

            <Link to="/estudiante" className="reg">
                Regresar
            </Link>
            </form>

    );
};

export default CrearEstudiante;
