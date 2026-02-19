import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import API from "../config.js";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${API}/api/usuarios/login`, {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("usuario", JSON.stringify(response.data.usuario));
      
      navigate("/Home");
      
    } catch (error) {
      setError(
        error.response?.data?.msg || "Error al iniciar sesión. Inténtalo nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>

        {error && <div className="error-message">{error}</div>}

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Ingresa tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="input-group">
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Ingresar"}
        </button>

      </form>
    </div>
  );
};

export default Login;
