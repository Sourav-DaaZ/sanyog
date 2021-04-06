import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';

const ButtonLayout = (props) => {
  const {colors} = useTheme();
  return props.outline ? (
    <TouchableOpacity
      style={[
        styles.signIn,
        {borderColor: colors.mainColor, borderWidth: 1, marginTop: 15},
        props.style,
      ]}
      onPress={props.onPress}>
      <Text style={[styles.textSign, {color: colors.mainColor}]}>
        {props.children}
      </Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.signIn, props.style]}>
      <LinearGradient colors={[colors.upColorForGradient, colors.downColorForGradient]} style={styles.signIn}>
        <Text style={[styles.textSign, {color: colors.backgroundColor}]}>
          {props.children}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ButtonLayout;
