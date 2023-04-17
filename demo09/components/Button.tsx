import { GestureResponderEvent, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";

export interface ButtonPropType {
    label?: string
    onPress?: (e: GestureResponderEvent) => void;
    icon?: any;
    theme?: boolean;
    style?: StyleProp<ViewStyle>;
}

export default ({ label, onPress, icon, theme, style }: ButtonPropType) => {
    const primary = theme && styles.buttonBorder;

    return <View style={styles.buttonContainer}>
        <Pressable onPress={onPress} style={[styles.button, primary, style]}>
            {icon && <FontAwesome name={icon} size={18} color="#25292e" style={styles.buttonIcon}/>}
            <Text style={styles.buttonLabel}>{label}</Text>
        </Pressable>
    </View>
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 320,
        height: 68,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
        marginTop: 20
    },
    button: {
        borderRadius: 10,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        alignContent: "center",
        justifyContent: 'center',
        flexDirection: "row",
    },
    buttonIcon: {
        paddingRight: 8,
    },
    buttonLabel: {
        color: '#000',
        fontSize: 16,
    },
    buttonBorder: {
        backgroundColor: "#a4904a",
        borderWidth: 4, borderColor: "#ffd33d", borderRadius: 18,
    }
})
