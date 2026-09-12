import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { ItemCarrito } from './OrderScreen';

interface OrdenGuardada {
  id: string;
  fecha: string;
  productos: ItemCarrito[];
  total: string;
}

export default function HistoryScreen() {
  const [historialOrdenes, setHistorialOrdenes] = useState<OrdenGuardada[]>([]);

  // Carga las órdenes guardadas cada vez que el usuario entra a esta pestaña
  useFocusEffect(
    useCallback(() => {
      cargarHistorial();
    }, [])
  );

  const cargarHistorial = async () => {
    try {
      const datosGuardados = await AsyncStorage.getItem('@historial_ordenes');
      if (datosGuardados) {
        setHistorialOrdenes(JSON.parse(datosGuardados));
      } else {
        setHistorialOrdenes([]);
      }
    } catch (error) {
      console.log('Error al cargar el historial', error);
    }
  };

  const renderizarOrdenGuardada = ({ item }: { item: OrdenGuardada }) => (
    <View style={styles.tarjetaHistorial}>
      <Text style={styles.textoFecha}>📅 {item.fecha}</Text>
      <View style={styles.divisor} />
      {item.productos.map((prod, index) => (
        <View key={index} style={styles.filaProductoHistorial}>
          <Text style={styles.textoProducto}>- {prod.name} (x{prod.quantity})</Text>
          <Text style={styles.textoProducto}>${(prod.price * prod.quantity).toFixed(2)}</Text>
        </View>
      ))}
      <View style={styles.divisor} />
      <Text style={styles.textoTotalHistorial}>Total Pagado: ${item.total}</Text>
    </View>
  );

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>📋 Historial de Compras</Text>
      {historialOrdenes.length === 0 ? (
        <Text style={styles.textoVacio}>No hay órdenes confirmadas anteriormente.</Text>
      ) : (
        <FlatList data={historialOrdenes} renderItem={renderizarOrdenGuardada} keyExtractor={(item) => item.id} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#f4f6f7', padding: 15 },
  titulo: { fontSize: 20, fontWeight: 'bold', color: '#2c3e50', marginBottom: 15 },
  textoVacio: { textAlign: 'center', color: '#95a5a6', marginTop: 40, fontSize: 15 },
  tarjetaHistorial: { backgroundColor: '#fff', borderRadius: 8, padding: 15, marginBottom: 12, elevation: 2 },
  textoFecha: { fontSize: 13, fontWeight: 'bold', color: '#7f8c8d' },
  divisor: { height: 1, backgroundColor: '#eee', marginVertical: 8 },
  filaProductoHistorial: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  textoProducto: { fontSize: 14, color: '#333' },
  textoTotalHistorial: { fontSize: 15, fontWeight: 'bold', color: '#5cb85c', textAlign: 'right', marginTop: 5 },
});