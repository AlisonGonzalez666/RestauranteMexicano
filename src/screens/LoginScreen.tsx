import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [usuario, setUsuario] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Credenciales locales fijas para el acceso
  const usuarioCorrecto = 'valeria';
  const passwordCorrecta = '1234';

  const manejarIngreso = () => {
    // Validar que no queden campos vacíos
    if (usuario.trim() === '' || password.trim() === '') {
      Alert.alert('Campos vacíos', 'Por favor ingresa tu usuario y contraseña.');
      return;
    }

    if (usuario === usuarioCorrecto && password === passwordCorrecta) {
      onLoginSuccess();
    } else {
      Alert.alert('Datos incorrectos', 'El usuario o la contraseña son inválidos.');
    }
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Restaurante Mexicano</Text>
      <Text style={styles.subtitulo}>Inicia sesión para ver el menú</Text>

      <TextInput
        style={styles.cajaTexto}
        placeholder="Usuario"
        placeholderTextColor="#888"
        value={usuario}
        onChangeText={setUsuario}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.cajaTexto}
        placeholder="Contraseña"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.boton} onPress={manejarIngreso}>
        <Text style={styles.textoBoton}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fdfdfd' },
  titulo: { fontSize: 26, fontWeight: 'bold', color: '#d9534f', marginBottom: 5 },
  subtitulo: { fontSize: 14, color: '#666', marginBottom: 25 },
  cajaTexto: { width: '100%', height: 48, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 15, marginBottom: 15, backgroundColor: '#fff' },
  boton: { width: '100%', height: 48, backgroundColor: '#d9534f', justifyContent: 'center', alignItems: 'center', borderRadius: 8 },
  textoBoton: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});