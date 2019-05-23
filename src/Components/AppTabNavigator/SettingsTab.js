import React, { Component } from 'react';
import {View, StyleSheet, TouchableOpacity, ToastAndroid, Image} from 'react-native';
import {Container, Header, Content, Body, Button, Text, Icon, Left, Right} from "native-base";
import InstagramLogin from 'react-native-instagram-login'

import asset_login_slogan from '../../../assets/login/Login_Slogan.png'
import asset_login_image from '../../../assets/login/Login_Image.png'

export default class SettingsTab extends Component {
    // static navigationOptions = {
    //     tabBarIcon: ({ tintColor }) => (
    //         <Icon name='ios-settings' style={{ color: tintColor }} />
    //     )
    // };
    constructor(props) {
        super(props);
        this.state = {};
        this.instagramLogin = null;
    };

    getAPI(token){
        const access_token = this.state.token ? this.state.token : token;
        const userSelfUrl = "https://api.instagram.com/v1/users/self/?access_token=" + access_token;
        fetch(userSelfUrl)
            .then((response) => response.text())
            .then((responseText) => {
                // ToastAndroid.show(responseText, ToastAndroid.SHORT);
                this.state.user = responseText;
                // move to CameraTab
                this.props.navigation.navigate('MainTab', {
                    user: this.state.user,
                    token: this.state.token
                })
            })
            .catch((error) => {
                ToastAndroid.show(error.toString(), ToastAndroid.SHORT);
            });
    }

    render() {
        return (
            <View style={style.container}>
                {/*this.renderLogin()*/}


                <View style={style.loginImage}>
                    <Image source={asset_login_image} style={{height:'100%',width:'100%',resizeMode:'cover'}} />
                </View>
                <View style={style.loginSlogan}>
                    <Image source={asset_login_slogan} style={{height:'100%',width:'100%',resizeMode:'contain'}} />
                </View>
                <View style={style.loginButtons}>
                    <Button bordered rounded onPress={() => this.instagramLogin.show()}>
                        <Text>Log In</Text>
                    </Button>
                    <View style={{width:30}}></View>
                    <Button block rounded onPress={() => this.instagramLogin.show()}>
                        <Text style={{color:'white'}}>Sign Up</Text>
                    </Button>
                </View>
                <View style={style.Bottoms}>
                </View>


                <InstagramLogin
                    ref= {ref => this.instagramLogin= ref}
                    clientId='e933365d338c4ac6a928afa990398386'
                    redirectUrl='http://blog.naver.com/teantin'
                    scopes={['public_content', 'follower_list']}
                    onLoginSuccess={(token) => {
                        this.setState({ token });
                        this.getAPI(token);
                    }}
                    onLoginFailure={(data) => this.setState({ failure: data })}
                />
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
    loginImage: {
        width:'100%',
        height:'60%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginSlogan: {
        width:'100%',
        height:'25%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginButtons: {
        // width:'30%',
        // height:'5%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Bottoms: {
        width:'100%',
        height:'10%',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
