import React from "react";
import { View, Text, Button, TextInput, Image, StyleSheet } from "react-native";

import icon from "../assets/icon.png"

export default function Demo03(){
    return <View style={{ flex: 1, padding: 40, marginTop: 40 }}>
        <View style={{ marginBottom: 10 }}>
            <Text>Hello World</Text>
        </View>
        <View style={styles.viewRow}>
            <Text>输入框：</Text><TextInput style={[{ flex: 1 }, styles.border]}/>
        </View>

        <View style={styles.viewRow}>
            <Text>按钮：</Text><Button title="点击" onPress={() => alert("点击了按钮")}/>
        </View>

        <View style={styles.viewRow}>
            <Text>图像</Text>
            <Image source={icon} style={styles.img}/>
        </View>
    </View>
}

const styles = StyleSheet.create({
    viewRow: {
        flexDirection: "row", marginBottom: 10
    },
    img: {
        width: 100, height: 100
    },
    border: {
        borderWidth: 1
    }
})