import React, { Component } from 'react';
import {View, StyleSheet, TouchableOpacity, ToastAndroid, Image} from 'react-native';
import {Container, Header, Content, Body, Button, Text, Icon, Left, Right} from "native-base";

export default class MainTab extends Component {
    constructor(props) {
        super();
        this.camera = null;
        this.state = {};
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
            </View>
        );
    }
}
