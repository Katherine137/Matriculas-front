import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from 'react'
import Login from "./pages/Login";
import Home from "./pages/Home";
import Matricula from "./pages/Matricula";
import ListMatriculas from "./pages/Matricula/Listar";
import CrearMatricula from "./pages/Matricula/Crear";
import ActMatricula from "./pages/Matricula/Actualizar";
import Estudiante from "./pages/Estudiantes";
import CrearEstudiante from "./pages/Estudiante/Crear";
import ActEstudiante from "./pages/Estudiante/Actualizar";
import ListEstudiante from "./pages/Estudiante/Listar";
import Materia from "./pages/Materias";
import CrearMateria from "./pages/Materia/Crear";
import ListMaterias from "./pages/Materia/Listar";
import ActMateria from "./pages/Materia/Actualizar";
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/Home" element={<Home/>}/>
      <Route path="/matricula" element={<Matricula/>}/>
      <Route path="/crearmatricula" element={<CrearMatricula/>}/>
      <Route path="/listmatriculas" element={<ListMatriculas/>}/>
      <Route path="/actmatricula/:id" element={<ActMatricula/>}/>

      <Route path="/estudiante" element={<Estudiante/>}/>
      <Route path="/crearestudiante" element={<CrearEstudiante/>}/>
      <Route path="/listestudiante" element={<ListEstudiante/>}/>
      <Route path="/actestudiante/:id" element={<ActEstudiante/>}/>
      
      <Route path="/materia" element={<Materia/>}/>
      <Route path="/crearmateria" element={<CrearMateria/>}/>
      <Route path="/listmaterias" element={<ListMaterias/>}/>
      <Route path="/actmateria/:id" element={<ActMateria/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App
