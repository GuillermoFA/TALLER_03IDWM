import { Button, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Image } from "react-native";
import { useState } from "react";

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 0,
        alignItems: 'center',
        gap: 10,
    },
    form: {
        width: "100%",
    },
    button: {
        width: "100%",
        margin: 20,
    },
    image: {
        width: 300,
        height: 300,
    }
});

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleEmailChange = (email: string) => {
        setEmail(email);
    };

    const handlePasswordChange = (password: string) => {
        setPassword(password);
    };

    const handleShowPassword = () => {
        console.log("Show password");
        setShowPassword(!showPassword);

    };

    const handleSubmit = () => {
        console.log("Submit");
    };

   return(
    <SafeAreaView style={style.container}>
        <Text variant="displayMedium">Iniciar Sesión</Text>
        <TextInput style={style.form}
                    label="Correo Electrónico"
                    placeholder="correo@ucn.cl"
                    placeholderTextColor={"#B2B2B2"}
                    autoComplete="email"
                    mode="outlined"
                    value={email}
                    onChangeText={handleEmailChange}></TextInput>
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
        <Button style={style.button} mode="contained" onPress={handleSubmit}>
            Ingresar
        </Button>
    </SafeAreaView>

   )
};

export default LoginScreen;
