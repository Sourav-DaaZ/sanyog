import React, {useRef} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {Button, useTheme, Text} from 'react-native-paper';
import {connect} from 'react-redux';

import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import ModalLayout from '../../sharedComponents/modal';
import CommonInput from '../../sharedComponents/commonInput';
import {updateObject} from '../../utils';

const Dashboard = (props) => {
  const {colors} = useTheme();
  const mapRef = useRef(null);
  const [visible, setVisible] = React.useState(false);
  const [marker, setMarker] = React.useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });
  const [data, setData] = React.useState({
    controls: {
      pin: {
        elementType: 'input',
        elementConfig: {
          type: 'pin',
          text: 'Pincode',
          placeholder: 'Pincode',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        errors: '',
        className: [],
        icons: [],
      },
    },
  });

  const onInputChange = (val, type) => {
    let varVal = {};
    varVal = updateObject(data, {
      controls: updateObject(data.controls, {
        [type]: updateObject(data.controls[type], {
          value: val,
          errors: '',
          valid: true,
        }),
      }),
    });
    setData(varVal);
  };

  const currentLocation = () => {
    Geolocation.getCurrentPosition(
      ({coords}) => {
        if (mapRef.current) {
          setMarker({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
          mapRef.current.animateToRegion({
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
        }
      },
      (error) => alert('Error: Are location services on?'),
      {enableHighAccuracy: true},
    );
  };
  React.useEffect(() => {
    currentLocation();
  }, []);

  return (
    <View style={styles.MainContainer}>
      <MapView
        ref={mapRef}
        style={styles.mapStyle}
        provider={PROVIDER_GOOGLE}
        zoomEnabled={true}
        zoomControlEnabled={true}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={false}
        showsTraffic={false}
        toolbarEnabled={true}>
        <MapView.Marker coordinate={marker} title={'Your Location'} draggable />
      </MapView>
      <View
        style={{
          backgroundColor: 'white',
          position: 'absolute',
          height: 150,
          width: '100%',
          display: 'flex',
          padding: 20,
        }}>
        <Button
          onPress={() => {
            currentLocation();
            setTimeout(() => {
              props.navigation.navigate('LandingScreen');
            }, 1000);
          }}
          style={{
            width: '100%',
            textAlign: 'center',
            backgroundColor: colors.mainColor,
          }}
          color={colors.backgroundColor}>
          Current Location
        </Button>
        <Text style={{width: '100%', textAlign: 'center', padding: 10}}>
          OR
        </Text>
        <Button
          onPress={() => setVisible(true)}
          style={{
            width: '100%',
            textAlign: 'center',
            backgroundColor: colors.mainColor,
          }}
          color={colors.backgroundColor}>
          Ener Pin code
        </Button>
      </View>
      <ModalLayout
        visable={visible}
        close={() => setVisible(false)}
        title="Enter Your pin code"
        onPress={() => props.navigation.navigate('LandingScreen')}
        btnTxt="submit">
        <CommonInput
          placeholder={data.controls.pin.elementConfig.placeholder}
          onInputChange={onInputChange}
          onSubmit={() => Keyboard.dismiss()}
          value={data.controls.pin.value}
          type={data.controls.pin.elementConfig.type}
          isValid={data.controls.pin.valid}
          validation={data.controls.pin.validation}
          icons={data.controls.pin.icons}
          ele={data.controls.pin.elementType}
          keyNum={true}
        />
      </ModalLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    position: 'absolute',
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

const mapStateToProps = (state) => {
  return {
    token: state.auth.access_token,
  };
};

export default connect(mapStateToProps, null)(Dashboard);
