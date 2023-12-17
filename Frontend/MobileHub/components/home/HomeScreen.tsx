import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, Card, Text, Appbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import { Repository } from "../../models/Repository";
import axios from 'axios';
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, router } from "expo-router";


const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        gap: 20,
    },
    button: {
        width: "100%"
    },
    card: {
        width: "100%",
        backgroundColor: "#F5F5F5",
        marginBottom: 20,
    },
    ScrollView: {
        flex: 1,
        gap: 20,
        width: "100%",
        margin: 0,
        padding: 0,
    },
    loadingBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    appbar: {
        position: 'absolute',
        right: 0,
        left: 0,
        top: 0,
    },
});

const HomeScreen = () => {
    const [repos, setRepos] = useState<Repository[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const url = "http://192.168.1.183:5245/Repositories";

    useEffect(() => {
        setIsLoading(true);
        axios.get(url).then((response) => {
            console.log(response.data);
            setRepos(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, []);

    const handleLogout = async () => {
        // Borrar el token del usuario al cerrar sesión
        await AsyncStorage.removeItem('token');
    };

    if (isLoading) {
        return (
            <SafeAreaView style={style.loadingBox}>
                <Text variant={"displaySmall"}> Cargando Repositorios... </Text>
                <ActivityIndicator animating={true} size={"large"} />
            </SafeAreaView>
        );
    }

    const handleButtonPress = (repositoryName: string) => {
        console.log("Repository Name:", repositoryName);
        router.push({
            pathname: "/home/repository",
            params: { repositoryName },
        });
    };

    return (
        <SafeAreaView style={style.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text variant={"displaySmall"}> Mis repositorios </Text>
                <Link href="/" asChild>
                    <Button mode="outlined" icon="logout" onPress={handleLogout}> Salir</Button>
                </Link>
            </View>
            <ScrollView style={style.ScrollView}>
            {repos.map((repo)=> (
                <Card style ={style.card} key={repo.name}>
                    <Card.Title
                        title={repo.name}
                        titleVariant={"headlineSmall"}
                    />
                    <Card.Content>
                        <Text variant = {"bodyMedium"}>Repositorio creado el: {repo.createdAt.split("T")[0]}</Text>
                        <Text variant = {"bodyMedium"}>Última actualización: {repo.updatedAt.split("T")[0]}</Text>
                        <Text variant = {"bodyMedium"}>Commits realizados: {repo.commitsAmount} </Text>
                    </Card.Content>
                    <Card.Actions>
                    <Button
                    onPress={() => handleButtonPress(repo.name)}
                    mode={"contained"}>
                    Ver más
                </Button>
                    </Card.Actions>
                </Card>
            ))} 
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
