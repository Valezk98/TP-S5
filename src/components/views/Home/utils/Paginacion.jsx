export default function Paginacion({ paginaActual, totalPaginas, onCambiarPagina }) {
  if (totalPaginas <= 1) return null;

  // Genera los números de página visibles con elipses
  const generarPaginas = () => {
    if (totalPaginas <= 7) {
      return Array.from({ length: totalPaginas }, (_, i) => i + 1);
    }
    if (paginaActual <= 4) {
      return [1, 2, 3, 4, 5, '...', totalPaginas];
    }
    if (paginaActual >= totalPaginas - 3) {
      return [1, '...', totalPaginas - 4, totalPaginas - 3, totalPaginas - 2, totalPaginas - 1, totalPaginas];
    }
    return [1, '...', paginaActual - 1, paginaActual, paginaActual + 1, '...', totalPaginas];
  };

  const paginas = generarPaginas();

  return (
    <div
      aria-label="Paginación de juegos"
      className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-6 border-t border-slate-800"
    >

      <div className="flex items-center gap-1.5 flex-wrap justify-center">
        {/* Botón Anterior */}
        <button
          type="button"
          onClick={() => onCambiarPagina(paginaActual - 1)}
          disabled={paginaActual <= 1}
          aria-label="Página anterior"
          className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-sky-100 text-sm font-medium hover:bg-slate-800 disabled:opacity-30 transition-all flex items-center gap-1 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline">Anterior</span>
        </button>

        {/* Lista de números de página */}
        {paginas.map((num, idx) => {
          if (num === '...') {
            return (
              <span
                key={`ellipsis-${idx}`}
                className="w-8 h-8 flex items-center justify-center text-slate-500 font-mono text-sm select-none"
              >
                ...
              </span>
            );
          }

          const isActive = num === paginaActual;
          return (
            <button
              key={`page-${num}`}
              type="button"
              onClick={() => onCambiarPagina(num)}
              aria-current={isActive ? 'page' : undefined}
              className={`w-8 h-8 rounded-lg text-sm font-mono font-semibold transition-all flex items-center justify-center cursor-pointer border ${
                isActive
                  ? 'bg-sky-400 text-slate-950 border-sky-400 shadow-md font-bold'
                  : 'bg-slate-900 text-sky-100 hover:bg-slate-800 border-slate-700'
              }`}
            >
              {num}
            </button>
          );
        })}

        {/* Botón Siguiente */}
        <button
          type="button"
          onClick={() => onCambiarPagina(paginaActual + 1)}
          disabled={paginaActual >= totalPaginas}
          aria-label="Página siguiente"
          className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-sky-100 text-sm font-medium hover:bg-slate-800 disabled:opacity-30 transition-all flex items-center gap-1 cursor-pointer"
        >
          <span className="hidden sm:inline">Siguiente</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
