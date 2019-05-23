import React, { Component } from 'react';
import { View, Text, StyleSheet, ToastAndroid } from 'react-native';
import {Container, Content, Icon} from "native-base";

import CardComponent from '../CardComponent'; // 카드 컴포넌트 추가

export default class PostTab extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name='logo-instagram' style={{ color: tintColor }} />
        )
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { navigation } = this.props;
        const username = navigation.getParam('username', 'NO-ID');
        const date = navigation.getParam('date', 'NO-TOKEN');
        const token = navigation.getParam('token', 'NO-TOKEN');

        this.setState({'username',navigation.getParam('username', 'NO-ID')});
        this.setState('date',navigation.getParam('date', 'NO-TOKEN'));
        this.setState('token',navigation.getParam('token', 'NO-TOKEN'));
        ToastAndroid.show(this.state, ToastAndroid.SHORT);
        const data = {
            username: username,
            date: date
        };
        return (
            <Container style={style.container}>
                <Content>
                    <CardComponent data={data}/>
                </Content>
            </Container>
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
