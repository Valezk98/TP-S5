export const handler = async (event) => {
  try {
    const category = event.queryStringParameters?.category;
    const url = new URL('https://www.freetogame.com/api/games');

    if (category) {
      url.searchParams.set('category', category);
    }

    const response = await fetch(url);

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Error al obtener datos de la API' }),
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300, s-maxage=300', // Cache 5 minutos
      },
      body: JSON.stringify(data),
    };
  } catch {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error interno del servidor' }),
    };
  }
};
