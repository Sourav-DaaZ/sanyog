import React from 'react';
import {View} from 'react-native';
import styles from './style';

import { connect } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';

const DashboardLayout = (props) => (
  <View style={styles.container}>
    {props.children}
  </View>
);


const mapStateToProps = state => {
  return {
      loading: state.auth.loading,
  };
};

export default connect( mapStateToProps, null ) (DashboardLayout);
