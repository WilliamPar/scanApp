import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';

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
            </Scene>
        </Router>
    );
  }
 }
}

