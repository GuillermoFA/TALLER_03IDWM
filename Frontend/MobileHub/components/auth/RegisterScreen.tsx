import React, { useState } from 'react';
import { Text, TextInput, Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

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

const RegisterScreen = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [rut, setRut] = useState("");
  const [yearOfBirth, setYearOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleFullNameChange = (name: string) => {
    setFullName(name);
  };

  const handleEmailChange = (email: string) => {
    setEmail(email);
  };

  const handleRutChange = (rut: string) => {
    setRut(rut);
  };

  const handleYearOfBirthChange = (year : string) => {
    setYearOfBirth(year);
  };

  const handlePasswordChange = (password : string) => {
    setPassword(password);
  };
  const handleShowPassword = () => {
    console.log("Show password");
    setShowPassword(!showPassword);

};
  

  const handleSubmit = () => {
    console.log('Submit');
    // Realizar lógica de registro aquí
  };

  return (
    <SafeAreaView style={style.container}>
      <Text variant="displayMedium">Registrarse</Text>
      <TextInput style={style.form}
        label="Nombre Completo"
        placeholderTextColor={"#B2B2B2"}
        placeholder="Guillermo Josué Fuentes Ávila"
        value={fullName}
        onChangeText={handleFullNameChange}
        mode="outlined"
      />
      <TextInput style={style.form}
        label="Correo Electrónico"
        placeholder="correo@ucn.cl"
        value={email}
        onChangeText={handleEmailChange}
        placeholderTextColor={"#B2B2B2"}
        mode="outlined"
      />
      <TextInput style={style.form}
        label="RUT"
        placeholder="12.345.678-9"
        placeholderTextColor={"#B2B2B2"}
        value={rut}
        onChangeText={handleRutChange}
        mode="outlined"
      />
      <TextInput style={style.form}
        label="Año de Nacimiento"
        placeholder="1990"
        placeholderTextColor={"#B2B2B2"}
        value={yearOfBirth}
        onChangeText={handleYearOfBirthChange}
        mode="outlined"
      />
      <TextInput style={style.button}
                    label="Contraseña"
                    secureTextEntry={showPassword}
                    placeholder={showPassword ? "********" : "Tu contraseña"}
                    placeholderTextColor={"#B2B2B2"}
                    autoComplete="password"
                    mode="outlined"
                    value={password}
                    onChangeText={handlePasswordChange}
                    right={
                        <TextInput.Icon icon={showPassword ? "eye-off" : "eye"} onPress={handleShowPassword} />
                    }></TextInput>
      <Link href="/auth/login" asChild replace>
        <Button style={style.button} mode="contained" onPress={handleSubmit}>
          Registrarse
        </Button>
      </Link>
    </SafeAreaView>
  );
};

export default RegisterScreen;