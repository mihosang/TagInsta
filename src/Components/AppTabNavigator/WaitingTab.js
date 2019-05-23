import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Container, Content, Icon} from "native-base";
import CardComponent from "../CardComponent";

export default class WaitingTab extends Component {

    static navigationOptions = {
        headerLeft: <Icon name="md-exit" style={{paddingLeft:10}} />,
        title: "Generated HashTags",
        headerRight: <Icon name="logo-instagram"  style={{paddingRight:10}} />
    };

    constructor(props) {
        super(props);
        this.state = {
            tag_list: [],
            caption: [],
            getTag: false
        };
    }

    getSuggestTagList() {
        const url = "http://2a01e6a6.ngrok.io/tag2";
        let post_data = {
            method: 'POST',
            body: JSON.stringify({
                // 'filename': 'image.jpg'
                'filename': 'test2.jpeg'
            }),
            headers: {
                'Accept':       'application/json',
                'Content-Type': 'application/json'
            }
        };
        fetch(url, post_data)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.state.tag_list = responseJson['tags'];
                this.state.caption = responseJson['caption'];
                this.state.getTag = true;
                // this.render();
                console.log(this.state);
                this.props.navigation.navigate('Post', {
                    user: this.state.data.user,
                    token: this.state.data.token,
                    image: this.state.data.image,
                    tags: this.state.tag_list,
                    caption: this.state.caption
                });
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

    componentWillMount() {
        const { navigation } = this.props;
        const data = {
            token: navigation.getParam('token', 'NO-TOKEN'),
            user: navigation.getParam('user', {}),
            image: navigation.getParam('image', 'https://user-images.githubusercontent.com/3969643/51441420-b41f1c80-1d14-11e9-9f5d-af5cd3a6aaae.png'),
            tags: this.state.tag_list,
            caption: this.state.caption
        };
        this.state.data = data;
        console.log(this.state);

        this.getTagList();
    }

    render() {
        const data = this.state.data;
        return (
            <View style={styles.container}>
                <Text>
                    Searching for hastags ...
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
