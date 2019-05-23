import React, { Component } from 'react';
import {View, Text, StyleSheet, ToastAndroid, Alert, NativeModules} from 'react-native';
import {Icon} from "native-base";

var ImagePicker = NativeModules.ImageCropPicker;

export default class GalleryTab extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name='ios-search' style={{ color: tintColor }} />
        )
    };
    constructor(props) {
        super();
        this.state = {};
    };
    componentDidMount() {
        const { navigation } = this.props;
        navigation.addListener('willFocus', () =>
            // this.setState({ focusedScreen: true });
            this.pickSingle(false)
        );
        navigation.addListener('willBlur', () =>
            this.setState({ focusedScreen: false })
        );
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
            // ToastAndroid.show('received image : '+ image.path, ToastAndroid.SHORT);
            // this.setState({
            //     image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
            //     images: null
            // });
            this.setState({image: image.path});
            console.log(this.state);
            // this.getSuggestTagList(['bts', 'couple']);
            this.props.navigation.navigate('WaitTab', {
                user: this.state.data.user,
                token: this.state.data.token,
                image: image.path
            });
        }).catch(e => {
            console.log(e);
            // Alert.alert(e.message ? e.message : e);
            this.props.navigation.goBack();
        });
    }

    render() {
        const { navigation } = this.props;
        const data = {
            token: navigation.getParam('token', 'NO-TOKEN'),
            user: navigation.getParam('user', {})
        };
        this.state.data = data;
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
