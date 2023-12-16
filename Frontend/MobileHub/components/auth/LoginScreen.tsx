import React from 'react';
import { Button, Snackbar, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const style = StyleSheet.create({
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

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (email: string) => {
    setEmail(email);
  };

  const handlePasswordChange = (password: string) => {
    setPassword(password);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onDismissError = () => {
    setError('');
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://192.168.1.183:5245/Auth/Login', {
        email,
        password,
      });
  
      console.log(response.data);
  
      if (response.data && response.data.token) {
        // Almacena el token de forma segura
        await AsyncStorage.setItem('token', response.data.token);
  
        // Verifica si el código de estado es 200 antes de navegar a la pantalla de inicio
        if (response.status === 200) {
          router.push('/home/');
        } else {
          setError('Error al iniciar sesión. Verifica tus credenciales.');
        }
      } else {
        setError('Credenciales inválidas. Verifica tu correo y contraseña.');
      }
    } catch (error: any) {
      console.error(error);
  
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(`Error: ${error.response.data}`);
        } else if (error.message === 'Network Error') {
          setError('Error de red. Verifica tu conexión.');
        } else {
          setError('Error al iniciar sesión. Verifica tus credenciales.');
        }
      } else {
        // Si el error no es de tipo Axios, manejarlo de manera genérica
        setError('Ocurrió un error inesperado. Por favor, intenta nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <Text variant="displayMedium">Iniciar Sesión</Text>
      <TextInput
        style={style.form}
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
        style={style.button}
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
      <Button style={style.button} mode="contained" onPress={handleSubmit}>
        Ingresar
      </Button>

      {/* Agrega el componente Snackbar para mostrar mensajes de error */}
      <Snackbar
        visible={error !== ''}
        onDismiss={onDismissError}
        action={{
          label: 'OK',
          onPress: onDismissError,
        }}
      >
        {error}
      </Snackbar>
    </SafeAreaView>
  );
};

export default LoginScreen;
