// Tabla de comparadores para el <select> de ordenamiento en Filtros.jsx.
export const COMPARADORES = {
  'recientes': (a, b) => new Date(b.release_date || 0) - new Date(a.release_date || 0),
  'antiguos': (a, b) => new Date(a.release_date || 0) - new Date(b.release_date || 0),
  'mayor-precio': (a, b) => (b.precio || 0) - (a.precio || 0),
  'menor-precio': (a, b) => (a.precio || 0) - (b.precio || 0),
};

// Aplica ordenamiento y filtro de favoritos sobre los juegos.
// La búsqueda por texto ahora la resuelve la API, así que ya no se filtra acá.
export function filtrarJuegos(games, { orden = '', favoritos = [] } = {}) {
  if (orden === 'favoritos') {
    return games.filter((game) => favoritos.includes(game.id));
  }

  const comparar = COMPARADORES[orden];
  return comparar ? [...games].sort(comparar) : games;
}
