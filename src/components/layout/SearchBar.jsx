import { useState, useContext } from 'react';
import { GamesContext } from '../../context/GamesContext';

export default function SearchBar() {
  const [inputValue, setInputValue] = useState('');
  const { setActiveSearchQuery } = useContext(GamesContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Al hacer submit, establecemos el query global para cambiar de vista
    setActiveSearchQuery(inputValue.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex ml-auto gap-2 w-auto items-center">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Busca un juego..."
        className="w-48 lg:w-64 bg-slate-900 border border-slate-700 text-sky-100 rounded-lg px-4 py-2 focus:outline-none hover:border-sky-400 text-sm transition-all"
      />
      <button
        type="submit"
        className="bg-sky-400 hover:bg-sky-300 text-slate-950 px-4 py-2 rounded-lg font-bold transition-all active:scale-95 cursor-pointer text-sm shrink-0"
      >
        Buscar
      </button>
    </form>
  );
}