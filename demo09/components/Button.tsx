import React from "react";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import {Pressable, StyleSheet, Text, View, GestureResponderEvent} from "react-native";

export interface ButtonPropType {
    label?: string
    onPress?: (e: GestureResponderEvent) => void;
    icon?: any;
}

export default ({label, onPress, icon}: ButtonPropType) => {
    return <>
        <Pressable style={styles.button} onPress={onPress}>
            {icon ? <MaterialIcons name={icon} size={24} color="#000"/> : null}
            <Text style={styles.buttonLabel}>{label}</Text>
        </Pressable>
    </>
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonLabel: {
        color: '#000',
        fontSize: 16,
    }
})
