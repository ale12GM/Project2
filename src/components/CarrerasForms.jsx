import React, { useState } from 'react';
import { supabase } from "../supabase";

// Recibe una función para notificar cuando se guarda una carrera
function CarrerasForm({ onCarreraGuardada }) {
  const [mensaje, setMensaje] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '', fecha: '', kilometros: '', inicio: '', llegada: '', slogan: '', descripcion: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);
    setIsLoading(true);

    if (!formData.nombre || !formData.fecha || !formData.kilometros) {
      setMensaje({ tipo: 'error', texto: 'Completa los campos obligatorios (*).' });
      setIsLoading(false);
      return;
    }

    try {
      const kilometrosFloat = parseFloat(formData.kilometros);
      if (isNaN(kilometrosFloat)) {
        throw new Error('Kilómetros debe ser un número.');
      }

      const { data, error } = await supabase
        .from('carreras')
        .insert([
          {
            nombre: formData.nombre,
            fecha: formData.fecha,
            kilometros: kilometrosFloat,
            inicio: formData.inicio || null,
            llegada: formData.llegada || null,
            slogan: formData.slogan || null,
            descripcion: formData.descripcion || null,
          },
        ])
        .select(); // Confirmar inserción

      if (error) throw error;

      setMensaje({ tipo: 'exito', texto: '¡Carrera guardada!' });
      setFormData({ // Limpiar formulario
        nombre: '', fecha: '', kilometros: '', inicio: '', llegada: '', slogan: '', descripcion: '',
      });

      // Notificar al componente padre que se guardó una nueva carrera
      if (onCarreraGuardada) {
        onCarreraGuardada(); // Llama a la función pasada como prop
      }

      setTimeout(() => setMensaje(null), 3000); // Limpiar mensaje después de 3s

    } catch (error) {
      console.error('Error al guardar carrera:', error);
      setMensaje({ tipo: 'error', texto: `Error: ${error.message || 'No se pudo guardar.'}` });
    } finally {
      setIsLoading(false);
    }
  };

  // --- JSX del Formulario (similar al anterior) ---
  return (
    <div className="mb-10 p-6 bg-gray-50 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Añadir Nueva Carrera</h3>
      {mensaje && (
        <div
          className={`p-3 mb-4 rounded-md text-sm font-medium ${
            mensaje.tipo === 'exito' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'
          }`}
        >
          {mensaje.texto}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* --- Inputs del formulario (iguales que antes) --- */}
         {/* Campo Nombre */}
         <div>
           <label htmlFor="form-nombre" className="block text-sm font-medium text-gray-600 mb-1">
             Nombre <span className="text-red-500">*</span>
           </label>
           <input
             type="text" id="form-nombre" name="nombre" value={formData.nombre} onChange={handleChange} required
             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
             placeholder="Maratón Principal"
           />
         </div>
         {/* Fecha y Kilómetros */}
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
           <div>
             <label htmlFor="form-fecha" className="block text-sm font-medium text-gray-600 mb-1">
               Fecha <span className="text-red-500">*</span>
             </label>
             <input
               type="date" id="form-fecha" name="fecha" value={formData.fecha} onChange={handleChange} required
               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
             />
           </div>
           <div>
             <label htmlFor="form-kilometros" className="block text-sm font-medium text-gray-600 mb-1">
               Kilómetros <span className="text-red-500">*</span>
             </label>
             <input
               type="number" id="form-kilometros" name="kilometros" value={formData.kilometros} onChange={handleChange} required step="0.1" min="0"
               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
               placeholder="42.2"
             />
           </div>
         </div>
         {/* Inicio y Llegada */}
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
           <div>
             <label htmlFor="form-inicio" className="block text-sm font-medium text-gray-600 mb-1">Lugar Inicio</label>
             <input
               type="text" id="form-inicio" name="inicio" value={formData.inicio} onChange={handleChange}
               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
               placeholder="Parque Central"
             />
           </div>
           <div>
             <label htmlFor="form-llegada" className="block text-sm font-medium text-gray-600 mb-1">Lugar Llegada</label>
             <input
               type="text" id="form-llegada" name="llegada" value={formData.llegada} onChange={handleChange}
               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
               placeholder="Estadio Municipal"
             />
           </div>
         </div>
         {/* Slogan */}
         <div>
             <label htmlFor="form-slogan" className="block text-sm font-medium text-gray-600 mb-1">Slogan</label>
             <input
               type="text" id="form-slogan" name="slogan" value={formData.slogan} onChange={handleChange}
               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
               placeholder="¡Corre por tus sueños!"
             />
         </div>
         {/* Descripción */}
         <div>
           <label htmlFor="form-descripcion" className="block text-sm font-medium text-gray-600 mb-1">Descripción</label>
           <textarea
             id="form-descripcion" name="descripcion" value={formData.descripcion} onChange={handleChange} rows="3"
             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
             placeholder="Breve descripción de la carrera..."
           />
         </div>
        {/* Botón */}
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition duration-150 ease-in-out ${
              isLoading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            }`}
          >
            {isLoading ? 'Guardando...' : 'Guardar Carrera'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CarrerasForm;