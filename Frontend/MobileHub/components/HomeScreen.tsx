import { Button, Text} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Image } from "react-native";
import { Link } from "expo-router";



const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        gap: 20,
        justifyContent: 'center',
    },
    button: {
        width: "100%"
    },
    image: {
        width: 300,
        height: 300,
    }
});

const HomeScreen = () => {
    return (
        <SafeAreaView style={style.container}>
            <Image source={require('../assets/images/MobileHub.png')} style={style.image}/>
            <Link href="/auth/login" asChild>
            <Button mode="contained" onPress={() => console.log('Login Pressed')} style={style.button}>
                Iniciar Sesión
            </Button>
            </Link>
            <Link href="/auth/register" asChild replace>
            <Button mode="outlined" onPress={() => console.log('Register Pressed')} style={style.button}>
                Regístrarme
            </Button>
            </Link>
            
            
        </SafeAreaView>
    )

}

export default HomeScreen;