 import { Routes, Route } from "react-router-dom";
 import Login from "./components/Login";
 import Dashboard from "./components/Dashboard";
 import Layout from "./layout/Layout.jsx";
import Register from "./components/register.jsx";
import Carrera from "./components/Carreras.jsx";

export default function App() {
  return (
     <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/register" element ={<Carrera/>}/>
      </Routes>      


  );
}

