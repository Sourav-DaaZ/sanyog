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
              marginBottom: 20
            }}>
            <Text style={styles.text_footer}>Destination:</Text>
            <View>
              <Text></Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              alignItems: 'center',
              marginBottom: 20
            }}>
            <Text style={styles.text_footer}>Distance</Text>
            <View>
              <Text></Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              alignItems: 'center',
              marginBottom: 20
            }}>
            <Text style={styles.text_footer}>Estimated Price: </Text>
            <View>
              <Text></Text>
              <Text style={{marginBottom: 10, borderBottomColor: 'lightgray', borderBottomWidth: 1, paddingBottom: 10}}></Text>
              <Text></Text>
            </View>
          </View>
          <View style={[styles.buttonInput, {marginTop: 10}]}>
            <ButtonLayout outline>View in Map</ButtonLayout>
          </View>
          <View style={[styles.buttonInput, {marginTop: 20}]}>
            <ButtonLayout onPress={()=>{
              Alert.alert(
                "success",
                "Order place Successfully!",
                [
                  { text: "OK", onPress: () => props.navigation.navigate('LandingScreen') }
                ]
              );
            }}>Place Order</ButtonLayout>
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loader: (val) => dispatch(actions.loading(val)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RiderScreen);
