import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ToastAndroid, Button} from 'react-native';
import {Icon} from "native-base";

import InstagramLogin from 'react-native-instagram-login'

export default class SettingsTab extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name='ios-settings' style={{ color: tintColor }} />
        )
    };
    constructor(props) {
        super(props);
        this.state = {
            username : 'teantin2',
            date : '2019 01 26'
        };

        this.instagramLogin = null;
    };

    getAPI(){
        if (!this.state.token) {
            return ToastAndroid.show('Token is not found', ToastAndroid.SHORT);
        }
        const userSelfUrl = "https://api.instagram.com/v1/users/self/?access_token=" + this.state.token;
        fetch(userSelfUrl)
            .then((response) => response.text())
            .then((responseText) => {
                ToastAndroid.show(responseText, ToastAndroid.SHORT);
                this.state.response = responseText;
                this.render();
            })
            .catch((error) => {
                ToastAndroid.show(error.toString(), ToastAndroid.SHORT);
            });
    }

    renderLogin() {
        return <TouchableOpacity style={{ borderRadius: 5, backgroundColor: 'orange', height: 30, width: 100, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.instagramLogin.show()}>
            <Text style={{ color: 'black' }}>Login</Text>
        </TouchableOpacity>
    }

    renderLogout() {
        return
        <View>
            <Text style={{ margin: 20 }}>token: {this.state.token}</Text>
            <TouchableOpacity style={{ borderRadius: 5, backgroundColor: 'red', height: 30, width: 100, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.getAPI()}>
                <Text style={{ color: 'black' }}>Get API</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ borderRadius: 5, backgroundColor: 'green', height: 30, width: 100, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.logout()}>
                <Text style={{ color: 'black' }}>Logout</Text>
            </TouchableOpacity>

        </View>
    }


    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {!this.state.token ? this.renderLogin()
                 : (<View>
                        <Text style={{ margin: 20 }}>token: {this.state.token}</Text>
                        <TouchableOpacity style={{ borderRadius: 5, backgroundColor: 'red', height: 30, width: 100, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.getAPI()}>
                            <Text style={{ color: 'black' }}>Get API</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ borderRadius: 5, backgroundColor: 'green', height: 30, width: 100, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.logout()}>
                            <Text style={{ color: 'black' }}>Logout</Text>
                        </TouchableOpacity>
                        <Button
                            title="Go to Details"
                            onPress={() => this.props.navigation.navigate('Post', this.state)}
                        />
                    </View>)
                }

                {this.state.response && <View>
                    <Text style={{ margin: 20 }}>response: {this.state.response}</Text>
                    </View>
                }

                {this.state.failure && <View>
                    <Text style={{ margin: 10 }}>failure: {JSON.stringify(this.state.failure)}</Text>
                    </View>
                }
                <InstagramLogin
                    ref= {ref => this.instagramLogin= ref}
                    clientId='e933365d338c4ac6a928afa990398386'
                    redirectUrl='http://blog.naver.com/teantin'
                    scopes={['public_content', 'follower_list']}
                    onLoginSuccess={(token) => this.setState({ token })}
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
    }
});
