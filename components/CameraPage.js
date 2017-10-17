import React, {Component} from 'react';
import ReactNative from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
import Camera from 'react-native-camera';
import { Icon } from 'react-native-elements';
import StatusBar from './StatusBar';
import styles from '../styles';

const {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableHighlight
} = ReactNative;

class CameraPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: null,
      barcode: null,
      barcodeType: null,
      progress: 100
    };
  }
  
  renderCamera(){
    return (
      <Camera
        ref={(cam) => {
          this.camera = cam;
        }}
        style={styles.preview}
        aspect={Camera.constants.Aspect.fill}
        captureTarget={Camera.constants.CaptureTarget.disk}
        onBarCodeRead={this._onBarCodeRead.bind(this)}
      >
        <Icon 
          name='camera-iris'
          type='material-community'
          color='#333333'
          style={styles.capture}
          onPress={this.takePicture.bind(this)}/>
      </Camera>
    );
  }
  renderImage() {
    return (
      <View>
        <Image
          source={{ uri: this.state.path }}
          style={styles.preview}
        />
        <View style={styles.photoButtons}>
          {this.renderUpload()}
          <Icon 
              name='cancel'
              type='material-community'
              color='#333333'
              style={styles.photoButton}
              onPress={() => this.setState({ path: null })}/>
        </View>
      </View>
    );
  }
  _onBarCodeRead(e) {
    this.setState({ barcode: e.data, barcodeType: e.type });
  }
  renderBarCodeInfo() {
    return (
      <View>
        <Text>Barcode Found!</Text>
        <Text>{this.state.barcode}</Text>
        <Text>{this.state.barcodeType}</Text>
        <Icon 
              name='cancel'
              type='material-community'
              color='#333333'
              style={styles.photoButton}
              onPress={() => this.setState({ barcode: null, barcodeType: null })}/>
      </View>
    )
  }
  selectPage(){
    if(this.state.path){
      return this.renderImage();
    }else if(this.state.barcode){
      return this.renderBarCodeInfo();
    }else{
      return this.renderCamera();
    }
  }
  render() {
    return (
      <View style={styles.panelContrainer}>
        {this.selectPage()}
      </View>
    )
  }
}
module.exports = CameraPage;