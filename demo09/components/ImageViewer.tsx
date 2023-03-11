import {Image, ImageSourcePropType, StyleSheet, View} from 'react-native'
import React from "react";

const PlaceholderImage = require('../assets/BingWallpaper.jpg');

export interface ImagePropType {
    image?: string | null | undefined,
    pickedEmoji?: ImageSourcePropType
}

export default ({image, pickedEmoji}: ImagePropType) => {
    const imageSource = image ? image : PlaceholderImage;
    return <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image}/>
        {pickedEmoji ?
            <Image source={pickedEmoji} resizeMode="contain"
                   style={{...styles.imageEmoji, width: 40, height: 40}}/> : null}
    </View>
}


const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 440,
        borderRadius: 18,
    },
    imageContainer: {
        position: "relative"
    },
    imageEmoji: {
        position: "absolute",
        margin: 40,
    }
})
