import {View} from 'native-base';
import * as React from 'react';
import {Alert, ScrollView, TouchableOpacity, Keyboard} from 'react-native';
import {Avatar, useTheme, Text} from 'react-native-paper';
import {connect} from 'react-redux';

import styles from './style';
import * as actions from '../../store/actions';
import {displayResponse, updateObject} from '../../utils';
import ButtonLayout from '../../sharedComponents/button';

const RiderScreen = (props) => {
  const {colors} = useTheme();

  const onOrder = () => {
    let dCart = {};
    for (const property in props.cart) {
      if(props.cart[property] > 0){
        dCart[property] = property;
      }
    }
    const data = {
      cart: dCart,
      cost: props.cost + props.store_location?.distance * 1,
      location: props.store_location.location,
    };
    console.log(data);
    props.placeOrderUpdate(data);
    props.orderUpdate({});
    props.costUpdate(0);
    props.navigation.navigate('LandingScreen');
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={styles.headerText}>Rider Details</Text>
        <View style={styles.outerBox}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <Text style={styles.text_footer}>Destination:</Text>
            <View>
              <Text>{props.address}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <Text style={styles.text_footer}>Distance</Text>
            <View>
              <Text>{props.store_location?.distance} KM.</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <Text style={styles.text_footer}>Estimated Price: </Text>
            <View>
              <Text>{props.cost}</Text>
              <Text
                style={{
                  marginBottom: 10,
                  borderBottomColor: 'lightgray',
                  borderBottomWidth: 1,
                  textAlign: 'right',
                  paddingBottom: 10,
                }}>
                {props.store_location?.distance * 1}
              </Text>
              <Text>{props.cost + props.store_location?.distance * 1}</Text>
            </View>
          </View>
          {props.address?.length > 1 &&
          props.payment?.num?.length > 1 &&
          props.store_location?.distance ? (
            <View style={[styles.buttonInput, {marginTop: 10}]}>
              <ButtonLayout
                outline
                onPress={() =>
                  props.navigation.navigate('MapScreen', {
                    data: props.store_location,
                  })
                }>
                View in Map
              </ButtonLayout>
            </View>
          ) : null}
          <View style={[styles.buttonInput, {marginTop: 20}]}>
            {props.address?.length > 1 &&
            props.payment?.num?.length > 1 &&
            props.store_location?.distance ? (
              <ButtonLayout
                onPress={() => {
                  Alert.alert('success', 'Order place Successfully!', [
                    {
                      text: 'OK',
                      onPress: onOrder,
                    },
                  ]);
                }}
              >
                Place Order
              </ButtonLayout>
            ) : (
              <Text style={{textAlign: 'center'}}>
                Address OR Card details OR Shop Details Missing! please selec
                from menu.
              </Text>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    token: state.auth.access_token,
    address: state.auth.address,
    payment: state.auth.payment,
    cart: state.auth.cart,
    cost: state.auth.cost,
    store_location: state.auth.store_location,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loader: (val) => dispatch(actions.loading(val)),
    placeOrderUpdate: (val) => dispatch(actions.placeOrderUpdate(val)),
    orderUpdate: (val) => dispatch(actions.orderUpdate(val)),
    costUpdate: (val) => dispatch(actions.costUpdate(val)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RiderScreen);
