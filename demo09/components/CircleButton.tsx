import {GestureResponderEvent, Pressable, StyleSheet, View} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from "react";


export interface PropType {
    onPress?: (e: GestureResponderEvent) => void;
}


export default function CircleButton({onPress}: PropType) {
    return (
        <View style={styles.circleButtonContainer}>
            <Pressable style={styles.circleButton} onPress={onPress}>
                <MaterialIcons name="add" size={38} color="#fff"/>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    circleButtonContainer: {
        width: 84,
        height: 84,
        marginHorizontal: 40,
        borderWidth: 4,
        borderColor: 'rgba(255,145,27,0.75)',
        borderRadius: 42,
        padding: 3,
    },
    circleButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 42,
        backgroundColor: '#303030',
    },
});
