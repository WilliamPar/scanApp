import React, {Component} from 'react';
import ReactNative from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
import Camera from 'react-native-camera';
import { Icon } from 'react-native-elements';
import StatusBar from './StatusBar';
import styles from '../styles';

class HomePage extends Component {
    render() {
        return (
          <Text>Hello world!</Text>
        );
      }
    }
module.exports = HomePage