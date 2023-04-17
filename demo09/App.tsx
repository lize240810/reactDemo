import React from "react";
import { View } from "react-native";
import Demo from "./views/Demo01"
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';



export default function App() {

    return <SafeAreaProvider>
        <Demo/>
        <StatusBar style="light" />
    </SafeAreaProvider>
}
