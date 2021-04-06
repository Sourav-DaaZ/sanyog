import React from 'react';
import {View, StatusBar, ScrollView} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import styles from './style';
import Loader from '../../loader';

import {connect} from 'react-redux';
import { color } from 'react-native-reanimated';

const LoginLayout = (props) => {
  const {colors} = useTheme();
  return(
  <View style={[styles.container,{backgroundColor: colors.mainColor}]}>
    <StatusBar backgroundColor={colors.mainColor} barStyle="light-content" />
    <Loader loading={props.loading} />
    <View style={props.layout ? styles.bigHeader : styles.header}>
      {props.headerText ? (
        <Text style={styles.text_header}>{props.headerText}</Text>
      ) : null}
      {props.layout ? props.layout : null}
    </View>
    <Animatable.View
      style={[props.layout ? styles.smallFooter : styles.footer, {backgroundColor: colors.backgroundColor}]}
      animation="fadeInUpBig">
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {props.children}
      </ScrollView>
    </Animatable.View>
  </View>
)};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
  };
};

export default connect(mapStateToProps, null)(LoginLayout);
