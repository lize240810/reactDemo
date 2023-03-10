import { Image, ImageURISource, StyleSheet, View } from 'react-native'

const PlaceholderImage = require('../assets/BingWallpaper.jpg');

export interface ImagePropType {
    image: string | ImageURISource['uri']
}

export default ({ image }: ImagePropType) => {
    const imageSource = image ? image : PlaceholderImage;
    return <View>
        <Image source={imageSource} style={styles.image}/>
    </View>
}


const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 440,
        borderRadius: 18,
    }
})
