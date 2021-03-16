import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import styles from './style';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import defaultValue from '../../constants/defaultValue';

const OtpLayout = (props) => (
  <View style={{alignItems: 'center'}}>
    <OTPInputView
      pinCount={defaultValue.otpLength}
      autoFocusOnLoad
      onCodeChanged={(code) => props.onChange(code, props.type)}
      code={props.value}
      style={styles.borderStyleBase}
      codeInputFieldStyle={styles.basicStyle}
      // codeInputHighlightStyle={styles.underlineStyleHighLighted}
    />
    {props.error && props.error.length > 0 ? (
      <Text style={{color: 'red'}}>{props.error}</Text>
    ) : null}
    {(props.success && props.success.length > 0  && props.error.length == 0) ? (
      <Text style={{color: 'green'}}>{props.success}</Text>
    ) : null}
    <TouchableOpacity onPress={props.resendOtp}>
      <Text style={styles.resendOtpStyle}>Resend OTP</Text>
    </TouchableOpacity>
  </View>
);

export default OtpLayout;
