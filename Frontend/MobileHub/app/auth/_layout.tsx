
import { Slot, router } from "expo-router";
import { Appbar } from "react-native-paper";
import { StyleSheet } from 'react-native';


const style = {
    appbar: {
        margin:0,
    },
};

const handleBackPress = () => {
    router.back();
    console.log('Volví atrás..');
};


const HomeLayout = () => {
    return (
        <>
        <Appbar.Header style={style.appbar}>
        <Appbar.BackAction onPress={handleBackPress} />
        </Appbar.Header>
        <Slot />
        </>

    );

};


export default HomeLayout;