import { ActivityIndicator, Button, Card, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { Repository } from "../../models/Repository";
import { useEffect, useState } from "react";
import axios from 'axios';
import { ScrollView } from "react-native-gesture-handler";

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
    card:{
        width: "100%",
        backgroundColor: "#F5F5F5",
        marginBottom:20,
    },
    ScrollView:{
        flex:1,
        gap:20,
        width: "100%",
        margin: 0,
        padding: 0,
    },
    loadingBox:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',

    }

});

const HomeScreen = () => {

    const [repos, setRepos] = useState<Repository[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const url = "http://192.168.1.183:5245/Repositories"

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

    if(isLoading){
        return (
        <SafeAreaView style={style.loadingBox}>
            <Text variant={"displaySmall"}> Cargando Repositorios... </Text>
            <ActivityIndicator animating={true} size={"large"} />
        </SafeAreaView>)
    }


    return (
        <SafeAreaView style={style.container}>
             <Text variant={"displayMedium"}> Mis repositorios </Text>
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
                        onPress={() => console.log("Presionado")}
                        mode={"contained"}>
                            Ver más
                        </Button>
                    </Card.Actions>
                </Card>
            ))} 
            </ScrollView>
        </SafeAreaView>
    )

};

export default HomeScreen;