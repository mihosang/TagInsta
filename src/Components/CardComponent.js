import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ToastAndroid } from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base';


export default class CardComponent extends Component{

    render(){
        const data = this.props.data;
        const token = data.token;
        const userInfo = data.user;
        const jUserInfo = JSON.parse(userInfo);
        const image = data.image;
        // ToastAndroid.show( data.tags , ToastAndroid.SHORT);
        const profile_picture = jUserInfo.data.profile_picture;

        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={{uri: profile_picture}}/>
                        <Body>
                            <Text> {jUserInfo.data.username} </Text>
                            <Text note> {jUserInfo.data.bio}  </Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Image
                        source={{uri: image}}
                        style={{height: 400, width: null, flex: 1}}/>
                </CardItem>
                <CardItem style={{height: 45}}>
                    <Left>
                        <Button transparent>
                            <Icon name='ios-heart' style={{color: 'black'}}/>
                        </Button>
                        <Button transparent>
                            <Icon name='ios-chatbubbles' style={{color: 'black'}}/>
                        </Button>
                        <Button transparent>
                            <Icon name='ios-send' style={{color: 'black'}}/>
                        </Button>
                    </Left>
                </CardItem>
                <CardItem>
                    <Text>
                        <Text style={{fontWeight: '900'}}>Tag</Text>
                        이번에는 리액트 네이티브(React Native)로 인스타그램 UI을 구현하는 포스팅입니다. 다른 앱을 따라 만들어 보는 것은 굉장히 재미있습니다. 구글에서 인스타그램 클론 코딩 강의를 찾아보니, 다른 개발자들이 올린 동영상 강의를 몇 개 찾을 수 있었습니다.
                    </Text>
                </CardItem>
            </Card>
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
