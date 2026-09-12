// Definimos la interfaz para los productos del menú
export interface Producto {
  id: string;
  name: string;
  price: number;
  image: string;
}

export const ALIMENTOS: Producto[] = [
  { id: '1', name: 'Tacos al Pastor', price: 6.50, image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=300' },
  { id: '2', name: 'Burrito de Res', price: 7.00, image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300' },
  { id: '3', name: 'Quesadilla Gigante', price: 5.50, image: 'https://images.unsplash.com/photo-1618046582417-c3b8d1bfa82e?w=300' },
  { id: '4', name: 'Enchiladas Rojas', price: 6.75, image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=300' },
  { id: '5', name: 'Nachos Supremos', price: 8.00, image: 'https://images.unsplash.com/photo-1582169536848-6d5523f3609f?w=300' },
  { id: '6', name: 'Tortas Ahogadas', price: 6.25, image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300' },
  { id: '7', name: 'Sopes Tradicionales', price: 5.00, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300' },
  { id: '8', name: 'Fajitas de Pollo', price: 8.50, image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=300' },
  { id: '9', name: 'Pozole Rojo', price: 7.50, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300' },
  { id: '10', name: 'Tamales Oaxaqueños', price: 4.50, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300' },
];

export const BEBIDAS: Producto[] = [
  { id: '11', name: 'Agua de Horchata', price: 2.50, image: 'https://images.unsplash.com/photo-1541658016010-6161c6b16523?w=300' },
  { id: '12', name: 'Agua de Jamaica', price: 2.50, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300' },
  { id: '13', name: 'Margarita Tradicional', price: 5.00, image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=300' },
  { id: '14', name: 'Cerveza Mexicana', price: 3.50, image: 'https://images.unsplash.com/photo-1608270105706-2544299b803a?w=300' },
  { id: '15', name: 'Jarrito de Mandarina', price: 2.25, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300' },
];