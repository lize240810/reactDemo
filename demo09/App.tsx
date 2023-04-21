import React from "react";
import { View } from "react-native";
import Demo from "./views/Demo05"
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';



export default function App() {

    return <View style={{flex: 1}}>
        <Demo/>
        <StatusBar style="light" />
    </View>
}
