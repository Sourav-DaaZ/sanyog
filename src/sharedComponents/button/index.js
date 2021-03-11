import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';

const ButtonLayout = (props) =>
  props.outline ? (
    <TouchableOpacity
      style={[
        styles.signIn,
        {borderColor: '#009387', borderWidth: 1, marginTop: 15},
        props.style
      ]}
      onPress={props.onPress}>
      <Text style={[styles.textSign, {color: '#009387'}]}>{props.children}</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={props.onPress} style={[styles.signIn,props.style]}>
      <LinearGradient colors={['#08d464', '#01ab9d']} style={styles.signIn}>
        <Text style={[styles.textSign, {color: 'white'}]}>{props.children}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

export default ButtonLayout;
