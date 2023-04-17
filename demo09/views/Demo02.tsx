import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function Demo02() {
    const insets = useSafeAreaInsets();
    console.log(insets)

    return <View style={[styles.container, { marginTop: insets.top, marginBottom: insets.bottom }]}>
        <View>
            <Text>安全区域</Text>
            <Text>
                安装依赖库
            </Text>
            <View>
                <Text>
                    npx expo install react-native-safe-area-context
                </Text>
            </View>
            <View>
                <Text>
                    跟组件使用 SafeAreaProvider 包裹
                </Text>
            </View>
            <View>
                <Text>
                    使用Hook useSafeAreaInsets
                </Text>
            </View>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        padding: 10
    }
})
