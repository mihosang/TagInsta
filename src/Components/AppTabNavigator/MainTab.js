import React, { Component } from 'react';
import {View, StyleSheet, TouchableOpacity, ToastAndroid, Image} from 'react-native';
import {Container, Header, Content, Card, CardItem, Body, Button, Text, Icon, Left, Right} from "native-base";

import asset_main_logo from "../../../assets/main/Main_Logo.png";
import asset_ad_logo from "../../../assets/main/Main_AD_image.png";
import asset_main_camera from "../../../assets/main/Main_Button_Camera_default.png";
import asset_main_gallery from "../../../assets/main/Main_Button_Gallery_default.png";
import asset_not_used from "../../../assets/main/Main_Button_Popularlist_dafault.png";

export default class MainTab extends Component {
    constructor(props) {
        super();
        this.state = {};
    }
    static navigationOptions = {
        headerLeft: <Icon name="ios-search" style={{paddingLeft:10}} />,
        title: "TAGINSTAR",
        headerRight: <Icon name="md-more"  style={{paddingRight:10}} />
    };

    render() {
        const { navigation } = this.props;
        const data = {
            token: navigation.getParam('token', 'NO-TOKEN'),
            user: navigation.getParam('user', {})
        };
        // this.state.data = data;
        // console.log(this.state);

        return (
            <View style={style.container}>
                <View style={style.adImage}>
                    <Image source={asset_ad_logo} style={{height:'100%',width:'100%',resizeMode:'cover'}} />
                </View>
                <View style={style.takePhoto}>
                    <Card style={{height:'100%', width:'100%'}}>
                        <CardItem button onPress={() => this.props.navigation.navigate('Camera', {
                            user: data.user,
                            token: data.token
                        })}>
                            <Body>
                                <Image source={asset_main_camera} style={{height:'100%',width:'100%',resizeMode:'cover'}} />
                            </Body>
                        </CardItem>
                    </Card>
                </View>
                <View style={style.selectPhoto}>
                    <Card style={{height:'100%', width:'100%'}}>
                        <CardItem button onPress={() => this.props.navigation.navigate('Gallery', {
                            user: data.user,
                            token: data.token
                        })}>
                            <Body>
                                <Image source={asset_main_gallery} style={{height:'100%',width:'100%',resizeMode:'cover'}} />
                            </Body>
                        </CardItem>
                    </Card>
                </View>
                <View style={style.livePopular}>
                    <Card style={{height:'100%', width:'100%'}}>
                        <CardItem>
                            <Body>
                                <Image source={asset_not_used} style={{height:'100%',width:'100%',resizeMode:'cover'}} />
                            </Body>
                        </CardItem>
                    </Card>
                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    adImage: {
        width:'100%',
        height:'70%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    takePhoto: {
        width:'100%',
        height:'10%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectPhoto: {
        width:'100%',
        height:'10%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    livePopular: {
        width:'100%',
        height:'10%',
        alignItems: 'center',
        justifyContent: 'center',
    },

});

