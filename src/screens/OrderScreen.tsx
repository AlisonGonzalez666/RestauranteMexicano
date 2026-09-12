import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Producto } from '../data/menuData';

export interface ItemCarrito extends Producto {
  quantity: number;
}

interface OrderScreenProps {
  carrito: ItemCarrito[];
  limpiarCarrito: () => void;
}

export default function OrderScreen({ carrito, limpiarCarrito }: OrderScreenProps) {
  // Cálculos automáticos de subtotales, IVA del 13% y total final[cite: 1]
  const subtotal = carrito.reduce((suma, item) => suma + (item.price * item.quantity), 0);
  const iva = subtotal * 0.13;
  const totalFinal = subtotal + iva;

  const confirmarPedido = () => {
    // Validación para no permitir confirmar una orden vacía
    if (carrito.length === 0) {
      Alert.alert('Orden vacía', 'No puedes confirmar una orden sin productos seleccionados.');
      return;
    }

    Alert.alert(
      'Confirmar Orden',
      `¿Deseas enviar tu orden por un total de $${totalFinal.toFixed(2)}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sí, confirmar',
          onPress: async () => {
            try {
              const nuevaOrden = {
                id: Date.now().toString(),
                fecha: new Date().toLocaleString(),
                productos: carrito,
                total: totalFinal.toFixed(2),
              };

              const historialPrevio = await AsyncStorage.getItem('@historial_ordenes');
              const historial = historialPrevio ? JSON.parse(historialPrevio) : [];
              const nuevoHistorial = [nuevaOrden, ...historial];

              await AsyncStorage.setItem('@historial_ordenes', JSON.stringify(nuevoHistorial));

              Alert.alert('¡Éxito!', 'Tu orden se guardó en el historial correctamente.');
              limpiarCarrito();
            } catch (error) {
              Alert.alert('Error', 'No se pudo guardar la orden en el almacenamiento.');
            }
          }
        }
      ]
    );
  };

  const renderizarItemOrden = ({ item }: { item: ItemCarrito }) => (
    <View style={styles.filaItem}>
      <View style={{ flex: 2 }}>
        <Text style={styles.nombreItem}>{item.name}</Text>
        <Text style={styles.detalleItem}>{item.quantity} unidades x ${item.price.toFixed(2)}</Text>
      </View>
      <Text style={styles.subtotalItem}>${(item.price * item.quantity).toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>🧾 Tu Orden Actual</Text>

      {carrito.length === 0 ? (
        <Text style={styles.textoVacio}>No hay productos agregados en la orden actual.</Text>
      ) : (
        <>
          <FlatList data={carrito} renderItem={renderizarItemOrden} keyExtractor={(item) => item.id} style={{ flex: 1 }} />

          <View style={styles.cajaResumen}>
            <View style={styles.filaResumen}><Text>Subtotal:</Text><Text>${subtotal.toFixed(2)}</Text></View>
            <View style={styles.filaResumen}><Text>IVA (13%):</Text><Text>${iva.toFixed(2)}</Text></View>
            <View style={[styles.filaResumen, { borderTopWidth: 1, borderColor: '#eee', marginTop: 6, paddingTop: 6 }]}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Total Final:</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#d9534f' }}>${totalFinal.toFixed(2)}</Text>
            </View>

            <TouchableOpacity style={styles.botonConfirmar} onPress={confirmarPedido}>
              <Text style={styles.textoBotonConfirmar}>Confirmar y Guardar Orden</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#f4f6f7', padding: 15 },
  titulo: { fontSize: 20, fontWeight: 'bold', color: '#2c3e50', marginBottom: 15 },
  textoVacio: { textAlign: 'center', color: '#95a5a6', marginTop: 40, fontSize: 15 },
  filaItem: { flexDirection: 'row', backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 8, alignItems: 'center' },
  nombreItem: { fontSize: 15, fontWeight: 'bold', color: '#333' },
  detalleItem: { fontSize: 13, color: '#777', marginTop: 2 },
  subtotalItem: { fontSize: 15, fontWeight: 'bold', color: '#333', flex: 1, textAlign: 'right' },
  cajaResumen: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginTop: 10, elevation: 2 },
  filaResumen: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  botonConfirmar: { backgroundColor: '#5cb85c', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 12 },
  textoBotonConfirmar: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
});