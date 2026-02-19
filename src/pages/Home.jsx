import { useState, useEffect } from "react";
import axios from "axios";
import API from "../config.js";
import { useNavigate, Link } from "react-router-dom";
import "../css/Home.css";

const Home = () => {
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
        const response = await axios.get(`${API}/api/perfil"`, {
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/");
  };

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="home-container">
      <div className="home-header">
        <h1 className="home-title">Sistema de Gestión</h1>
        <div className="user-info">
          <span className="welcome-message">
            Bienvenido - {usuario?.nombre} {usuario?.apellido}
          </span>
          <button onClick={handleLogout} className="logout-btn">
            Cerrar Sesión
          </button>
        </div>
      </div>

      <div className="welcome-section">
        <p>Bienvenido al sistema de gestión académica</p>
      </div>

      <div className="card-grid">
        <Link to="/matricula" className="home-card home-card-blue">
          <div className="icon">📝</div>
          <h2>Matriculas</h2>
        </Link>

        <Link to="/estudiante" className="home-card home-card-green">
          <div className="icon">🧑‍🎓</div>
          <h2>Estudiantes</h2>
        </Link>

        <Link to="/materia" className="home-card home-card-purple">
          <div className="icon">📖</div>
          <h2>Materias</h2>
        </Link>
      </div>
    </div>
  );
};

export default Home;
