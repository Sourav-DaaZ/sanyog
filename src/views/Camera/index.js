import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';
import {displayResponse, updateObject, _storeData} from '../../utils';
import * as actions from '../../store/actions';
import RNFS from 'react-native-fs';
import { connect } from 'react-redux';

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text>Waiting</Text>
  </View>
);

class Camera extends PureComponent {
  constructor(props) {
    super(props);
  
    this.state = {
      cameraType : 'back',
      mirrorMode : false
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type[this.state.cameraType]}
          flashMode={RNCamera.Constants.FlashMode.off}
          mirrorImage={this.state.mirrorMode}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        >
          {({ camera, status, recordAudioPermissionStatus }) => {
            if (status !== 'READY') return <PendingView />;
            return (
              <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => this.setState({cameraType: this.state.cameraType === 'back'?'front':'back'})} style={{backgroundColor: 'transparent', marginTop: 25, marginRight: 150}}>
                  <Icon name="camera-reverse-sharp" size={30}  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
                  <Text style={{ fontSize: 14 }}> Capture </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera>
      </View>
    );
  }

  takePicture = async function(camera) {
    const options = { quality: 0.1, base64: true };
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line
    // const base64image = await RNFS.readFile(data.uri, 'base64');
    // displayResponse(base64image);
    this.props.imageUpdate(data.base64);
    this.props.navigation.goBack();
    // console.log(data.uri);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    imageUpdate: (val) => dispatch(actions.imageUpdate(val)),
  };
};
export default connect(null, mapDispatchToProps)(Camera);