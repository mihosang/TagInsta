/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import CameraApplication from './src/CameraApplication'

import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => CameraApplication);
AppRegistry.registerComponent(appName, () => App);
