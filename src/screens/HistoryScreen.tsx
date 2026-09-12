import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { obtenerHistorial, limpiarHistorial, Orden } from '../utils/storage';

export default function HistoryScreen() {
  const [historialOrdenes, setHistorialOrdenes] = useState<Orden[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);

  // useFocusEffect para recargar el historial automáticamente cada vez que el usuario entra a esta pestaña
  useFocusEffect(
    useCallback(() => {
      cargarHistorial();
    }, [])
  );

  const cargarHistorial = async () => {
    setCargando(true);
    const datos = await obtenerHistorial();
    setHistorialOrdenes(datos);
    setCargando(false);
  };

  const manejarLimpiarHistorial = () => {
    if (historialOrdenes.length === 0) return;

    Alert.alert(
      'Borrar Historial',
      '¿Deseas eliminar todas las compras registradas en el historial?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Borrar todo',
          style: 'destructive',
          onPress: async () => {
            const exito = await limpiarHistorial();
            if (exito) {
              setHistorialOrdenes([]);
              Alert.alert('Historial borrado', 'Se han eliminado todas las órdenes anteriores.');
            }
          },
        },
      ]
    );
  };

  const renderizarOrden = ({ item }: { item: Orden }) => (
    <View style={styles.tarjetaHistorial}>
      {/* Cabecera de la orden con fecha */}
      <View style={styles.cabeceraOrden}>
        <View style={styles.filaIconoFecha}>
          <Ionicons name="calendar-outline" size={16} color="#C62828" />
          <Text style={styles.textoFecha}>{item.fecha}</Text>
        </View>
        <View style={styles.badgeOrdenId}>
          <Text style={styles.textoOrdenId}>ID: #{item.id.slice(-5)}</Text>
        </View>
      </View>

      <View style={styles.divisor} />

      {/* Lista de productos de la orden */}
      <View style={styles.seccionProductos}>
        <Text style={styles.tituloProductos}>Detalle de productos:</Text>
        {item.productos.map((prod, index) => (
          <View key={`${item.id}-p-${index}`} style={styles.filaProducto}>
            <Text style={styles.nombreProducto}>
              • {prod.name} <Text style={styles.cantidadProducto}>(x{prod.quantity})</Text>
            </Text>
            <Text style={styles.precioProducto}>
              ${(prod.price * prod.quantity).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.divisor} />

      {/* Desglose de totales */}
      <View style={styles.desgloseTotales}>
        {item.subtotal && item.iva ? (
          <>
            <View style={styles.filaTotalMini}>
              <Text style={styles.textoMiniLabel}>Subtotal:</Text>
              <Text style={styles.textoMiniValor}>${item.subtotal}</Text>
            </View>
            <View style={styles.filaTotalMini}>
              <Text style={styles.textoMiniLabel}>IVA (13%):</Text>
              <Text style={styles.textoMiniValor}>${item.iva}</Text>
            </View>
          </>
        ) : null}

        <View style={styles.filaTotalPagado}>
          <Text style={styles.etiquetaTotalPagado}>Total Pagado:</Text>
          <Text style={styles.valorTotalPagado}>${item.total}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.contenedor}>
      {historialOrdenes.length > 0 && (
        <View style={styles.barraAcciones}>
          <Text style={styles.textoTotalOrdenes}>
            {historialOrdenes.length} orden{historialOrdenes.length > 1 ? 'es' : ''} registrada{historialOrdenes.length > 1 ? 's' : ''}
          </Text>
          <TouchableOpacity onPress={manejarLimpiarHistorial}>
            <Text style={styles.textoBotonBorrar}>Borrar historial</Text>
          </TouchableOpacity>
        </View>
      )}

      {historialOrdenes.length === 0 ? (
        <View style={styles.vistaVacia}>
          <Ionicons name="receipt-outline" size={80} color="#BDBDBD" />
          <Text style={styles.tituloVacio}>Aún no hay compras registradas</Text>
          <Text style={styles.subtituloVacio}>
            Cuando confirmes una orden en la sección "Mi Orden", aparecerá guardada aquí con su fecha y detalle.
          </Text>
        </View>
      ) : (
        <FlatList
          data={historialOrdenes}
          renderItem={renderizarOrden}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listaContenido}
          showsVerticalScrollIndicator={false}
          refreshing={cargando}
          onRefresh={cargarHistorial}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  barraAcciones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
  },
  textoTotalOrdenes: {
    fontSize: 14,
    fontWeight: '700',
    color: '#495057',
  },
  textoBotonBorrar: {
    fontSize: 13,
    fontWeight: '600',
    color: '#D32F2F',
  },
  listaContenido: {
    padding: 12,
    paddingBottom: 25,
  },
  tarjetaHistorial: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 3,
  },
  cabeceraOrden: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filaIconoFecha: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textoFecha: {
    fontSize: 13,
    fontWeight: '700',
    color: '#212529',
    marginLeft: 6,
  },
  badgeOrdenId: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  textoOrdenId: {
    fontSize: 11,
    fontWeight: '700',
    color: '#E65100',
  },
  divisor: {
    height: 1,
    backgroundColor: '#F1F3F5',
    marginVertical: 10,
  },
  seccionProductos: {
    paddingVertical: 2,
  },
  tituloProductos: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6C757D',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  filaProducto: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  nombreProducto: {
    fontSize: 14,
    color: '#343A40',
    flex: 1,
  },
  cantidadProducto: {
    fontWeight: '700',
    color: '#C62828',
  },
  precioProducto: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
  },
  desgloseTotales: {
    marginTop: 2,
  },
  filaTotalMini: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  textoMiniLabel: {
    fontSize: 12,
    color: '#868E96',
  },
  textoMiniValor: {
    fontSize: 12,
    fontWeight: '600',
    color: '#495057',
  },
  filaTotalPagado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    paddingTop: 4,
  },
  etiquetaTotalPagado: {
    fontSize: 15,
    fontWeight: '800',
    color: '#212529',
  },
  valorTotalPagado: {
    fontSize: 17,
    fontWeight: '900',
    color: '#2E7D32',
  },
  vistaVacia: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  tituloVacio: {
    fontSize: 18,
    fontWeight: '800',
    color: '#495057',
    marginTop: 15,
  },
  subtituloVacio: {
    fontSize: 14,
    color: '#868E96',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
});