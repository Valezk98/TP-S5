import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GamesProvider } from './context/GamesContext.jsx'
import { CarritoProvider } from './context/CarritoContext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GamesProvider>
        <CarritoProvider>
          <App />
        </CarritoProvider>
      </GamesProvider>
    </BrowserRouter>
  </StrictMode>,
)
