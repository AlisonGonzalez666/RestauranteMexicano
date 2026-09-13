# App Restaurante Mexicano - Segundo Desafío Práctico

Aplicación móvil desarrollada en **React Native con Expo**, TypeScript y React Navigation para la gestión de órdenes de comida mexicana, cálculo de impuestos e historial de compras persistente.

---

## Información del Proyecto
- **Materia:** Desarrollo de Aplicaciones Móviles / DPS
- **Alumno:** Gonzalez Gonzalez, Alison Valeria / GG220710
- **Desafío:** Segundo Desafío Práctico (App Restaurante Mexicano)
- **Tecnologías:** React Native, Expo SDK 57, TypeScript, React Navigation, AsyncStorage.

---

## Enlace del Video Demostrativo
> **Enlace al video explicativo (YouTube / Google Drive):**  
> `[COLOCA AQUÍ EL ENLACE DE TU VIDEO DE DEMOSTRACIÓN]`

---

## Credenciales de Acceso (Paso 1)
Para ingresar a la aplicación en la pantalla de inicio de sesión:
- **Usuario:** `valeria`
- **Contraseña:** `1234`

---

## Funcionalidades y Cumplimiento de Rúbrica

### 1. Inicio de Sesión y Navegación
- [x] Validación estricta de campos vacíos con alertas en pantalla.
- [x] Validación de credenciales locales hardcodeadas (`valeria` / `1234`).
- [x] Navegación por pestañas (Tab Navigator) con 3 pantallas: **Catálogo**, **Mi Orden** e **Historial**.
- [x] Botón de cierre de sesión (*Logout*) en el encabezado.

### 2. Catálogo de Productos y Estructura de Datos
- [x] 10 Alimentos típicos mexicanos y 5 Bebidas con imagen, precio unitario y tipo (`alimento` / `bebida`).
- [x] Filtros interactivos por categoría (*Todos*, *Alimentos*, *Bebidas*).
- [x] Selector interactivo de cantidad con botones `[ - ]` y `[ + ]`.
- [x] **Validaciones de cantidad:**
  - Cantidad inicial en 0.
  - Alerta si se intenta agregar con cantidad 0.
  - Cantidad entera obligatoria.
  - Límite máximo de 20 unidades por producto.
- [x] Notificación visual con alerta al agregar producto y reinicio automático del contador a 0.

### 3. Orden Actual y Cálculos
- [x] Listado detallado de productos con imagen, cantidad, precio unitario y subtotal.
- [x] Modificación de cantidades y eliminación individual de ítems desde la orden.
- [x] Opción para vaciar la orden completa.
- [x] Cálculo automático de:
  - **Subtotal general**
  - **Impuesto (IVA del 13%)**
  - **Total final a pagar**
- [x] Diálogo de confirmación que solicita confirmar la orden con el monto exacto: `¿Deseas confirmar y enviar tu orden por un total de $X.XX?`.
- [x] Limpieza del carrito tras confirmación y guardado exitoso.

### 4. Historial de Compras (Persistencia con AsyncStorage)
- [x] Persistencia local mediante `@react-native-async-storage/async-storage`.
- [x] Módulo utilitario desacoplado (`src/utils/storage.ts`).
- [x] Carga automática al enfocar la pantalla con `useFocusEffect`.
- [x] Ordenamiento de la orden más reciente a la más antigua.
- [x] Detalle de fecha y hora, productos comprados, subtotales, IVA y total pagado.
- [x] Mensaje informativo cuando el historial está vacío.
- [x] Opción para limpiar el historial completo.

---

## Estructura del Proyecto

```text
RestauranteMexicano/
├── src/
│   ├── context/
│   │   └── CartContext.tsx      # Estado global del carrito y totales
│   ├── data/
│   │   └── menuData.ts          # Catálogo de 10 alimentos y 5 bebidas
│   ├── screens/
│   │   ├── CatalogScreen.tsx    # Pantalla de catálogo con stepper (+/-) y filtros
│   │   ├── HistoryScreen.tsx    # Historial de compras con useFocusEffect
│   │   ├── LoginScreen.tsx      # Pantalla de Login con validaciones
│   │   └── OrderScreen.tsx      # Pantalla de Mi Orden con IVA 13% y confirmación
│   └── utils/
│       └── storage.ts           # Funciones modulares para AsyncStorage
├── App.tsx                      # Punto de entrada y configuración de navegación
├── app.json                     # Configuración de Expo
├── package.json                 # Dependencias del proyecto
├── steps.md                     # Guía de requerimientos y prompts
└── README.md                    # Documentación del proyecto
```

---

## Instrucciones de Instalación y Ejecución

1. **Clonar o abrir el repositorio:**
   ```bash
   cd RestauranteMexicano
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo de Expo:**
   ```bash
   npx expo start
   ```

4. **Ejecutar en tu dispositivo o emulador:**
   - Presiona `a` para emulador Android.
   - Presiona `i` para simulador iOS.
   - Presiona `w` para abrir en el navegador web.
   - O escanea el código QR desde la app **Expo Go** en tu teléfono celular.
