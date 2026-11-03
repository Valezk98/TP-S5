// Relación entre el campo `genre` que devuelve la API y los tags válidos
// que acepta el parámetro ?category=. Las claves van normalizadas
// (trim + lowercase). Los géneros sin tag válido se omiten.
const GENERO_A_TAG = {
  shooter: { value: 'shooter', label: 'Shooter' },
  mmorpg: { value: 'mmorpg', label: 'MMORPG' },
  mmo: { value: 'mmo', label: 'MMO' },
  moba: { value: 'moba', label: 'MOBA' },
  'battle royale': { value: 'battle-royale', label: 'Battle Royale' },
  strategy: { value: 'strategy', label: 'Strategy' },
  card: { value: 'card', label: 'Card Game' },
  'card game': { value: 'card', label: 'Card Game' },
  racing: { value: 'racing', label: 'Racing' },
  sports: { value: 'sports', label: 'Sports' },
  social: { value: 'social', label: 'Social' },
  fighting: { value: 'fighting', label: 'Fighting' },
  action: { value: 'action', label: 'Action' },
  'action game': { value: 'action', label: 'Action' },
  'action rpg': { value: 'action-rpg', label: 'Action RPG' },
  arpg: { value: 'action-rpg', label: 'Action RPG' },
  mmoarpg: { value: 'action-rpg', label: 'Action RPG' },
  fantasy: { value: 'fantasy', label: 'Fantasy' },
}

export const TAGS_VALIDOS = [...new Set(Object.values(GENERO_A_TAG).map((tag) => tag.value))]

export const esTagValido = (tag) => TAGS_VALIDOS.includes(tag)

// Deriva las opciones del select a partir del catálogo completo.
// Se deduplica por tag y se ordena por etiqueta.
export function obtenerGeneros(games) {
  const generos = new Map()

  games.forEach((game) => {
    const clave = game.genre?.trim().toLowerCase()
    const genero = GENERO_A_TAG[clave]
    if (genero && !generos.has(genero.value)) {
      generos.set(genero.value, genero)
    }
  })

  return [...generos.values()].sort((a, b) => a.label.localeCompare(b.label))
}
