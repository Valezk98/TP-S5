# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## Sobre el sitio y URL

GLITCH CORE es un proyecto que simula una tienda de videojuegos, en su versión temprana solo era una SPA que mostraba unos cuantos juegos en un panel, sin interacción, en esta versión se añadieron algunas funcionalidades, como la que permite añadirlos a un carrito, filtrarlos por precio y antigüedad y añadirlos a favoritos. 

https://glitchgamestore.netlify.app/

## API

Link de la documentación https://www.freetogame.com/api-doc

## Como correrlo en local

npm run dev & npm run server

## Decisiones

Fetch o axios?
- Para el fetching usé axios por cuestiones practicas, es el método que usé en el ultimo "proyecto grande" que realicé con APIs, no hay mucho más.

Que reutilicé?
- Reutilicé varios elementos del proyecto que trabaje durante los dos últimos dos sprints, la persistencia, los contextos, la lógica del carrito y los modales para el checkout y la lista del carrito.

Uso de IA
- Este fué el proyecto en el que mas recurrí a la IA, en parte porque hay funcionalidades que nunca había implementado y desconocía como hacerlas correctamente o simplemente conceptos a los que le perdí la practica, como por ejemplo el paginado y el armado de URL. Agilizó mucho lo que no podría haber logrado por cuestiones de tiempos que casi no tengo, por lo que fui haciendo un poco cada día o cada dos.

Este es el proyecto en el que 
