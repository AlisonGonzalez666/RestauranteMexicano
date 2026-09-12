import React, { useState } from 'react';
import { TouchableOpacity, Alert, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import LoginScreen from './src/screens/LoginScreen';
import CatalogScreen from './src/screens/CatalogScreen';
import OrderScreen from './src/screens/OrderScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import { CartProvider, useCart } from './src/context/CartContext';

const Tab = createBottomTabNavigator();

interface MainTabsProps {
  onCerrarSesion: () => void;
}

function MainTabs({ onCerrarSesion }: MainTabsProps) {
  const { totalItems } = useCart();

  const confirmarCerrarSesion = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que deseas salir?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Salir', style: 'destructive', onPress: onCerrarSesion },
      ]
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: '#C62828',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        headerRight: () => (
          <TouchableOpacity
            style={styles.botonCerrarSesion}
            onPress={confirmarCerrarSesion}
            activeOpacity={0.7}
          >
            <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
            <Text style={styles.textoCerrarSesion}>Salir</Text>
          </TouchableOpacity>
        ),
        tabBarIcon: ({ color, size, focused }) => {
          let nombreIcono: keyof typeof Ionicons.glyphMap = 'restaurant';
          if (route.name === 'Catálogo') {
            nombreIcono = focused ? 'restaurant' : 'restaurant-outline';
          } else if (route.name === 'Mi Orden') {
            nombreIcono = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Historial') {
            nombreIcono = focused ? 'time' : 'time-outline';
          }
          return <Ionicons name={nombreIcono} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#C62828',
        tabBarInactiveTintColor: '#757575',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#EEEEEE',
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen
        name="Catálogo"
        component={CatalogScreen}
        options={{
          headerTitle: '🌮 Menú Mexicano',
        }}
      />
      <Tab.Screen
        name="Mi Orden"
        component={OrderScreen}
        options={{
          headerTitle: '🧾 Tu Orden Actual',
          tabBarBadge: totalItems > 0 ? totalItems : undefined,
          tabBarBadgeStyle: {
            backgroundColor: '#2E7D32',
            color: '#FFFFFF',
            fontSize: 11,
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen
        name="Historial"
        component={HistoryScreen}
        options={{
          headerTitle: '📋 Historial de Compras',
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [estaLogeado, setEstaLogeado] = useState<boolean>(false);

  return (
    <CartProvider>
      <StatusBar style="light" backgroundColor="#B71C1C" />
      {!estaLogeado ? (
        <LoginScreen onLoginSuccess={() => setEstaLogeado(true)} />
      ) : (
        <NavigationContainer>
          <MainTabs onCerrarSesion={() => setEstaLogeado(false)} />
        </NavigationContainer>
      )}
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  botonCerrarSesion: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 14,
    backgroundColor: '#B71C1C',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  textoCerrarSesion: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
  },
});