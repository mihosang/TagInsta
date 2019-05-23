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
        this.state = {
            tag_list: []
        };
    }

    getSuggestTagList() {
        const url = "http://2a01e6a6.ngrok.io/tag2";
        let post_data = {
            method: 'POST',
            body: JSON.stringify({
                'filename': 'image.jpg'
            }),
            headers: {
                'Accept':       'application/json',
                'Content-Type': 'application/json'
            }
        };
        fetch(url, post_data)
            .then((response) => response.text())
            .then((responseText) => {
                console.log(responseText);
                this.setState({tag_list : ['a','b','c']});
            })
            .catch((error) => {
                console.log(error.toString());
            });
    }

    getTagList() {
        // this.setState({tag_list : ['a','b','c']});
        const file = {
            uri: this.state.data.image,             // e.g. 'file:///path/to/file/image123.jpg'
            name: 'image.jpg',            // e.g. 'image123.jpg',
            type: 'image/jpeg'             // e.g. 'image/jpg'
        };

        const formdata = new FormData();
        formdata.append('file', file);
        const url = 'http://2a01e6a6.ngrok.io/tag';
        fetch(url, {
            method: 'POST',
            body : formdata,
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            console.log(res);
            res.json();
        }).then((resText) => {
            console.log(resText);
            this.getSuggestTagList()
        }).catch((error) => {
            console.log(error.toString());
        });;
    }

    render() {
        const { navigation } = this.props;
        const data = {
            token: navigation.getParam('token', 'NO-TOKEN'),
            user: navigation.getParam('user', {}),
            image: navigation.getParam('image', 'https://user-images.githubusercontent.com/3969643/51441420-b41f1c80-1d14-11e9-9f5d-af5cd3a6aaae.png'),
            tags: this.state.tag_list
        };
        this.state.data = data;
        console.log(this.state);
        if (this.state.tag_list.length == 0){
            this.getTagList();
        }

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
