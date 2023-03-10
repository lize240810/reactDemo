import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import React, { useState } from "react";
import ComImageViewer from './components/ImageViewer'
import Button from './components/Button';
import * as ImagePicker from 'expo-image-picker';
import CircleButton from './components/CircleButton';


export default function App() {
    const [selectedImage, setSelectedImage] = useState<string>();
    const [showAppOptions, setShowAppOptions] = useState(true);


    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri)
        } else {
            alert('You did not select any image.');
        }
    }
    const onAddSticker = () => {
        // we will implement this later
    };

    return (
        <View style={styles.container}>
            <View>
                <ComImageViewer image={selectedImage}/>
            </View>

            {
                showAppOptions ? <>
                    <View>
                        <Button label="Choose a photo" onPress={pickImageAsync}/>
                        <CircleButton onPress={onAddSticker}/>
                        <Button label="Use this photo" onPress={() => setShowAppOptions(true)}/>
                    </View>
                </> : null
            }

            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
