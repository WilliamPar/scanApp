import React, {Component} from 'react';
import { ActivityIndicator, AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import {Drawer, Router, Scene, Tabs} from 'react-native-router-flux';
import * as firebase from 'firebase';
import Authentication from './components/Authentication';
import CameraPage from './components/CameraPage';
import HomePage from './components/HomePage';

const firebaseConfig = {
  apiKey: "AIzaSyBy_zwRs7NZ_GZLzO5cU-FOx1axBSsUR_w",
  authDomain: "scanapp-25187.firebaseapp.com",
  databaseURL: "https://scanapp-25187.firebaseio.com",
  projectId: "scanapp-25187",
  storageBucket: "scanapp-25187.appspot.com",
  messagingSenderId: "619341792086"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
console.ignoredYellowBox = [
  "Setting a timer"
];


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const TabIcon = ({ focused, title }) => {
  return (
    <Icon 
      name={title}
      type='material-community'
      color={focused ? '#333333' : '#c0c0c0'} />
  );
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { hasToken: false, isLoaded: false };
  }
  componentWillMount() {
    AsyncStorage.getItem('id_token').then((token) => {
      this.setState({ hasToken: token !== null, isLoaded: true });
    });
  }
  render() {
    if (!this.state.isLoaded) {
      return (
        <ActivityIndicator />
      )
    } else {
      return (
        <Router>
          <Scene key='root'>
            <Scene
              component={Authentication}
              initial={!this.state.hasToken}
              hideNavBar={true}
              key='Authentication'
              title='Authentication'
            />
              <Scene
                  key="HomeTab"
                  title="format-list-bulleted"
                  icon={TabIcon}>
                  <Scene
                    component={HomePage}
                    initial={this.state.hasToken}
                    key='HomePage'
                    title='Home Page'
                  />
              </Scene>
        
            <Scene
            key="CameraTab"
            title="camera"
            icon={TabIcon}>
            <Scene
              component={CameraPage}
              key='CameraPage'
              title='Camera Page'
            />
            </Scene>
          </Scene>
        </Router>
    );
  }
 }
}
