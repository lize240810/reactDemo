import {StatusBar} from 'expo-status-bar';
import {Image, ImageSourcePropType, StyleSheet, View, Text} from 'react-native';
import React, {useState} from "react";

import ComImageViewer from './components/ImageViewer'
import Button from './components/Button';
import * as ImagePicker from 'expo-image-picker';
import CircleButton from './components/CircleButton';
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';


export default function App() {
    const [selectedImage, setSelectedImage] = useState<string | null | undefined>(null);
    const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType>();

    const [showAppOptions, setShowAppOptions] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);


    function onModalClose() {
        setIsModalVisible(false)
    }


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

    return (
        <View style={styles.container}>
            <View>
                <ComImageViewer image={selectedImage} pickedEmoji={pickedEmoji}/>
            </View>

            {
                showAppOptions ? <View>
                    <View style={styles.optionsRow}>
                        <Button icon="refresh" label="Result" onPress={pickImageAsync}/>
                        <CircleButton onPress={() => setIsModalVisible(true)}/>
                        <Button icon="save-alt" label="Save" onPress={() => setShowAppOptions(false)}/>
                    </View>
                </View> : null
            }

            <StatusBar style="auto"/>

            <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
                <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose}/>
            </EmojiPicker>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionsRow: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 30
    }
});
