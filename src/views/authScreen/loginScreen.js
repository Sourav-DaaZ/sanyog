import React from 'react';
import {View, TouchableOpacity, Keyboard} from 'react-native';
import {Text} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LoginLayout from '../../sharedComponents/layout/loginLayout';
import {loginStyle as styles} from './style';
import CommonInput from '../../sharedComponents/commonInput';
import {displayResponse, updateObject, validate} from '../../utils';
import OutsideAuthApi from '../../services/outSideAuth';
import DeviceInfo from 'react-native-device-info';

import * as actions from '../../store/actions';
import {connect} from 'react-redux';
import validation from '../../constants/validationMsg';
import ButtonLayout from '../../sharedComponents/button';

let deviceId = DeviceInfo.getUniqueId();

const LoginScreen = (props) => {
  const formElementsArray = [];
  const [data, setData] = React.useState({
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          text: 'Email',
          placeholder: 'Enter your email',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        errors: '',
        className: [],
        icons: [
          <FontAwesome name="user-o" color="#05375a" size={20} />,
          <Feather name="check-circle" color="green" size={20} />,
        ],
      },
      password: {
        elementType: 'password',
        elementConfig: {
          type: 'password',
          text: 'Password',
          placeholder: 'Enter yourpassword',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        errors: '',
        valid: false,
        className: [],
        icons: [
          <FontAwesome name="lock" color="#05375a" size={20} />,
          <Feather name={'eye-off'} color="gray" size={20} />,
        ],
      },
    },
  });

  const onInputChange = (val, type) => {
    let varVal = {};
    if (!validate(val, {required: true})) {
      varVal = updateObject(data, {
        controls: updateObject(data.controls, {
          [type]: updateObject(data.controls[type], {
            value: val,
            errors: 'this field is required',
          }),
        }),
      });
    } else if (type === 'email' && !validate(val, {isEmail: true})) {
      varVal = updateObject(data, {
        controls: updateObject(data.controls, {
          [type]: updateObject(data.controls[type], {
            value: val,
            errors: validation.validateField('email'),
            valid: false,
          }),
        }),
      });
    } else if (type === 'password' && !validate(val, {password: true})) {
      varVal = updateObject(data, {
        controls: updateObject(data.controls, {
          [type]: updateObject(data.controls[type], {
            value: val,
            errors: validation.validateField('password'),
            valid: false,
          }),
        }),
      });
    } else {
      varVal = updateObject(data, {
        controls: updateObject(data.controls, {
          [type]: updateObject(data.controls[type], {
            value: val,
            errors: '',
            valid: true,
          }),
        }),
      });
    }
    setData(varVal);
  };

  for (let key in data.controls) {
    formElementsArray.push({
      id: key,
      config: data.controls[key],
    });
  }

  const onSubmit = () => {
    let isValid = [];
    let val = {};
    formElementsArray.map(
      (x) => ((val[x.id] = x.config.value), isValid.push(x.config.valid)),
    );
    val.deviceId = deviceId;
    if (isValid.includes(false)) {
      displayResponse('please validate all the fields.');
    } else {
      props.loader(true);
      OutsideAuthApi()
        .loginApi(val)
        .then((res) => {
          props.loader(false);
          displayResponse(res, true);
          props.navigation.navigate('RegisterScreen');
        })
        .catch((err) => {
          props.loader(false);
          displayResponse(err.message);
        });
    }
  };

  return (
    <LoginLayout headerText="Welcome">
      <Text style={styles.text_footer}>Email</Text>
      <CommonInput
        placeholder={data.controls.email.elementConfig.placeholder}
        onInputChange={onInputChange}
        onSubmit={() => Keyboard.dismiss()}
        value={data.controls.email.value}
        type={data.controls.email.elementConfig.type}
        isValid={data.controls.email.valid}
        validation={data.controls.email.validation}
        icons={data.controls.email.icons}
        ele={data.controls.email.elementType}
      />
      {data.controls.email.errors ? (
        <Text style={{color: 'red'}}>{data.controls.email.errors}</Text>
      ) : null}
      <Text style={[styles.text_footer, {marginTop: 35}]}>Password</Text>
      <CommonInput
        placeholder={data.controls.password.elementConfig.placeholder}
        onInputChange={onInputChange}
        onSubmit={() => Keyboard.dismiss()}
        value={data.controls.password.value}
        type={data.controls.password.elementConfig.type}
        isValid={data.controls.password.valid}
        validation={data.controls.password.validation}
        icons={data.controls.password.icons}
        ele={data.controls.password.elementType}
      />
      {data.controls.password.errors ? (
        <Text style={{color: 'red'}}>{data.controls.password.errors}</Text>
      ) : null}
      <View style={styles.button}>
        <ButtonLayout onPress={onSubmit} buttonTxt="Login" />
        <ButtonLayout
          onPress={() => {
            props.navigation.navigate('RegisterScreen');
          }}
          buttonTxt="Sign in"
          outline
        />
      </View>
    </LoginLayout>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    loader: (val) => dispatch(actions.loading(val)),
  };
};

export default connect(null, mapDispatchToProps)(LoginScreen);
