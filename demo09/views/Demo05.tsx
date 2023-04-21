import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera, BarCodeScanningResult, CameraType, BarCodeSettings } from 'expo-camera';

export default function demo05() {
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const cameraRef = useRef<Camera>(null);
    const [type, setType] = useState(CameraType.back);
    const [imgUrl, setImgurl] = useState<string>();
    const [qrTxt, setQrTxt] = useState<string>('测试');

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleCameraType = () => {
        setType(type === CameraType.back ? CameraType.front : CameraType.back);
    };

    const handleTakePicture = async () => {
        if (cameraRef.current) {
            const { uri } = await cameraRef.current.takePictureAsync();
            setImgurl(uri);
        }
    };

    const handleBarCodeScanned = ({ type, data }: BarCodeScanningResult) => {
        setQrTxt(data)
    };

    if (hasPermission === null) {
        return <View/>;
    }

    if (!hasPermission) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.imgbox}>
                <Image style={styles.img} source={{ uri: imgUrl }}></Image>
                <Text>{qrTxt}</Text>
            </View>
            <Camera style={styles.camera} type={type} ref={cameraRef}
                    onBarCodeScanned={handleBarCodeScanned}
            ></Camera>

            <View style={styles.buttonContainer}>

                <TouchableOpacity style={styles.button} onPress={handleTakePicture}>
                    <Text>Snap</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleCameraType}>
                    <Text>Flip</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#c1c1c1',
        alignItems: 'center',
        justifyContent: 'center'
    },
    camera: {
        height: '40%',
        width: '80%',
    },
    buttonContainer: {
        height: 100,
        width: '100%',
        flexDirection: 'row',
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 20,
        padding: 20
    },
    button: {
        width: 100,
        height: '100%',
        backgroundColor: '#fff',
        borderRadius: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    img: {
        width: 100,
        height: 100
    },
    imgbox: {
        marginBottom: 20
    }
});
