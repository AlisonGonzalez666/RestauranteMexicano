import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [usuario, setUsuario] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [mostrarPassword, setMostrarPassword] = useState<boolean>(false);

  // Credenciales locales fijas para el acceso (Requerimiento Paso 1)
  const USUARIO_CORRECTO = 'valeria';
  const PASSWORD_CORRECTA = '1234';

  const manejarIngreso = () => {
    // Validación 1: No permitir campos vacíos
    if (usuario.trim() === '' || password.trim() === '') {
      Alert.alert(
        'Campos requeridos',
        'Por favor completa todos los campos para poder ingresar.'
      );
      return;
    }

    // Validación 2: Comprobar credenciales
    if (usuario.trim() === USUARIO_CORRECTO && password === PASSWORD_CORRECTA) {
      onLoginSuccess();
    } else {
      Alert.alert(
        'Acceso denegado',
        'El usuario o la contraseña ingresados son incorrectos. Intenta de nuevo.'
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.contenedor}
    >
      <View style={styles.tarjetaLogin}>
        {/* Encabezado / Logo */}
        <View style={styles.circuloIcono}>
          <Text style={styles.emojiLogo}>🌮</Text>
        </View>

        <Text style={styles.titulo}>El Sabor Mexicano</Text>
        <Text style={styles.subtitulo}>Auténtica Comida Tradicional</Text>

        {/* Input Usuario */}
        <View style={styles.campoContenedor}>
          <Ionicons name="person-outline" size={20} color="#777" style={styles.iconoInput} />
          <TextInput
            style={styles.input}
            placeholder="Usuario"
            placeholderTextColor="#999"
            value={usuario}
            onChangeText={setUsuario}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Input Contraseña */}
        <View style={styles.campoContenedor}>
          <Ionicons name="lock-closed-outline" size={20} color="#777" style={styles.iconoInput} />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#999"
            secureTextEntry={!mostrarPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setMostrarPassword(!mostrarPassword)}
            style={styles.botonOjo}
          >
            <Ionicons
              name={mostrarPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#777"
            />
          </TouchableOpacity>
        </View>

        {/* Botón de Ingreso */}
        <TouchableOpacity
          style={styles.botonIngresar}
          onPress={manejarIngreso}
          activeOpacity={0.85}
        >
          <Text style={styles.textoBoton}>Iniciar Sesión</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
        </TouchableOpacity>

        {/* Tarjeta de credenciales de prueba */}
        <View style={styles.cajaCredenciales}>
          <Text style={styles.tituloCredenciales}>Credenciales de prueba:</Text>
          <Text style={styles.textoCredenciales}>Usuario: <Text style={styles.negrita}>valeria</Text></Text>
          <Text style={styles.textoCredenciales}>Contraseña: <Text style={styles.negrita}>1234</Text></Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#F4F5F7',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  tarjetaLogin: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  circuloIcono: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#FFEBEE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#FFCDD2',
  },
  emojiLogo: {
    fontSize: 40,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '800',
    color: '#C62828',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 13,
    color: '#666',
    marginBottom: 24,
  },
  campoContenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 14,
  },
  iconoInput: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#212529',
  },
  botonOjo: {
    padding: 6,
  },
  botonIngresar: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    backgroundColor: '#C62828',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
    shadowColor: '#C62828',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  textoBoton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  cajaCredenciales: {
    marginTop: 24,
    padding: 12,
    backgroundColor: '#FFF8E1',
    borderRadius: 8,
    width: '100%',
    borderLeftWidth: 4,
    borderLeftColor: '#FFA000',
  },
  tituloCredenciales: {
    fontSize: 12,
    fontWeight: '700',
    color: '#E65100',
    marginBottom: 4,
  },
  textoCredenciales: {
    fontSize: 12,
    color: '#5D4037',
  },
  negrita: {
    fontWeight: 'bold',
  },
});