import React from 'react';
import {View, TouchableOpacity, TextInput} from 'react-native';
import {Text} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LoginLayout from '../../sharedComponents/layout/loginLayout';
import {loginStyle as styles} from './style';

const LoginScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
  });

  const onInputChange = (val) => {
    if (val.length > 0) {
      setData({
        ...data,
        email: data,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: data,
        check_textInputChange: false,
      });
    }
  };
  const onPasswordChange = (val) => {
    setData({
      ...data,
      password: data,
    });
  };

  return (
    <LoginLayout headerText="Welcome">
      <Text style={styles.text_footer}>Email</Text>
      <View style={styles.action}>
        <FontAwesome name="user-o" color="#05375a" size={20} />
        <TextInput
          placeholder="Your Email"
          style={styles.textInput}
          onChangeText={(val) => onInputChange(val)}
          autoCapitalize="none"
        />
        {data.check_textInputChange ? (
          <Animatable.View animation="bounceIn">
            <Feather name="check-circle" color="green" size={20} />
          </Animatable.View>
        ) : null}
      </View>
      <Text style={[styles.text_footer, {marginTop: 35}]}>Password</Text>
      <View style={styles.action}>
        <FontAwesome name="lock" color="#05375a" size={20} />
        <TextInput
          placeholder="Your Password"
          style={styles.textInput}
          onChangeText={(val) => onPasswordChange(val)}
          secureTextEntry={data.secureTextEntry}
        />
        <Feather
          name={data.secureTextEntry ? 'eye-off' : 'eye'}
          color="gray"
          size={20}
          onPress={() =>
            setData({...data, secureTextEntry: !data.secureTextEntry})
          }
        />
      </View>
      <View style={styles.button}>
        <LinearGradient colors={['#08d464', '#01ab9d']} style={styles.signIn}>
          <Text style={[styles.textSign, {color: 'white'}]}>Get Started</Text>
        </LinearGradient>
        <TouchableOpacity
          style={[
            styles.signIn,
            {borderColor: '#009387', borderWidth: 1, marginTop: 15},
          ]}>
          <Text style={[styles.textSign, {color: '#009387'}]}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </LoginLayout>
  );
};

export default LoginScreen;
