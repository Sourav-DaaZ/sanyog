import React, {useRef} from 'react';
import {StyleSheet, View, Alert, TouchableOpacityBase} from 'react-native';
import {Button, useTheme, Text} from 'react-native-paper';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';

import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import ModalLayout from '../../sharedComponents/modal';
import CommonInput from '../../sharedComponents/commonInput';
import {updateObject, _storeData} from '../../utils';
import MapViewDirections from 'react-native-maps-directions';
import InsideAuth from '../../services/inSideAuth';

const Dashboard = (props) => {
  const {colors} = useTheme();
  const mapRef = useRef(null);
  const [visible, setVisible] = React.useState(false);
  const [reports, setReports] = React.useState(
    props.route.params?.data
      ? [props.route.params?.data]
      : [
          {
            id: 'BB',
            lat: 0.002,
            lon: 0.01,
            location: 'BigBazar',
            distance: 5,
          },
          {
            id: 'Tz',
            lat: 0.04,
            lon: 0.03,
            location: 'Trendz',
            distance: 7,
          },
          {
            id: 'S',
            lat: -0.03,
            lon: 0.03,
            location: 'Shopify',
            distance: 13,
          },
          {
            id: 'BS',
            lat: -0.003,
            lon: -0.02,
            location: 'BigShop',
            distance: 15,
          },
        ],
  );
  const [marker, setMarker] = React.useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });
  const [selectMarker, setSelectMarker] = React.useState(null);
  const [markerSelect, setMarkerSelect] = React.useState(
    props.route.params?.data ? props.route.params.data : null,
  );
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

  const onPinSubmit = () => {
    setVisible(false);
    InsideAuth()
      .geoApi({
        address: data.controls.pin.value,
        code: 'AIzaSyDQgiKMf2-NZrXY0fFGhLvhqVOMmtYNq0s',
      })
      .then((x) => {
        if (x.results) {
          mapRef.current.animateToRegion({
            latitude: x.results[0].geometry.location.lat,
            longitude: x.results[0].geometry.location.lng,
            latitudeDelta: 0.08,
            longitudeDelta: 0.08,
          });
        } else {
          Alert.alert('error', 'No Data Available', [
            {
              text: 'OKkk',
            },
          ]);
        }
      })
      .catch((e) => {
        Alert.alert('error', "Something wents wrong", [
          {
            text: 'OK',
          },
        ]);
      });
  };

  const onPressMap = (cord) => {
    setMarkerSelect(null);
    setSelectMarker(cord);
  }
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
        toolbarEnabled={true}
        onPress={(e)=>onPressMap(e.nativeEvent.coordinate)}>
        {markerSelect ? (
          <MapViewDirections
            origin={{
              latitude: selectMarker ? selectMarker.latitude : marker.latitude,
              longitude: selectMarker
                ? selectMarker.longitude
                : marker.longitude,
            }}
            destination={{
              latitude: selectMarker
                ? selectMarker.latitude + markerSelect.lat
                : marker.latitude + markerSelect.lat,
              longitude: selectMarker
                ? selectMarker.longitude + markerSelect.lon
                : marker.longitude + markerSelect.lon,
            }}
            apikey={'AIzaSyDQgiKMf2-NZrXY0fFGhLvhqVOMmtYNq0s'} // insert your API Key here
            strokeWidth={2}
            strokeColor="#111111"
          />
        ) : null}
        {selectMarker ? (
          <MapView.Marker
            coordinate={{
              latitude: selectMarker.latitude,
              longitude: selectMarker.longitude,
            }}
            title={'Selected Location'}
          />
        ) : null}
        {reports.map((report) => (
          <MapView.Marker
            key={report.id}
            onPress={() => OnShopPress(report)}
            coordinate={{
              latitude: selectMarker
                ? selectMarker.latitude + report.lat
                : marker.latitude + report.lat,
              longitude: selectMarker
                ? selectMarker.longitude + report.lon
                : marker.longitude + report.lon,
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
              props.storeLocation(markerSelect);
            }
            markerSelect && !props.route.params?.data
              ? props.navigation.navigate('LandingScreen')
              : currentLocation();
          }}
          style={{
            width: '100%',
            textAlign: 'center',
            backgroundColor: colors.mainColor,
          }}
          color={colors.backgroundColor}>
          {markerSelect && !props.route.params?.data
            ? 'Continue'
            : 'Current Location'}
        </Button>
        <Text style={{width: '100%', textAlign: 'center', padding: 10}}>
          OR
        </Text>
        {props.route.params?.data ? (
          <Button
            onPress={() => props.navigation.navigate('RiderScreen')}
            style={{
              width: '100%',
              textAlign: 'center',
              backgroundColor: colors.mainColor,
            }}
            color={colors.backgroundColor}>
            Go Back
          </Button>
        ) : (
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
        )}
      </View>
      <ModalLayout
        visable={visible}
        close={() => {
          if (markerSelect) {
            props.storeLocation(markerSelect);
          } else {
            props.storeLocation(reports[1]);
          }
          setVisible(false);
        }}
        title="Enter Your pin code"
        onPress={onPinSubmit}
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
          keyNum={false}
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

const mapDispatchToProps = (dispatch) => {
  return {
    storeLocation: (val) => dispatch(actions.storeLocation(val)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
