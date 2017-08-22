/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Button,
  StyleSheet,
  Text,
  View,
  NativeModules,
  requireNativeComponent,
} from 'react-native';
import Sketch from 'react-native-sketch';

const SketchManager = NativeModules.RNSketchManager || {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sketch: {
    height: 250, // Height needed; Default: 200px
  },
});

export default class paintChalledgeNative extends Component {
  constructor(props) {
    super(props);
    this.clear = this.clear.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.state = {
      drawing: null,
    };
  }


  onReset() {
    console.log('bye bye drawing');
  }


  onSave() {
    this.sketch.saveImage(this.state.drawing)
      .then(data => console.log(data))
      .catch(error => console.log(error));
  }

  onUpdate(base64Image) {
    this.setState({ drawing: base64Image });
  }
  clear() {
    this.sketch.clear();
  }


  render() {
    return (
      <View style={styles.container}>
        <Sketch
          fillColor="transparent"
          strokeColor="#111111"
          strokeThickness={2}
          imageType="png"
          onReset={this.onReset}
          onUpdate={this.onUpdate}
          ref={(sketch) => { this.sketch = sketch; }}
          style={styles.sketch}
        />
        <Button
          onPress={this.clear}
          title="clear drawing"
        />
        <Button
          disabled={!this.state.encodedSignature}
          onPress={this.onSave}
          title="Save drawing"
        />

      </View>
    );
  }
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F5FCFF',
//     },
//     welcome: {
//         fontSize: 20,
//         textAlign: 'center',
//         margin: 10,
//     },
//     instructions: {
//         textAlign: 'center',
//         color: '#333333',
//         marginBottom: 5,
//     },
// });

AppRegistry.registerComponent('paintChalledgeNative', () => paintChalledgeNative);
