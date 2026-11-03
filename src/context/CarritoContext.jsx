import { createContext, useContext, useState } from 'react';
import useCarrito from '../hooks/useCarrito';

// eslint-disable-next-line react-refresh/only-export-components
export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const carritoMethods = useCarrito();
  
  // Estado para controlar el modal de Checkout con el item seleccionado
  const [checkoutItem, setCheckoutItem] = useState(null);

  // Estado para abrir/cerrar el modal del Carrito de compras
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CarritoContext.Provider
      value={{ ...carritoMethods, checkoutItem, setCheckoutItem, isCartOpen, setIsCartOpen }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCarritoContext = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarritoContext debe ser utilizado dentro de un CarritoProvider');
  }
  return context;
};
