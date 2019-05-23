import React, { Component } from 'react';
import {View, StatusBar, TouchableOpacity, Image, Alert, NativeModules, ToastAndroid, CameraRoll} from 'react-native';
import {RNCamera} from 'react-native-camera';
import styles from '../../styles';
import { Icon } from 'native-base';



export default class CameraTab extends Component {

    constructor(props) {
        super();
        this.camera = null;
        this.state = {};
    }

    componentDidMount() {
        const { navigation } = this.props;
        navigation.addListener('willFocus', () =>
            this.setState({ focusedScreen: true })
        );
        navigation.addListener('willBlur', () =>
            this.setState({ focusedScreen: false })
        );
    }

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name='ios-camera' style={{ color: tintColor }} />
        )
    };

    takePicture = async function() {
        if (!this.camera) {
            return ToastAndroid.show("Error Camera object is null", ToastAndroid.SHORT);
        } else {
            const options = {quality: 0.5, base64: true};
            const data = await this.camera.takePictureAsync(options);
            console.log(data.uri);

            ToastAndroid.show(data.uri, ToastAndroid.SHORT);
            CameraRoll.saveToCameraRoll(data.uri, 'photo')
                .then((result) => {
                    this.setState({image: data.uri});
                });
        }
    };

    cameraView() {
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
                    <TouchableOpacity style={styles.captureButton} onPress={this.takePicture.bind(this)}>
                        <Icon name='ios-camera'/>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }

    render() {
        const { hasCameraPermission, focusedScreen } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else if (focusedScreen){
            return (this.cameraView());
        } else {
            return <View />;
        }
    }


}
