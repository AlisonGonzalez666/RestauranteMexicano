import AsyncStorage from '@react-native-async-storage/async-storage';
import { Producto } from '../data/menuData';

export interface ItemCarrito extends Producto {
  quantity: number;
}

export interface Orden {
  id: string;
  fecha: string;
  productos: ItemCarrito[];
  subtotal: string;
  iva: string;
  total: string;
}

const STORAGE_KEY_HISTORIAL = '@historial_ordenes';

/**
 * Guarda una nueva orden confirmada al inicio del historial en AsyncStorage.
 * @param nuevaOrden Objeto de la orden con fecha, productos y totales
 */
export const guardarOrden = async (nuevaOrden: Orden): Promise<boolean> => {
  try {
    const historialPrevioJson = await AsyncStorage.getItem(STORAGE_KEY_HISTORIAL);
    const historialPrevio: Orden[] = historialPrevioJson ? JSON.parse(historialPrevioJson) : [];
    
    // Se inserta al inicio para que quede ordenado de la más reciente a la más antigua
    const nuevoHistorial = [nuevaOrden, ...historialPrevio];
    
    await AsyncStorage.setItem(STORAGE_KEY_HISTORIAL, JSON.stringify(nuevoHistorial));
    return true;
  } catch (error) {
    console.error('Error al guardar la orden en AsyncStorage:', error);
    return false;
  }
};

/**
 * Obtiene la lista completa de órdenes almacenadas en AsyncStorage.
 * @returns Arreglo de órdenes guardadas
 */
export const obtenerHistorial = async (): Promise<Orden[]> => {
  try {
    const historialJson = await AsyncStorage.getItem(STORAGE_KEY_HISTORIAL);
    if (historialJson) {
      return JSON.parse(historialJson) as Orden[];
    }
    return [];
  } catch (error) {
    console.error('Error al obtener el historial de AsyncStorage:', error);
    return [];
  }
};

/**
 * Elimina todas las órdenes guardadas en el historial.
 */
export const limpiarHistorial = async (): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY_HISTORIAL);
    return true;
  } catch (error) {
    console.error('Error al limpiar el historial:', error);
    return false;
  }
};
