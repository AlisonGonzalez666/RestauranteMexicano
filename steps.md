# Guía de Prompts para Desarrollar el Segundo Desafío Práctico (App Restaurante Mexicano)

Esta guía divide los requerimientos del documento `SegundoDesafioPractico-DPSCII (1).pdf` en una serie de **pasos y prompts** (instrucciones) que puedes copiar y pegar en una Inteligencia Artificial (como ChatGPT, Claude o Gemini) para que te ayude a programar la aplicación de forma ordenada y cumpliendo todos los criterios de evaluación.

---

## 🛠️ Paso 1: Configuración Inicial, Navegación y Login
El primer paso es configurar el entorno con Expo, la navegación de la app y la pantalla de inicio de sesión.

**Copia y pega este prompt en tu IA:**
> "Actúa como un experto en React Native y Expo. Necesito iniciar una aplicación para un restaurante de comida mexicana. 
> 1. Crea la estructura de navegación usando `react-navigation`. 
> 2. Necesito una pantalla inicial de `Login` que valide un usuario y contraseña guardados en variables locales (hardcodeados). No deben permitirse campos vacíos. Mostrar errores en pantalla si los datos son incorrectos.
> 3. Al iniciar sesión correctamente, debe navegar a una pantalla de `Menú Principal` que utilice un Drawer o Tab Navigator para acceder a tres pantallas: 'Catálogo', 'Mi Orden' e 'Historial de Compras'."

---

## 🌮 Paso 2: Datos de Prueba (Mock Data) y Estructura de Datos
Necesitamos crear la lista de alimentos y preparar la integración con `AsyncStorage`.

**Copia y pega este prompt en tu IA:**
> "Para la aplicación de React Native que estamos construyendo, genera un archivo de datos (ej. `data.js`) que contenga un arreglo de 10 alimentos de comida mexicana y 5 bebidas. Cada objeto debe tener: `id`, `nombre`, `precio` (número real mayor a 0, ej. 4.50), tipo ('alimento' o 'bebida') y una URL de `imagen` de muestra.
> Además, diséñame funciones utilitarias usando `AsyncStorage` para dos cosas:
> 1. Guardar una orden confirmada en un arreglo de historial.
> 2. Obtener el historial completo de órdenes."

---

## 🛒 Paso 3: Pantalla de Catálogo de Productos
Esta es la pantalla donde el cliente selecciona qué comer, cumpliendo con las validaciones de cantidad.

**Copia y pega este prompt en tu IA:**
> "Crea la pantalla de 'Catálogo' en React Native. Requerimientos:
> 1. Muestra los productos divididos visualmente entre 'Alimentos' y 'Bebidas' (puedes usar Tabs, secciones o botones de filtro).
> 2. Cada producto debe mostrar su imagen, nombre, precio unitario formateado (ej. $5.00) y un selector de cantidad (botones + y -).
> 3. **Validaciones estrictas:** 
>    - La cantidad inicial es 0.
>    - El usuario no puede agregar un producto si la cantidad es 0.
>    - La cantidad debe ser entera y no exceder un máximo de 20 unidades.
>    - Muestra alertas en pantalla (usando Alert de React Native) si se intenta romper alguna regla.
> 4. Al presionar 'Agregar a la orden', el producto y su cantidad deben guardarse en un estado global (puedes usar Context API) para que la pantalla de 'Mi Orden' pueda leerlos."

---

## 🧾 Paso 4: Pantalla de la Orden Actual y Confirmación
Aquí calculamos los totales, aplicamos el IVA y validamos la compra.

**Copia y pega este prompt en tu IA:**
> "Crea la pantalla de 'Mi Orden' que lea los productos agregados desde el Catálogo. Requerimientos:
> 1. Muestra un listado con: nombre del producto, cantidad elegida y subtotal por producto.
> 2. Al final, calcula y muestra: Subtotal general, Impuesto (IVA del 13%) y Total final.
> 3. **Validaciones y Acciones:**
>    - Si la orden está vacía, deshabilita el botón de confirmar y muestra un mensaje en pantalla indicando que no hay productos.
>    - Al presionar 'Confirmar Orden', debe aparecer un diálogo de confirmación que diga '¿Confirmar orden por $X.XX?'.
>    - Si el usuario acepta, guarda la orden en `AsyncStorage` (con fecha, productos y total), limpia el carrito actual y muestra un mensaje de éxito."

---

## 📜 Paso 5: Pantalla de Historial de Compras
Finalmente, leemos los datos guardados usando AsyncStorage.

**Copia y pega este prompt en tu IA:**
> "Crea la pantalla de 'Historial de Compras'. Requerimientos:
> 1. Al cargar la pantalla (usa `useFocusEffect` o `useEffect`), debe leer las órdenes guardadas en `AsyncStorage`.
> 2. Muestra las órdenes ordenadas de la **más reciente a la más antigua**.
> 3. Por cada orden, muestra la fecha (formateada), la lista de productos comprados y el total pagado.
> 4. Si el historial está vacío, muestra un mensaje indicando que aún no hay compras."

---

## 🚀 Notas Adicionales para tu Entrega (Checklist del PDF):
*   **No copies y pegues ciegamente:** El PDF especifica que si tu código es 100% de internet, tendrás nota 0. Usa la IA para entender el código y adaptarlo a tu estilo.
*   **Entorno:** Asegúrate de correrlo en `expo start` o `snack.expo.dev`.
*   **Repositorio Local (Si aplica):** Si trabajas en VSCode, recuerda hacer al menos **10 commits** usando verbos en inglés o español (ej. *add login screen*, *fix cart bug*) pero NO spanglish.
*   **Video:** Graba un video de máximo 15 minutos. Primero muestra cómo funciona la App cumpliendo todas las validaciones, y luego explica las partes importantes del código. Sube el video a YouTube/Drive y pon el link en el `README.md`.
