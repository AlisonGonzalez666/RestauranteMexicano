import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from './src/screens/LoginScreen';
import CatalogScreen from './src/screens/CatalogScreen';
import OrderScreen, { ItemCarrito } from './src/screens/OrderScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import { Producto } from './src/data/menuData';

const Tab = createBottomTabNavigator();

export default function App() {
  const [estaLogeado, setEstaLogeado] = useState<boolean>(false);
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);

  // Función para agregar productos o actualizar la cantidad si ya existen en el carrito
  const agregarAlCarrito = (producto: Producto, cantidad: number) => {
    const indiceExistente = carrito.findIndex((item) => item.id === producto.id);
    if (indiceExistente >= 0) {
      const carritoActualizado = [...carrito];
      carritoActualizado[indiceExistente].quantity += cantidad;
      setCarrito(carritoActualizado);
    } else {
      setCarrito([...carrito, { ...producto, quantity: cantidad }]);
    }
  };

  // Si no ha iniciado sesión, mostramos la pantalla de Login
  if (!estaLogeado) {
    return <LoginScreen onLoginSuccess={() => setEstaLogeado(true)} />;
  }

  // Si ya inició sesión, mostramos las pestañas de navegación principal
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let icono: keyof typeof Ionicons.glyphMap = 'help';
            if (route.name === 'Menú') icono = 'restaurant';
            else if (route.name === 'Orden') icono = 'cart';
            else if (route.name === 'Historial') icono = 'time';
            return <Ionicons name={icono} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#d9534f',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Menú">
          {() => <CatalogScreen onAgregarAlCarrito={agregarAlCarrito} />}
        </Tab.Screen>
        <Tab.Screen name="Orden">
          {() => <OrderScreen carrito={carrito} limpiarCarrito={() => setCarrito([])} />}
        </Tab.Screen>
        <Tab.Screen name="Historial" component={HistoryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}