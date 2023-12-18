import React, { useState } from 'react';
import { Text, TextInput, Button, Snackbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

/**
 * Estilos para el componente.
 * @param {StyleSheet} styles
 * 
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
  errorText: {
    color: 'red',
  },
});

/**
 * const RegisterScreen contiene la lógica del register
 * @returns {RegisterScreen}
 */
const RegisterScreen = () => {

  /**
   * useState para el manejo de los campos del formulario
   * @param {useState} useState
   */
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rut, setRut] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [errorsAxios, setErrorsAxios] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    rut: '',
    birthYear: '',
  });
  const [loading, setLoading] = useState(false);

  /**
   * Función para limpiar los errores
   */
  const clearError = () => {
    setErrors({
      name: '',
      email: '',
      rut: '',
      birthYear: '',
    });
  };

  /**
   * Función para cambiar el valor de un campo y limpiar errores
   * @param {any} field
   * @param {any} value
   */
  const handleFieldChange = (field : any, value : any) => {
    // Función genérica para cambiar el valor de un campo y limpiar errores
    switch (field) {
      case 'fullName':
        setName(value);
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

  /**
   * Función para manejar el registro exitoso
   */
  const handleRegisterSuccess = () => {
    router.push('/auth/login');
  };

  /**
   * Función para mostrar errores
   * @param {any} message
   */
  const displayError = (message : any) => {
    setErrorsAxios(message);
  };

  /**
   * Función para manejar errores de axios
   * @param {any} error
   */
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

  /**
   * Función para manejar el submit del formulario
   */
  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Validaciones de campos vacíos
      if (!name || !email || !rut || !birthYear) {
        setErrors({
          name: name ? '' : 'Nombre es requerido.',
          email: email ? '' : 'Correo Electrónico es requerido.',
          rut: rut ? '' : 'RUT es requerido.',
          birthYear: birthYear ? '' : 'Año de Nacimiento es requerido.',
        });
        return;
      }

      // Validaciones de formato SOLICITUD DE API
      const response = await axios.post('http://192.168.1.183:5245/Auth/register', {
        email,
        rut,
        birthYear,
        name,
      });

      console.log('Respuesta de la API:', response.data);

      if (response.data) {
        // Registro exitoso
        await AsyncStorage.setItem('token', response.data.token);
        handleRegisterSuccess();
      } else {
        // Error en el registro, actualiza los mensajes de error según la respuesta del backend
        if (response.data.errors) {
          setErrors(response.data.errors);
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
        value={name}
        onChangeText={(text) => handleFieldChange('fullName', text)}
        mode="outlined"
      />
      <Text style={styles.errorText}>{errors.name}</Text>

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
        visible={!!(errors.name || errors.email || errors.rut || errors.birthYear)}
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