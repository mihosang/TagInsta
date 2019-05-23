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
        const data = {
            token: navigation.getParam('token', 'NO-TOKEN'),
            user: navigation.getParam('user', {}),
            image: navigation.getParam('image', 'https://user-images.githubusercontent.com/3969643/51441420-b41f1c80-1d14-11e9-9f5d-af5cd3a6aaae.png')
            // tags: navigation.getParam('tags', 'NO-TAGS')
        };
        console.log(data);
        // ToastAndroid.show(JSON.stringify(data), ToastAndroid.SHORT);
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
