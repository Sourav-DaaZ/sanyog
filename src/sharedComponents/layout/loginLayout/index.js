import React from 'react';
import {View, StatusBar} from 'react-native';
import {Text} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import styles from './style';
import Loader from '../../loader';

import { connect } from 'react-redux';

const LoginLayout = (props) => (
  <View style={styles.container}>
    {console.log(props)}
    <StatusBar backgroundColor="#009387" barStyle="light-content" />
    <Loader loading={props.loading}/>
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


const mapStateToProps = state => {
  return {
      loading: state.auth.loading,
  };
};

export default connect( mapStateToProps, null ) (LoginLayout);
