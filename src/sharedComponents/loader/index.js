import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import * as Animatable from 'react-native-animatable';
import styles from './style';

const Loader = (props) =>
  props.loading ? (
    <View style={styles.loaderBackground}>
      <Animatable.View animation="slideInDown" style={styles.loader}>
        <ActivityIndicator animating={true} size={40} color="#009387" />
      </Animatable.View>
    </View>
  ) : null;

export default Loader;
