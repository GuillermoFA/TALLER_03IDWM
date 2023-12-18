import React, { useState } from 'react';
import { Button, Snackbar, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';


/**
 * Estilos para el componente.
 * @param {StyleSheet} styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
    alignItems: 'center',
    gap: 10,
  },
  form: {
    width: '100%',
  },
  button: {
    width: '100%',
    margin: 20,
  },
});

/**
 * const RegisterScreen contiene la lógica del register
 * @returns {LoginScreen}
 */
const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Función para manejar el cambio de texto en el campo de correo electrónico
   * @param text 
   */
  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  /**
   * Función para manejar el cambio de texto en el campo de contraseña
   * @param text 
   */
  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  /**
   * Función para manejar el cambio de texto en el campo de contraseña
   * @param text 
   */
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  /**
   * Función para limpiar los errores
   */
  const clearError = () => {
    setError('');
  };

  /**
   * Función para mostrar errores
   * @param message 
   */
  const displayError = (message: string) => {
    setError(message);
  };

  /**
   * Función para manejar el éxito del inicio de sesión
   */
  const handleLoginSuccess = () => {
    router.push('/home/');
  };

  /**
   * Función para manejar errores de axios
   * @param error 
   */
  const handleAxiosError = (error: any) => {
    if (error.response) {
      if (error.response.status === 400) {
        displayError('Faltan campos por rellenar. Por favor, completa todos los campos.');
      } else if (error.response.status === 401) {
        displayError('Credenciales inválidas. Verifica tu correo y contraseña.');
      } else {
        displayError(`Error: ${error.response.data}`);
      }
    } else if (error.message === 'Network Error') {
      displayError('Error de red. Verifica tu conexión.');
    } else {
      displayError('Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  /**
   * Función para manejar el submit del formulario
   */
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://192.168.1.183:5245/Auth/login', { // LLAMANDO A LA API
        email,
        password,
      });

      console.log(response.data);

      if (response.data && response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);

        if (response.status === 200) {
          handleLoginSuccess();
        } else {
          displayError('Error al iniciar sesión. Verifica tus credenciales.');
        }
      } else {
        displayError('Credenciales inválidas. Verifica tu correo y contraseña.');
      }
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        handleAxiosError(error);
      } else {
        displayError('Ocurrió un error inesperado. Por favor, intenta nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text variant="displayMedium">Iniciar Sesión</Text>
      <TextInput
        style={styles.form}
        label="Correo Electrónico"
        placeholder="correo@ucn.cl"
        placeholderTextColor="#B2B2B2"
        autoComplete="email"
        mode="outlined"
        value={email}
        onChangeText={handleEmailChange}
        disabled={loading}
      />
      <TextInput
        style={styles.button}
        label="Contraseña"
        secureTextEntry={showPassword}
        placeholder={showPassword ? '********' : 'Tu contraseña'}
        placeholderTextColor="#B2B2B2"
        autoComplete="password"
        mode="outlined"
        value={password}
        onChangeText={handlePasswordChange}
        right={<TextInput.Icon icon={showPassword ? 'eye-off' : 'eye'} onPress={handleShowPassword} />}
        disabled={loading}
      />
      <Button style={styles.button} mode="contained" onPress={handleSubmit}>
        Ingresar
      </Button>

      {/* Agrega el componente Snackbar para mostrar mensajes de error */}
      <Snackbar
        visible={error !== ''}
        onDismiss={clearError}
        action={{
          label: 'OK',
          onPress: clearError,
        }}
        style={{
          backgroundColor: 'red', // Color de fondo rojo sólido
          borderRadius: 8, // Bordes redondeados
          marginBottom: 20, // Espaciado inferior
        }}
      >
        {error}
      </Snackbar>
    </SafeAreaView>
  );
};

export default LoginScreen;