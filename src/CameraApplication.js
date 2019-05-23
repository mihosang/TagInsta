import React, { Component } from 'react';
import {View, StatusBar, TouchableOpacity, Image, Alert, NativeModules, ToastAndroid, CameraRoll} from 'react-native';
import {RNCamera} from 'react-native-camera';
import styles from './styles';

import PhotoCaptureIcon from '../assets/ic_photo_camera_36pt.png';
import GalleryIcon from '../assets/ic_camera_roll_36pt.png';

var ImagePicker = NativeModules.ImageCropPicker;

export default class CameraApplication extends Component {
    constructor(props) {
        super();
        this.camera = null;
    }

    takePicture = async function() {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);
            console.log(data.uri);
            ToastAndroid.show(data.uri, ToastAndroid.SHORT);
            CameraRoll.saveToCameraRoll(data.uri, 'photo');
        }
        else{
            ToastAndroid.show("Error Camera object is null", ToastAndroid.SHORT);
        }
    };
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
    renderImage(image) {
        return <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={image} />
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar animated hidden />
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                />
                <View style={[styles.overlay, styles.bottomOverlay]}>
                    <TouchableOpacity style={styles.captureButton} onPress={() => this.pickSingle(false)}>
                        <Image source={GalleryIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.captureButton} onPress={this.takePicture.bind(this)}>
                        <Image source={PhotoCaptureIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
