import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from "../supabase";
import CarrerasForm from './CarrerasForms';   // Importa el formulario
import CarrerasList from './CarrerasList';   // Importa la lista

// Este es el componente principal que une todo
function Carrera() {
  const [carreras, setCarreras] = useState([]);          // Estado para la lista de carreras
  const [isLoadingList, setIsLoadingList] = useState(true); // Estado de carga para la lista
  const [listError, setListError] = useState(null);     // Estado de error para la lista

  // Función para OBTENER las carreras de Supabase
  const fetchCarreras = useCallback(async () => {
    console.log("Fetching carreras..."); // Log para depuración
    setIsLoadingList(true);
    setListError(null);
    try {
      const { data, error } = await supabase
        .from('carreras')
        .select('*')
        .order('fecha', { ascending: false });

      if (error) throw error;
      setCarreras(data || []);

    } catch (err) {
      console.error('Error al obtener carreras:', err);
      setListError(err.message || 'Ocurrió un error desconocido');
      setCarreras([]);
    } finally {
      setIsLoadingList(false);
    }
  }, []); // useCallback para evitar re-creaciones innecesarias

  // useEffect para cargar las carreras iniciales al montar el componente
  useEffect(() => {
    fetchCarreras();
  }, [fetchCarreras]); // Se ejecuta cuando fetchCarreras cambia (solo la primera vez gracias a useCallback)

  // Esta función se pasa a CarrerasForm y se llama cuando se GUARDA una nueva carrera
  const handleNuevaCarreraGuardada = () => {
    console.log('Nueva carrera guardada, refrescando la lista...');
    fetchCarreras(); // Simplemente volvemos a pedir toda la lista actualizada
  };

  // --- Renderizado del componente principal ---
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
        Gestión de Carreras de Atletismo
      </h2>

      {/* Renderiza el Formulario, pasándole la función callback */}
      <CarrerasForm onCarreraGuardada={handleNuevaCarreraGuardada} />

      <hr className="my-8 border-gray-300" />

      {/* Renderiza la Lista, pasándole los datos y estados */}
      <CarrerasList
        carreras={carreras}
        isLoading={isLoadingList}
        error={listError}
      />
    </div>
  );
}

export default Carrera; // Exporta el componente principal/orquestador