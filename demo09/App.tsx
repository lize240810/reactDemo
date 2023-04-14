import React from "react";
import { StyleSheet, View } from "react-native";
import Demo01 from "./views/Demo01"
import { StatusBar } from "expo-status-bar";

export default function App() {

    return <View style={styles.container}>
        <Demo01/>
    </View>
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
