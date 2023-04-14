import { StatusBar } from 'expo-status-bar';
import { ImageSourcePropType, StyleSheet, View } from 'react-native';
import React, { useState } from "react";

import ComImageViewer from '../components/ImageViewer'
import Button from '../components/Button';
import * as ImagePicker from 'expo-image-picker';
import CircleButton from '../components/CircleButton';
import EmojiPicker from '../components/EmojiPicker';
import EmojiList from '../components/EmojiList';


export default function Demo01() {
    const [selectedImage, setSelectedImage] = useState<ImageSourcePropType | null | undefined>();
    const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | null | undefined>();

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
            setSelectedImage(result.assets[0])
        } else {
            alert('You did not select any image.');
        }
    }

    return <>
        <View>
            <ComImageViewer image={selectedImage} pickedEmoji={pickedEmoji}/>
        </View>


        <View style={styles.footerContainer}>
            <Button label="Choose a photo" icon="picture-o" theme onPress={pickImageAsync}/>
            <Button label="Use this photo" />
        </View>

        {/*{*/}
        {/*    showAppOptions ? <View>*/}
        {/*        <View style={styles.optionsRow}>*/}
        {/*            <Button icon="refresh" label="Result" onPress={pickImageAsync}/>*/}
        {/*            <CircleButton onPress={() => setIsModalVisible(true)}/>*/}
        {/*            <Button icon="save-alt" label="Save" onPress={() => setShowAppOptions(false)}/>*/}
        {/*        </View>*/}
        {/*    </View> : null*/}
        {/*}*/}



        {/*<EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>*/}
        {/*    <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose}/>*/}
        {/*</EmojiPicker>*/}
    </>
}

const styles = StyleSheet.create({
    optionsRow: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 30
    },
    footerContainer: {
        flex: 1/3,
        alignItems: "center"
    }
});

