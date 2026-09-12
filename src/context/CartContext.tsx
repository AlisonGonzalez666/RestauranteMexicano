import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Producto } from '../data/menuData';
import { ItemCarrito } from '../utils/storage';

interface CartContextType {
  carrito: ItemCarrito[];
  agregarAlCarrito: (producto: Producto, cantidad: number) => void;
  eliminarDelCarrito: (id: string) => void;
  actualizarCantidad: (id: string, cantidad: number) => void;
  limpiarCarrito: () => void;
  totalItems: number;
  subtotal: number;
  iva: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);

  const agregarAlCarrito = (producto: Producto, cantidad: number) => {
    setCarrito((prevCarrito) => {
      const indice = prevCarrito.findIndex((item) => item.id === producto.id);
      if (indice >= 0) {
        const nuevo = [...prevCarrito];
        const nuevaCantidad = nuevo[indice].quantity + cantidad;
        // Limitamos a un máximo de 20 por producto
        nuevo[indice].quantity = nuevaCantidad > 20 ? 20 : nuevaCantidad;
        return nuevo;
      } else {
        return [...prevCarrito, { ...producto, quantity: cantidad }];
      }
    });
  };

  const actualizarCantidad = (id: string, cantidad: number) => {
    if (cantidad <= 0) {
      eliminarDelCarrito(id);
      return;
    }
    setCarrito((prevCarrito) =>
      prevCarrito.map((item) =>
        item.id === id ? { ...item, quantity: cantidad > 20 ? 20 : cantidad } : item
      )
    );
  };

  const eliminarDelCarrito = (id: string) => {
    setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== id));
  };

  const limpiarCarrito = () => {
    setCarrito([]);
  };

  const totalItems = carrito.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = carrito.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const iva = subtotal * 0.13;
  const total = subtotal + iva;

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        actualizarCantidad,
        limpiarCarrito,
        totalItems,
        subtotal,
        iva,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser utilizado dentro de un CartProvider');
  }
  return context;
};
