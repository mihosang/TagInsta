import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Icon } from 'native-base';
import { createAppContainer ,createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import CameraTab from './AppTabNavigator/CameraTab'
import GalleryTab from './AppTabNavigator/GalleryTab'
import SettingsTab from "./AppTabNavigator/SettingsTab";
import PostTab from "./AppTabNavigator/PostTab";
import MainTab from "./AppTabNavigator/MainTab";

const AppTabNavigator = createStackNavigator({
    Settings: {screen: SettingsTab},
    Camera: {screen: CameraTab},
    Gallery: {screen: GalleryTab},
    Post: {screen: PostTab},
    Main: {screen: MainTab}
});

export default createAppContainer(AppTabNavigator);
// const AppTabContainer = createAppContainer(AppTabNavigator);
/*
export default class MainScreen extends Component {
    // navigationOptions 코드 추가
    // static navigationOptions = {
    //     headerLeft: <Icon name="ios-close" style={{paddingLeft:10}} />,
    //     title: "Generated Hashtags",
    //     headerRight: <Icon name="logo-instagram"  style={{paddingRight:10}} />
    // };

    render() {
        return <AppTabContainer/>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

 */
