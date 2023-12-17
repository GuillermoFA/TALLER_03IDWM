import { useEffect, useState } from 'react';
import { Commit } from '../../models/Commit';
import axios from 'axios';
import { ActivityIndicator, Button, Card, Text, Appbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
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



interface Props {
    repositoryName: string;
}


const RepositoryScreen = ({ repositoryName }: Props) => {
    console.log("repositoryName:", repositoryName);
    const [commits, setCommits] = useState<Commit[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const url = `http://192.168.1.183:5245/Repositories/${repositoryName}`;


    useEffect(() => {
        setIsLoading(true);
        axios.get(url).then((response : any) => {
            console.log(response.data);
            setCommits(response.data);
        })
        .catch((error : any) => {
            console.log(error);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return (
            <SafeAreaView style={style.loadingBox}>
                <Text variant={"displaySmall"}> Cargando Commits... </Text>
                <ActivityIndicator animating={true} size={"large"} />
            </SafeAreaView>
        );
    }

    const handleBackPress = () => {
        router.back();
        console.log('Volví atrás..');
    };

    return (
        <>
         <SafeAreaView style={style.container}>
         <Appbar.Header style={style.appbar}>
        <Appbar.BackAction onPress={handleBackPress} />
        </Appbar.Header>
            <Text variant={"displaySmall"}>{repositoryName}</Text>
            <ScrollView style={style.ScrollView}> 
                {commits.map((c) => (
                    <Card style={style.card} key={c.date}>
                        <Card.Title title={c.message} titleVariant={"headlineSmall"}/>
                        <Card.Content>
                            <Text variant={"bodyMedium"}> Commit creado el: {c.date.split("T")[0]}
                            </Text>
                            <Text variant={"bodyMedium"}> Autor: {c.author}
                            </Text>
                        </Card.Content>
                    </Card>
                ))}
            </ScrollView>
        </SafeAreaView>
        </>
       
    )
}


export default RepositoryScreen;