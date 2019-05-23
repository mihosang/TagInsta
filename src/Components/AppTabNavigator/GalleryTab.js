import React, { Component } from 'react';
import {View, Text, StyleSheet, ToastAndroid, Alert, NativeModules} from 'react-native';
import {Icon} from "native-base";

var ImagePicker = NativeModules.ImageCropPicker;

export default class GalleryTab extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name='ios-search' style={{ color: tintColor }} />
        )
    }
    constructor(props) {
        super();
        // this.pickSingle(false);
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
            ToastAndroid.show('received image : '+ image.path, ToastAndroid.SHORT);
            this.setState({
                image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
                images: null
            });
        }).catch(e => {
            console.log(e);
            Alert.alert(e.message ? e.message : e);
        });
    }

    render() {
        return (
            <View style={style.container}>
                <Text>GalleryTab</Text>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
