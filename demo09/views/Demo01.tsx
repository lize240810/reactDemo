import { ImageSourcePropType, StyleSheet, View } from 'react-native';
import React, { useState } from "react";

import ComImageViewer from '../components/ImageViewer'
import Button from '../components/Button';
import * as ImagePicker from 'expo-image-picker';


export default function Demo01() {
    const [selectedImage, setSelectedImage] = useState<ImageSourcePropType | null | undefined>();
    const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | null | undefined>();

    const [showAppOptions, setShowAppOptions] = useState(false);
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
            setSelectedImage(result.assets[0])
        } else {
            alert('You did not select any image.');
        }
    }

    return <View style={styles.container}>
        <View>
            <ComImageViewer image={selectedImage} pickedEmoji={pickedEmoji}/>
        </View>


        {
            !showAppOptions ?
                <View style={styles.footerContainer}>
                    <Button label="Choose a photo" icon="picture-o" theme onPress={pickImageAsync}/>
                    <Button label="Use this photo" onPress={() => setShowAppOptions(true)}/>
                </View> :
                <View>
                    <View style={styles.optionsRow}>
                        <Button icon="Refresh" label="Result" style={styles.optionsButton} onPress={() => setShowAppOptions(false)}/>
                        {/*<CircleButton onPress={() => setIsModalVisible(true)}/>*/}
                        <Button label="Save" style={styles.optionsButton} onPress={() => setShowAppOptions(false)}/>
                    </View>
                </View>
        }


        {/*<EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>*/}
        {/*    <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose}/>*/}
        {/*</EmojiPicker>*/}
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionsRow: {
        backgroundColor: "red",
        marginTop: 30,
    },
    optionsButton: {
        width: '30%',
        flexDirection: "column",
    },
    footerContainer: {
        flex: 1 / 3,
        alignItems: "center"
    }
});

