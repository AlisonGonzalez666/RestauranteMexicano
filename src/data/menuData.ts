export interface Producto {
  id: string;
  name: string;
  price: number;
  image: any;
  tipo: 'alimento' | 'bebida';
}

export const ALIMENTOS: Producto[] = [
  { id: '1', name: 'Tacos al Pastor', price: 6.50, tipo: 'alimento', image: { uri: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=300' } },
  { id: '2', name: 'Burrito de Res', price: 7.00, tipo: 'alimento', image: { uri: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300' } },
  { id: '3', name: 'Quesadilla Gigante', price: 5.50, tipo: 'alimento', image: require('../../assets/quesadilla.png') },
  { id: '4', name: 'Enchiladas Rojas', price: 6.75, tipo: 'alimento', image: { uri: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=300' } },
  { id: '5', name: 'Nachos Supremos', price: 8.00, tipo: 'alimento', image: require('../../assets/nachos.png') },
  { id: '6', name: 'Tortas Ahogadas', price: 6.25, tipo: 'alimento', image: { uri: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300' } },
  { id: '7', name: 'Sopes Tradicionales', price: 5.00, tipo: 'alimento', image: { uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300' } },
  { id: '8', name: 'Fajitas de Pollo', price: 8.50, tipo: 'alimento', image: { uri: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=300' } },
  { id: '9', name: 'Pozole Rojo', price: 7.50, tipo: 'alimento', image: { uri: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300' } },
 { id: '10', name: 'Tamales Oaxaqueños', price: 4.50, tipo: 'alimento', image: { uri: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300' } },
];

export const BEBIDAS: Producto[] = [
  { id: '11', name: 'Agua de Horchata', price: 2.50, tipo: 'bebida', image: require('../../assets/horchata.png') },
  { id: '12', name: 'Agua de Jamaica', price: 2.50, tipo: 'bebida', image: { uri: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300' } },
  { id: '13', name: 'Margarita Tradicional', price: 5.00, tipo: 'bebida', image: { uri: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=300' } },
  { id: '14', name: 'Cerveza Mexicana', price: 3.50, tipo: 'bebida', image: require('../../assets/cerveza.png') },
{ id: '15', name: 'Jarrito de Mandarina', price: 2.25, tipo: 'bebida', image: { uri: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300' } },
];

export const TODOS_LOS_PRODUCTOS: Producto[] = [...ALIMENTOS, ...BEBIDAS];