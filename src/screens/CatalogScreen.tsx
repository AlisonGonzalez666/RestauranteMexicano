import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { ALIMENTOS, BEBIDAS, Producto } from '../data/menuData';

interface CatalogScreenProps {
  onAgregarAlCarrito: (producto: Producto, cantidad: number) => void;
}

export default function CatalogScreen({ onAgregarAlCarrito }: CatalogScreenProps) {
  const [cantidades, setCantidades] = useState<{ [key: string]: string }>({});

  const cambiarCantidad = (id: string, valor: string) => {
    setCantidades({ ...cantidades, [id]: valor });
  };

  const validarYAgregar = (producto: Producto) => {
    const textoCantidad = cantidades[producto.id] || '';
    const cantidadNumerica = Number(textoCantidad);

    // Validaciones obligatorias de la rúbrica para las cantidades
    if (isNaN(cantidadNumerica) || !Number.isInteger(cantidadNumerica)) {
      Alert.alert('Error', 'La cantidad debe ser un número entero.');
      return;
    }
    if (cantidadNumerica <= 0) {
      Alert.alert('Error', 'Debes seleccionar al menos 1 unidad para agregar el producto.');
      return;
    }
    if (cantidadNumerica > 20) {
      Alert.alert('Error', 'El límite máximo permitido es de 20 unidades por producto.');
      return;
    }

    onAgregarAlCarrito(producto, cantidadNumerica);
    Alert.alert('¡Agregado!', `Se sumaron ${cantidadNumerica}x ${producto.name} a tu orden.`);
  };

  const renderizarElemento = ({ item }: { item: Producto }) => (
    <View style={styles.tarjeta}>
      <Image source={{ uri: item.image }} style={styles.imagen} />
      <View style={styles.info}>
        <Text style={styles.nombre}>{item.name}</Text>
        <Text style={styles.precio}>${item.price.toFixed(2)}</Text>
        
        <View style={styles.filaControles}>
          <TextInput
            style={styles.inputCantidad}
            placeholder="Cant"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={cantidades[item.id] || ''}
            onChangeText={(val) => cambiarCantidad(item.id, val)}
            maxLength={2}
          />
          <TouchableOpacity style={styles.botonAgregar} onPress={() => validarYAgregar(item)}>
            <Text style={styles.textoBotonAgregar}>Agregar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.contenedor}>
      <Text style={styles.seccionTitulo}>🌮 Alimentos</Text>
      <FlatList data={ALIMENTOS} renderItem={renderizarElemento} keyExtractor={(item) => item.id} scrollEnabled={false} />

      <Text style={styles.seccionTitulo}>🥤 Bebidas</Text>
      <FlatList data={BEBIDAS} renderItem={renderizarElemento} keyExtractor={(item) => item.id} scrollEnabled={false} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#f4f6f7', padding: 12 },
  seccionTitulo: { fontSize: 20, fontWeight: 'bold', color: '#333', marginVertical: 12 },
  tarjeta: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 8, padding: 10, marginBottom: 10, elevation: 2 },
  imagen: { width: 75, height: 75, borderRadius: 6 },
  info: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  nombre: { fontSize: 15, fontWeight: 'bold', color: '#2c3e50' },
  precio: { fontSize: 14, color: '#7f8c8d', marginVertical: 2 },
  filaControles: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  inputCantidad: { width: 45, height: 32, borderWidth: 1, borderColor: '#ccc', borderRadius: 4, textAlign: 'center', marginRight: 10, backgroundColor: '#fff' },
  botonAgregar: { backgroundColor: '#5cb85c', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 4 },
  textoBotonAgregar: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
});