import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API from "../config.js";
import { useNavigate } from "react-router-dom";
import "../css/Materias.css";

const Materia = () => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerPerfil = async () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const response = await axios.get(`${API}/api/usuarios/perfil`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setUsuario(response.data.usuario);
      } catch (error) {
        setError("Error al cargar el perfil");
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("usuario");
          navigate("/");
        }
      } finally {
        setLoading(false);
      }
    };

    obtenerPerfil();
  }, [navigate]);


  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="materia-container">
      <button onClick={() => navigate("/Home")} className="logout-btn">
        Home
      </button>

      <div className="materia-header">
        <label>📚 Sistema de Materia</label>
      </div>
      
      <div className="materia-content">
        <div className="welcome-card">
          <h4>¡Hola, {usuario?.nombre}!</h4>
          <p>Bienvenido al sistema de gestión de materia.</p>
          <div className="user-details">
            <p><strong>Email:</strong> {usuario?.email}</p>
          </div>
        </div>
      </div>

      <div className="card-grid">
        <Link to="/crearmateria" className="materia-card card-red">
          <div className="icon">➕</div>
          <h2>Crear</h2>
        </Link>

        <Link to="/listmaterias" className="materia-card card-blue">
          <div className="icon">📋</div>
          <h2>Listar</h2>
        </Link>

      </div>
    </div>
  );
};

export default Materia;