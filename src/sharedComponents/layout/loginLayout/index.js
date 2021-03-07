import React from 'react';
import {View, StatusBar} from 'react-native';
import {Text} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import styles from './style';

const LoginLayout = (props) => (
  <View style={styles.container}>
    <StatusBar backgroundColor="#009387" barStyle="light-content" />
    <View style={props.layout?styles.bigHeader:styles.header}>
      {props.headerText ? (
        <Text style={styles.text_header}>{props.headerText}</Text>
      ) : null}
      {props.layout ? props.layout : null}
    </View>
    <Animatable.View style={props.layout?styles.smallFooter:styles.footer} animation="fadeInUpBig">
      {props.children}
    </Animatable.View>
  </View>
);

export default LoginLayout;
