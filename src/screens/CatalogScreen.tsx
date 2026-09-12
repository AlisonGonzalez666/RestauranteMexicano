import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ALIMENTOS, BEBIDAS, TODOS_LOS_PRODUCTOS, Producto } from '../data/menuData';
import { useCart } from '../context/CartContext';

type CategoriaFiltro = 'todos' | 'alimentos' | 'bebidas';

export default function CatalogScreen() {
  const { agregarAlCarrito } = useCart();
  const [categoria, setCategoria] = useState<CategoriaFiltro>('todos');
  const [cantidades, setCantidades] = useState<{ [id: string]: number }>({});

  const obtenerCantidadActual = (id: string): number => {
    return cantidades[id] !== undefined ? cantidades[id] : 0;
  };

  const decrementarCantidad = (id: string) => {
    const actual = obtenerCantidadActual(id);
    if (actual <= 0) {
      Alert.alert('Límite mínimo', 'La cantidad mínima es 0.');
      return;
    }
    setCantidades({ ...cantidades, [id]: actual - 1 });
  };

  const incrementarCantidad = (id: string) => {
    const actual = obtenerCantidadActual(id);
    if (actual >= 20) {
      Alert.alert('Límite máximo', 'No puedes seleccionar más de 20 unidades por producto.');
      return;
    }
    setCantidades({ ...cantidades, [id]: actual + 1 });
  };

  const manejarAgregarAlCarrito = (producto: Producto) => {
    const cantidad = obtenerCantidadActual(producto.id);

    // Validaciones estrictas requeridas por la rúbrica
    if (cantidad === 0) {
      Alert.alert(
        'Cantidad requerida',
        'La cantidad actual es 0. Usa los botones (+) y (-) para seleccionar al menos 1 unidad antes de agregar.'
      );
      return;
    }

    if (!Number.isInteger(cantidad) || isNaN(cantidad)) {
      Alert.alert('Error', 'La cantidad debe ser un número entero válido.');
      return;
    }

    if (cantidad < 1) {
      Alert.alert('Cantidad inválida', 'Debes seleccionar al menos 1 unidad.');
      return;
    }

    if (cantidad > 20) {
      Alert.alert('Límite excedido', 'El máximo permitido es de 20 unidades.');
      return;
    }

    // Agregar al estado global
    agregarAlCarrito(producto, cantidad);

    // Alerta de éxito
    Alert.alert(
      '¡Producto Agregado!',
      `Se agregaron ${cantidad} unidad(es) de "${producto.name}" a tu orden actual.`
    );

    // Restablecer el contador local a 0
    setCantidades({ ...cantidades, [producto.id]: 0 });
  };

  // Filtrar productos según la categoría seleccionada
  const productosFiltrados =
    categoria === 'alimentos'
      ? ALIMENTOS
      : categoria === 'bebidas'
      ? BEBIDAS
      : TODOS_LOS_PRODUCTOS;

  const renderizarProducto = ({ item }: { item: Producto }) => {
    const cantidadActual = obtenerCantidadActual(item.id);

    return (
      <View style={styles.tarjeta}>
        <Image source={{ uri: item.image }} style={styles.imagen} resizeMode="cover" />
        <View style={styles.info}>
          <View style={styles.cabeceraTarjeta}>
            <Text style={styles.nombre}>{item.name}</Text>
            <View style={[styles.badgeTipo, item.tipo === 'alimento' ? styles.badgeAlimento : styles.badgeBebida]}>
              <Text style={styles.textoBadgeTipo}>{item.tipo === 'alimento' ? '🌮 Comida' : '🥤 Bebida'}</Text>
            </View>
          </View>
          <Text style={styles.precio}>${item.price.toFixed(2)} c/u</Text>

          {/* Selector de cantidad interactivo (+ y -) */}
          <View style={styles.filaAcciones}>
            <View style={styles.stepperContainer}>
              <TouchableOpacity
                style={[styles.botonStepper, cantidadActual === 0 && styles.botonStepperDeshabilitado]}
                onPress={() => decrementarCantidad(item.id)}
                activeOpacity={0.7}
              >
                <Ionicons name="remove" size={16} color={cantidadActual === 0 ? '#999' : '#fff'} />
              </TouchableOpacity>

              <View style={styles.cajaCantidad}>
                <Text style={styles.textoCantidad}>{cantidadActual}</Text>
              </View>

              <TouchableOpacity
                style={[styles.botonStepper, cantidadActual >= 20 && styles.botonStepperDeshabilitado]}
                onPress={() => incrementarCantidad(item.id)}
                activeOpacity={0.7}
              >
                <Ionicons name="add" size={16} color={cantidadActual >= 20 ? '#999' : '#fff'} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.botonAgregar, cantidadActual === 0 && styles.botonAgregarInactivo]}
              onPress={() => manejarAgregarAlCarrito(item)}
              activeOpacity={0.8}
            >
              <Ionicons name="cart-outline" size={16} color="#fff" style={{ marginRight: 4 }} />
              <Text style={styles.textoBotonAgregar}>Agregar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.contenedor}>
      {/* Barra de Filtros por Categoría */}
      <View style={styles.filtrosContenedor}>
        <TouchableOpacity
          style={[styles.botonFiltro, categoria === 'todos' && styles.botonFiltroActivo]}
          onPress={() => setCategoria('todos')}
        >
          <Text style={[styles.textoFiltro, categoria === 'todos' && styles.textoFiltroActivo]}>
            Todos ({TODOS_LOS_PRODUCTOS.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botonFiltro, categoria === 'alimentos' && styles.botonFiltroActivo]}
          onPress={() => setCategoria('alimentos')}
        >
          <Text style={[styles.textoFiltro, categoria === 'alimentos' && styles.textoFiltroActivo]}>
            🌮 Alimentos ({ALIMENTOS.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botonFiltro, categoria === 'bebidas' && styles.botonFiltroActivo]}
          onPress={() => setCategoria('bebidas')}
        >
          <Text style={[styles.textoFiltro, categoria === 'bebidas' && styles.textoFiltroActivo]}>
            🥤 Bebidas ({BEBIDAS.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lista de productos */}
      <FlatList
        data={productosFiltrados}
        renderItem={renderizarProducto}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listaContenido}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  filtrosContenedor: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    justifyContent: 'space-between',
  },
  botonFiltro: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 3,
    borderRadius: 20,
    backgroundColor: '#F1F3F5',
    alignItems: 'center',
  },
  botonFiltroActivo: {
    backgroundColor: '#C62828',
  },
  textoFiltro: {
    fontSize: 12,
    fontWeight: '600',
    color: '#495057',
  },
  textoFiltroActivo: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  listaContenido: {
    padding: 12,
    paddingBottom: 25,
  },
  tarjeta: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  imagen: {
    width: 88,
    height: 88,
    borderRadius: 10,
    backgroundColor: '#EEEEEE',
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  cabeceraTarjeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  nombre: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
    flex: 1,
    marginRight: 6,
  },
  badgeTipo: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeAlimento: {
    backgroundColor: '#FFF3E0',
  },
  badgeBebida: {
    backgroundColor: '#E3F2FD',
  },
  textoBadgeTipo: {
    fontSize: 10,
    fontWeight: '700',
    color: '#555',
  },
  precio: {
    fontSize: 15,
    fontWeight: '800',
    color: '#C62828',
    marginTop: 2,
  },
  filaAcciones: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F3F5',
    borderRadius: 8,
    padding: 2,
  },
  botonStepper: {
    width: 28,
    height: 28,
    backgroundColor: '#C62828',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botonStepperDeshabilitado: {
    backgroundColor: '#E0E0E0',
  },
  cajaCantidad: {
    minWidth: 28,
    paddingHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoCantidad: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#212529',
  },
  botonAgregar: {
    flexDirection: 'row',
    backgroundColor: '#2E7D32',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonAgregarInactivo: {
    backgroundColor: '#81C784',
    opacity: 0.85,
  },
  textoBotonAgregar: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
});