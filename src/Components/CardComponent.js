import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ToastAndroid } from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base';


export default class CardComponent extends Component{

    render(){
        const data = this.props.data;
        console.log(data);
        const token = data.token;
        const userInfo = data.user;
        const jUserInfo = JSON.parse(userInfo);
        const image = data.image;
        const profile_picture = jUserInfo.data.profile_picture;
        const tags = data.tags;
        const caption = data.caption;
        return (
            <Card style={{marginLeft:0,marginRight:0, width:800}}>
                <CardItem header>
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
                        style={{ height:400, width:null, flex: 1 , resizeMode:'cover'}}/>
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
                    <Text style={{fontWeight: '900'}}>Image Caption</Text>
                </CardItem>
                <CardItem>
                    <Text> {caption}</Text>
                </CardItem>
                <CardItem>
                    <Text style={{fontWeight: '900'}}>Tags</Text>
                </CardItem>
                <CardItem>
                    { tags.map( (tag,i) =>
                        <Text key={i}> {tag} </Text>
                    )}
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
