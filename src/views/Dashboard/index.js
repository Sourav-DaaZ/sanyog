import React, {useRef} from 'react';
import {StyleSheet, View, Alert, TouchableOpacityBase} from 'react-native';
import {Button, useTheme, Text} from 'react-native-paper';
import {connect} from 'react-redux';

import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import ModalLayout from '../../sharedComponents/modal';
import CommonInput from '../../sharedComponents/commonInput';
import {updateObject, _storeData} from '../../utils';
import MapViewDirections from 'react-native-maps-directions';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Dashboard = (props) => {
  const {colors} = useTheme();
  const mapRef = useRef(null);
  const [visible, setVisible] = React.useState(false);
  const [reports, setReports] = React.useState([
    {
      id: 'BB',
      lat: 0.002,
      lon: 0.01,
      location: 'BigBazar',
    },
    {
      id: 'Tz',
      lat: 0.04,
      lon: 0.03,
      location: 'Trendz',
    },
    {
      id: 'S',
      lat: -0.03,
      lon: 0.03,
      location: 'Shopify',
    },
    {
      id: 'BS',
      lat: -0.003,
      lon: -0.02,
      location: 'BigShop',
    },
  ]);
  const [marker, setMarker] = React.useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });
  const [markerSelect, setMarkerSelect] = React.useState(null);
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
            latitudeDelta: 0.08,
            longitudeDelta: 0.08,
          });
        }
      },
      (error) => alert('Error: Are location services on?'),
      {enableHighAccuracy: true},
    );
  };
  React.useEffect(() => {
    // _storeData('shopMapLocation', null)
    currentLocation();
  }, []);

  const OnShopPress = (x) => {
    setMarkerSelect(x);
  };

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
        {markerSelect ? (
          <MapViewDirections
            origin={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            destination={{
              latitude: marker.latitude + markerSelect.lat,
              longitude: marker.longitude + markerSelect.lon,
            }}
            apikey={'AIzaSyDQgiKMf2-NZrXY0fFGhLvhqVOMmtYNq0s'} // insert your API Key here
            strokeWidth={2}
            strokeColor="#111111"
          />
        ) : null}
        {reports.map((report) => (
          <MapView.Marker
            key={report.id}
            onPress={() => OnShopPress(report)}
            coordinate={{
              latitude: marker.latitude + report.lat,
              longitude: marker.longitude + report.lon,
            }}
            title={report.location}>
            <View style={styles.circle}>
              <Text style={styles.pinText}>{report.id}</Text>
            </View>
          </MapView.Marker>
        ))}
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
            if (markerSelect) {
              _storeData('shopMapLocation', markerSelect);
            }
            markerSelect
              ? props.navigation.navigate('LandingScreen')
              : currentLocation();
          }}
          style={{
            width: '100%',
            textAlign: 'center',
            backgroundColor: colors.mainColor,
          }}
          color={colors.backgroundColor}>
          {markerSelect ? 'Continue' : 'Current Location'}
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
          Enter Pin code
        </Button>
      </View>
      <ModalLayout
        visable={visible}
        close={() => {
          if (markerSelect) {
            _storeData('shopMapLocation', markerSelect);
          } else {
            _storeData('shopMapLocation', {
              id: 'BS',
              lat: -0.003,
              lon: -0.02,
              location: 'BigShop',
            });
          }
          setVisible(false);
        }}
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
  circle: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: 'red',
  },
  pinText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    token: state.auth.access_token,
  };
};

export default connect(mapStateToProps, null)(Dashboard);
