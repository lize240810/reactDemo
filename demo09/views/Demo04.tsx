import React, { useRef, useState } from 'react';
import { WebView } from 'react-native-webview';
import { Button, StyleSheet, Text, View } from "react-native";

export default function Demo04() {

    const webViewRef = useRef<WebView>(null);

    const [msg, setMsg] = useState('');

    const handleWebViewMessage = () => {
        webViewRef.current?.injectJavaScript(`
              window.alert("adasd")
        `)
    };


    return <View style={{ marginTop: 30 }}>

        <View style={{ margin: 10 }}><Text style={{ textAlign: "center" }}>Demo04----{msg}</Text></View>

        <View style={{ height: '90%', width: '100%' }}>
            <WebView style={styles.container} originWhitelist={['*']} source={{ uri: 'http://172.16.12.91:5173/' }}
                     allowFileAccess mediaPlaybackRequiresUserAction={false}
                     ref={webViewRef}
                     onMessage={event => {
                         setMsg(event.nativeEvent.data)
                     }}
                     injectedJavaScript={`function push(){window.ReactNativeWebView.postMessage("测试一下")}`}
            />
        </View>
        <Button onPress={handleWebViewMessage} title="按钮" />
    </View>
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});

