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

    getSuggestTagList(tag_list) {
        const url = "http://7f09c30c.ngrok.io/tag";
        let post_data = {
            method: 'POST',
            body: JSON.stringify({
                'tags': tag_list
            }),
            headers: {
                'Accept':       'application/json',
                'Content-Type': 'application/json'
            }
        };
        fetch(url, post_data)
            .then((response) => response.text())
            .then((responseText) => {
                ToastAndroid.show(responseText, ToastAndroid.SHORT);
                this.state.tags = responseText;
                // navigate to post tab
                this.props.navigation.navigate('Post', {
                    user: this.state.data.user,
                    token: this.state.data.token,
                    image: this.state.image,
                    tags: this.state.tags
                });
            })
            .catch((error) => {
                ToastAndroid.show(error.toString(), ToastAndroid.SHORT);
                console.log(error.toString());
            });
    }


    takePicture = async function() {
        if (!this.camera) {
            return ToastAndroid.show("Error Camera object is null", ToastAndroid.SHORT);
        } else {
            const options = {quality: 0.5, base64: false, fixOrientation: true};
            const data = await this.camera.takePictureAsync(options);
            console.log(data.uri);

            CameraRoll.saveToCameraRoll(data.uri, 'photo')
                .then((result) => {
                    this.setState({image: data.uri});
                    console.log(this.state);
                    // this.getSuggestTagList(['bts', 'couple']);
                    this.props.navigation.navigate('Post', {
                        user: this.state.data.user,
                        token: this.state.data.token,
                        image: data.uri
                    });
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
        const { navigation } = this.props;
        const data = {
            token: navigation.getParam('token', 'NO-TOKEN'),
            user: navigation.getParam('user', {})
        };
        this.state.data = data;
        ToastAndroid.show(JSON.stringify(this.state.data), ToastAndroid.SHORT);

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
