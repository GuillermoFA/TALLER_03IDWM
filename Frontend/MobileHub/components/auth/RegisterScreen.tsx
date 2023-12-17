import React, { useState } from 'react';
import { Text, TextInput, Button, Snackbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

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
  errorText: {
    color: 'red',
  },
});

const RegisterScreen = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [rut, setRut] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [errorsAxios, setErrorsAxios] = useState('');
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    rut: '',
    birthYear: '',
  });
  const [loading, setLoading] = useState(false);

  const clearError = () => {
    setErrors({
      fullName: '',
      email: '',
      rut: '',
      birthYear: '',
    });
  };

  const handleFieldChange = (field : any, value : any) => {
    // Función genérica para cambiar el valor de un campo y limpiar errores
    switch (field) {
      case 'fullName':
        setFullName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'rut':
        setRut(value);
        break;
      case 'birthYear':
        setBirthYear(value);
        break;
      default:
        break;
    }
    clearError();
  };

  const handleRegisterSuccess = () => {
    router.push('/auth/login');
  };

  const displayError = (message : any) => {
    setErrorsAxios(message);
  };

  const handleAxiosError = (error: any) => {
    if (error.response) {
      if (error.response.status === 400) {
        if (error.response.data && error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          displayError('Error en el registro. Por favor, verifica tus datos.');
        }
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

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Validaciones de campos vacíos
      if (!fullName || !email || !rut || !birthYear) {
        setErrors({
          fullName: fullName ? '' : 'Nombre es requerido.',
          email: email ? '' : 'Correo Electrónico es requerido.',
          rut: rut ? '' : 'RUT es requerido.',
          birthYear: birthYear ? '' : 'Año de Nacimiento es requerido.',
        });
        return;
      }

      const response = await axios.post('http://192.168.1.183:5245/Auth/register', {
        email,
        rut,
        birthYear,
        fullName,
      });

      console.log('Respuesta de la API:', response.data);

      if (response.data && response.data.success) {
        // Registro exitoso
        await AsyncStorage.setItem('token', response.data.token);
        handleRegisterSuccess();
      } else {
        // Error en el registro, actualiza los mensajes de error según la respuesta del backend
        if (response.data.errors) {
          setErrors(response.data.errors);
        } else {
          console.error('Error en el registro:', response.data);
          // Establece un mensaje de error genérico si es necesario
          displayError('Ocurrió un error inesperado. Por favor, intenta nuevamente.');
        }
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
      <Text variant="displayMedium">Registrarse</Text>
      <TextInput
        style={styles.form}
        label="Nombre Completo"
        placeholder="Guillermo Josué Fuentes Ávila"
        placeholderTextColor="#B2B2B2"
        value={fullName}
        onChangeText={(text) => handleFieldChange('fullName', text)}
        mode="outlined"
      />
      <Text style={styles.errorText}>{errors.fullName}</Text>

      <TextInput
        style={styles.form}
        label="Correo Electrónico"
        placeholder="correo@ucn.cl"
        placeholderTextColor="#B2B2B2"
        value={email}
        onChangeText={(text) => handleFieldChange('email', text)}
        mode="outlined"
      />
      <Text style={styles.errorText}>{errors.email}</Text>

      <TextInput
        style={styles.form}
        label="RUT"
        placeholder="12.345.678-9"
        placeholderTextColor="#B2B2B2"
        value={rut}
        onChangeText={(text) => handleFieldChange('rut', text)}
        mode="outlined"
      />
      <Text style={styles.errorText}>{errors.rut}</Text>

      <TextInput
        style={styles.form}
        label="Año de Nacimiento"
        placeholder="1990"
        placeholderTextColor="#B2B2B2"
        value={birthYear}
        onChangeText={(text) => handleFieldChange('birthYear', text)}
        mode="outlined"
      />
      <Text style={styles.errorText}>{errors.birthYear}</Text>

      <Button style={styles.button} mode="contained" onPress={handleSubmit}>
        Registrarse
      </Button>

      <Snackbar
        visible={!!(errors.fullName || errors.email || errors.rut || errors.birthYear)}
        onDismiss={clearError}
        action={{
          label: 'OK',
          onPress: clearError,
        }}
        style={{
          backgroundColor: 'red',
          borderRadius: 8,
          marginBottom: 20,
        }}
      >
        Por favor, revisa los campos e inténtalo de nuevo.
      </Snackbar>
    </SafeAreaView>
  );
};

export default RegisterScreen;