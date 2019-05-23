import React, {Component} from 'react';
import {
    View, Text, StyleSheet, ScrollView, Alert,
    Image, TouchableOpacity, NativeModules, Dimensions
} from 'react-native';

import styles from './styles';

var ImagePicker = NativeModules.ImageCropPicker;

export default class GalleryApplication extends Component {
    constructor() {
        super();
        this.state = {
            image: null,
            images: null
        };
    }
    pickSingleWithCamera(cropping, mediaType='photo') {
        ImagePicker.openCamera({
            cropping: cropping,
            width: 500,
            height: 500,
            includeExif: true,
            mediaType,
        }).then(image => {
            console.log('received image', image);
            this.setState({
                image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
                images: null
            });
        }).catch(e => alert(e));
    }

    pickSingle(cropit, circular=false, mediaType) {
        ImagePicker.openPicker({
            width: 500,
            height: 500,
            cropping: cropit,
            cropperCircleOverlay: circular,
            compressImageMaxWidth: 1000,
            compressImageMaxHeight: 1000,
            compressImageQuality: 1,
            compressVideoPreset: 'MediumQuality',
            includeExif: true,
        }).then(image => {
            console.log('received image', image);
            this.setState({
                image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
                images: null
            });
        }).catch(e => {
            console.log(e);
            Alert.alert(e.message ? e.message : e);
        });
    }
    renderImage(image) {
        return <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={image} />
    }
    render() {
        return (<View style={styles.container}>
            <ScrollView>
                {this.state.image ? this.renderImage(this.state.image) : null}
                {this.state.images ? this.state.images.map(i => <View key={i.uri}>{this.renderImage(i)}</View>) : null}
            </ScrollView>
            <TouchableOpacity onPress={() => this.pickSingleWithCamera(false)} style={styles.button}>
                <Text style={styles.text}>Select Single Image With Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.pickSingle(false)} style={styles.button}>
                <Text style={styles.text}>Select Single</Text>
            </TouchableOpacity>
            </View>);
    }
}
