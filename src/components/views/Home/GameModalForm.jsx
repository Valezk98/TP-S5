import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function GameModalForm({ isOpen, onClose, onSubmitGame, gameToEdit }) {
  const isEditing = Boolean(gameToEdit);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: '',
      genre: '',
      platform: 'PC (Windows)',
      thumbnail: '',
      short_description: '',
      game_url: '',
      developer: '',
      publisher: '',
      release_date: '',
    },
  });

  useEffect(() => {
    if (gameToEdit) {
      reset({
        title: gameToEdit.title || '',
        genre: gameToEdit.genre || '',
        platform: gameToEdit.platform || 'PC (Windows)',
        thumbnail: gameToEdit.thumbnail || '',
        short_description: gameToEdit.short_description || '',
        game_url: gameToEdit.game_url || '',
        developer: gameToEdit.developer || '',
        publisher: gameToEdit.publisher || '',
        release_date: gameToEdit.release_date || '',
      });
    } else {
      reset({
        title: '',
        genre: '',
        platform: 'PC (Windows)',
        thumbnail: '',
        short_description: '',
        game_url: '',
        developer: '',
        publisher: '',
        release_date: new Date().toISOString().split('T')[0],
      });
    }
  }, [gameToEdit, reset, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const onFormSubmit = async (data) => {
    await onSubmitGame(data);
    onClose();
  };

  const inputClass =
    'w-full bg-surface-container-lowest border border-outline-variant/40 text-on-surface rounded-lg px-3.5 py-2 placeholder-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-all';

  return (
    <div
      className="fixed inset-0 bg-surface-container-lowest/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-surface-container border border-outline-variant/40 rounded-2xl w-[92%] sm:w-[560px] max-w-[560px] overflow-hidden shadow-2xl my-auto transition-all animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/30 bg-surface-container-high">
          <h2 className="text-lg font-bold text-primary flex items-center gap-2">
            <span>{isEditing ? '✏️ Editar Juego' : '➕ Nuevo Juego'}</span>
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg hover:bg-surface-bright transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit(onFormSubmit)} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">
              Título *
            </label>
            <input
              type="text"
              placeholder="Ej: Overwatch 2"
              className={inputClass}
              {...register('title', { required: 'El título es requerido' })}
            />
            {errors.title && <p className="text-xs text-error mt-1">{errors.title.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">
                Género *
              </label>
              <input
                type="text"
                placeholder="Ej: Shooter, MMORPG..."
                className={inputClass}
                {...register('genre', { required: 'El género es requerido' })}
              />
              {errors.genre && <p className="text-xs text-error mt-1">{errors.genre.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">
                Plataforma *
              </label>
              <select className={inputClass} {...register('platform', { required: true })}>
                <option value="PC (Windows)">PC (Windows)</option>
                <option value="Web Browser">Web Browser</option>
                <option value="PC (Windows), Web Browser">PC (Windows), Web Browser</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">
              URL de Miniatura (Thumbnail) *
            </label>
            <input
              type="url"
              placeholder="https://..."
              className={inputClass}
              {...register('thumbnail', { required: 'La URL de la imagen es requerida' })}
            />
            {errors.thumbnail && <p className="text-xs text-error mt-1">{errors.thumbnail.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">
              URL del Juego *
            </label>
            <input
              type="url"
              placeholder="https://..."
              className={inputClass}
              {...register('game_url', { required: 'La URL del juego es requerida' })}
            />
            {errors.game_url && <p className="text-xs text-error mt-1">{errors.game_url.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">
              Descripción Breve *
            </label>
            <textarea
              rows="3"
              placeholder="Resumen del juego..."
              className={inputClass}
              {...register('short_description', { required: 'La descripción es requerida' })}
            ></textarea>
            {errors.short_description && (
              <p className="text-xs text-error mt-1">{errors.short_description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">
                Desarrollador
              </label>
              <input
                type="text"
                placeholder="Ej: Blizzard"
                className={inputClass}
                {...register('developer')}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">
                Publisher
              </label>
              <input
                type="text"
                placeholder="Ej: Activision"
                className={inputClass}
                {...register('publisher')}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">
                Fecha Lanzamiento
              </label>
              <input
                type="date"
                className={inputClass}
                {...register('release_date')}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-outline-variant/30 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-outline-variant/40 text-on-surface hover:bg-surface-bright transition-colors text-sm font-semibold cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary/90 transition-all text-sm font-bold shadow-md cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? 'Guardando...' : isEditing ? 'Guardar Cambios' : 'Crear Juego'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

