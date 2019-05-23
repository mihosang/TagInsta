import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import { Icon } from 'native-base';
import { createAppContainer ,createBottomTabNavigator} from 'react-navigation';

import CameraTab from './AppTabNavigator/CameraTab'
import GalleryTab from './AppTabNavigator/GalleryTab'
import SettingsTab from "./AppTabNavigator/SettingsTab";
import PostTab from "./AppTabNavigator/PostTab";

const AppTabNavigator = createBottomTabNavigator({
    Settings: {screen: SettingsTab},
    Camera: {screen: CameraTab},
    Gallery: {screen: GalleryTab},
    Post: {screen: PostTab}

});

const AppTabContainer = createAppContainer(AppTabNavigator);

export default class MainScreen extends Component {
    // navigationOptions 코드 추가
    static navigationOptions = {
        headerLeft: <Icon name="md-camera" style={{paddingLeft:10}} />,
        title: "Tag Inssa",
        headerRight: <Icon name="md-send"  style={{paddingRight:10}} />
    };

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
