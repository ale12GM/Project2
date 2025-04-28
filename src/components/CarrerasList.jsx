import React from 'react';

// Helper para formatear fecha (opcional)
const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
        return new Date(dateString + 'T00:00:00').toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch { return dateString; }
};

// Recibe la lista, estado de carga y error como props
function CarrerasList({ carreras, isLoading, error }) {

  // Muestra estado de carga
  if (isLoading) {
    return <p className="text-center text-gray-500 py-4">Cargando lista de carreras...</p>;
  }

  // Muestra estado de error
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
        <strong className="font-bold">Error al cargar:</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  // Muestra mensaje si no hay carreras
  if (!carreras || carreras.length === 0) {
    return <p className="text-center text-gray-500 py-4">No hay carreras registradas.</p>;
  }

  // Muestra la lista de carreras
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Carreras Registradas</h3>
      <div className="space-y-4">
        {carreras.map((carrera) => (
          // Renderiza cada carrera directamente aquí
          <div key={carrera.id} className="bg-white p-4 rounded-lg shadow border border-gray-200 transition-shadow hover:shadow-md">
            <h4 className="text-md font-semibold text-indigo-700 mb-1">{carrera.nombre}</h4>
            <div className="text-xs text-gray-600 space-y-0.5">
              <p><strong className="font-medium text-gray-700">Fecha:</strong> {formatDate(carrera.fecha)}</p>
              <p><strong className="font-medium text-gray-700">Km:</strong> {carrera.kilometros ?? 'N/A'}</p>
              {carrera.inicio && <p><strong className="font-medium">Inicio:</strong> {carrera.inicio}</p>}
              {carrera.llegada && <p><strong className="font-medium">Llegada:</strong> {carrera.llegada}</p>}
              {carrera.slogan && <p className="mt-1 italic text-gray-500">"{carrera.slogan}"</p>}
              {/* Podrías añadir descripción si quieres */}
            </div>
            {/* Podrías añadir botones Editar/Eliminar aquí en el futuro */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarrerasList;