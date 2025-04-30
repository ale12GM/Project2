 import { Routes, Route } from "react-router-dom";
 import Login from "./components/Login";
 import Dashboard from "./components/Dashboard";
 import Layout from "./layout/Layout.jsx";
import Register from "./components/register.jsx";
import Carrera from "./components/Carreras.jsx";
import Participantes from "./components/Participantes.jsx";
import Donaciones from "./components/Donaciones.jsx";
import DonacionesDetalle from "./components/DonacionesDetalle.jsx";



export default function App() {
  return (
     <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/register" element ={<Register/>}/>
        <Route path="/carreras" element ={<Layout><Carrera/></Layout>}/>
        <Route path="/participantes" element ={<Layout><Participantes/></Layout>}/>
        <Route path="/donaciones" element ={<Layout><Donaciones/></Layout>}/>
        <Route path="/donaciones/:id" element={<Layout><DonacionesDetalle /></Layout>} />




      </Routes>      


  );
}

