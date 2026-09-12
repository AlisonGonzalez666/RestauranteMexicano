import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { guardarOrden, ItemCarrito } from '../utils/storage';

export default function OrderScreen() {
  const {
    carrito,
    actualizarCantidad,
    eliminarDelCarrito,
    limpiarCarrito,
    subtotal,
    iva,
    total,
  } = useCart();

  const manejarConfirmarPedido = () => {
    // Validación si el carrito está vacío
    if (carrito.length === 0) {
      Alert.alert(
        'Orden vacía',
        'No tienes productos agregados a tu orden. Por favor selecciona alimentos o bebidas del catálogo.'
      );
      return;
    }

    // Diálogo de confirmación requerido
    Alert.alert(
      'Confirmar Orden',
      `¿Deseas confirmar y enviar tu orden por un total de $${total.toFixed(2)}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sí, confirmar',
          style: 'default',
          onPress: async () => {
            const nuevaOrden = {
              id: Date.now().toString(),
              fecha: new Date().toLocaleString('es-SV', {
                dateStyle: 'medium',
                timeStyle: 'short',
              }),
              productos: carrito,
              subtotal: subtotal.toFixed(2),
              iva: iva.toFixed(2),
              total: total.toFixed(2),
            };

            const exito = await guardarOrden(nuevaOrden);

            if (exito) {
              Alert.alert(
                '¡Orden Confirmada con Éxito!',
                `Tu pedido por $${total.toFixed(2)} ha sido registrado y guardado en tu historial.`
              );
              limpiarCarrito();
            } else {
              Alert.alert(
                'Error al guardar',
                'Ocurrió un inconveniente al registrar la orden en el almacenamiento local.'
              );
            }
          },
        },
      ]
    );
  };

  const confirmarVaciarCarrito = () => {
    Alert.alert(
      'Vaciar Orden',
      '¿Estás seguro de que deseas eliminar todos los productos de tu orden?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Vaciar', style: 'destructive', onPress: limpiarCarrito },
      ]
    );
  };

  const renderizarItemOrden = ({ item }: { item: ItemCarrito }) => {
    const subtotalItem = item.price * item.quantity;

    return (
      <View style={styles.tarjetaItem}>
        <Image source={{ uri: item.image }} style={styles.imagenItem} resizeMode="cover" />
        <View style={styles.infoItem}>
          <View style={styles.filaTituloItem}>
            <Text style={styles.nombreItem}>{item.name}</Text>
            <TouchableOpacity
              onPress={() => eliminarDelCarrito(item.id)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="trash-outline" size={18} color="#D32F2F" />
            </TouchableOpacity>
          </View>

          <Text style={styles.precioUnitario}>Precio unitario: ${item.price.toFixed(2)}</Text>

          <View style={styles.filaInferiorItem}>
            {/* Controles de cantidad en la orden */}
            <View style={styles.stepperCarrito}>
              <TouchableOpacity
                style={styles.botonStepperMini}
                onPress={() => actualizarCantidad(item.id, item.quantity - 1)}
              >
                <Ionicons name="remove" size={14} color="#333" />
              </TouchableOpacity>

              <Text style={styles.textoCantidadCarrito}>{item.quantity}</Text>

              <TouchableOpacity
                style={styles.botonStepperMini}
                onPress={() => actualizarCantidad(item.id, item.quantity + 1)}
              >
                <Ionicons name="add" size={14} color="#333" />
              </TouchableOpacity>
            </View>

            <Text style={styles.subtotalItem}>${subtotalItem.toFixed(2)}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.contenedor}>
      {carrito.length === 0 ? (
        <View style={styles.vistaVacia}>
          <Ionicons name="cart-outline" size={80} color="#BDBDBD" />
          <Text style={styles.tituloVacio}>Tu orden está vacía</Text>
          <Text style={styles.subtituloVacio}>
            Explora el catálogo y agrega tus platillos y bebidas mexicanas favoritas.
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.cabeceraLista}>
            <Text style={styles.textoItemsContador}>
              {carrito.length} producto{carrito.length > 1 ? 's' : ''} en tu orden
            </Text>
            <TouchableOpacity onPress={confirmarVaciarCarrito}>
              <Text style={styles.textoVaciar}>Vaciar orden</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={carrito}
            renderItem={renderizarItemOrden}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listaContenido}
            showsVerticalScrollIndicator={false}
          />

          {/* Resumen de totales con cálculo de IVA (13%) */}
          <View style={styles.cajaResumen}>
            <Text style={styles.tituloResumen}>Resumen de Pago</Text>

            <View style={styles.filaResumen}>
              <Text style={styles.etiquetaResumen}>Subtotal</Text>
              <Text style={styles.valorResumen}>${subtotal.toFixed(2)}</Text>
            </View>

            <View style={styles.filaResumen}>
              <Text style={styles.etiquetaResumen}>Impuesto IVA (13%)</Text>
              <Text style={styles.valorResumen}>${iva.toFixed(2)}</Text>
            </View>

            <View style={styles.lineaDivisoria} />

            <View style={styles.filaResumenTotal}>
              <Text style={styles.etiquetaTotal}>Total a Pagar:</Text>
              <Text style={styles.valorTotal}>${total.toFixed(2)}</Text>
            </View>

            <TouchableOpacity
              style={styles.botonConfirmar}
              onPress={manejarConfirmarPedido}
              activeOpacity={0.85}
            >
              <Ionicons name="checkmark-circle-outline" size={20} color="#FFFFFF" style={{ marginRight: 6 }} />
              <Text style={styles.textoBotonConfirmar}>Confirmar y Guardar Orden</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  cabeceraLista: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
  },
  textoItemsContador: {
    fontSize: 14,
    fontWeight: '700',
    color: '#495057',
  },
  textoVaciar: {
    fontSize: 13,
    fontWeight: '600',
    color: '#D32F2F',
  },
  listaContenido: {
    padding: 12,
  },
  tarjetaItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  imagenItem: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
  },
  infoItem: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  filaTituloItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nombreItem: {
    fontSize: 15,
    fontWeight: '700',
    color: '#212529',
    flex: 1,
  },
  precioUnitario: {
    fontSize: 12,
    color: '#6C757D',
    marginTop: 2,
  },
  filaInferiorItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  stepperCarrito: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F3F5',
    borderRadius: 6,
    padding: 2,
  },
  botonStepperMini: {
    width: 24,
    height: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoCantidadCarrito: {
    fontSize: 13,
    fontWeight: '700',
    paddingHorizontal: 8,
    color: '#212529',
  },
  subtotalItem: {
    fontSize: 15,
    fontWeight: '800',
    color: '#2E7D32',
  },
  cajaResumen: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    borderColor: '#EEEEEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 10,
  },
  tituloResumen: {
    fontSize: 16,
    fontWeight: '800',
    color: '#212529',
    marginBottom: 10,
  },
  filaResumen: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  etiquetaResumen: {
    fontSize: 14,
    color: '#6C757D',
  },
  valorResumen: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212529',
  },
  lineaDivisoria: {
    height: 1,
    backgroundColor: '#E9ECEF',
    marginVertical: 8,
  },
  filaResumenTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  etiquetaTotal: {
    fontSize: 17,
    fontWeight: '800',
    color: '#212529',
  },
  valorTotal: {
    fontSize: 20,
    fontWeight: '900',
    color: '#C62828',
  },
  botonConfirmar: {
    flexDirection: 'row',
    backgroundColor: '#2E7D32',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 4,
  },
  textoBotonConfirmar: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
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