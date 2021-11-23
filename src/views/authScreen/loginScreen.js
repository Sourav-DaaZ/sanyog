import React from 'react';
import {View, Keyboard, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LoginLayout from '../../sharedComponents/layout/loginLayout';
import {loginStyle as styles} from './style';
import CommonInput from '../../sharedComponents/commonInput';
import {displayResponse, updateObject, validate, _storeData} from '../../utils';
import OutsideAuthApi from '../../services/outSideAuth';
import DeviceInfo from 'react-native-device-info';

import * as actions from '../../store/actions';
import {connect} from 'react-redux';
import validation from '../../constants/validationMsg';
import ButtonLayout from '../../sharedComponents/button';
import defaultValue from '../../constants/defaultValue';
import ModalLayout from '../../sharedComponents/modal';
import OtpLayout from '../../sharedComponents/otpLayout';
import AsyncStorage from '@react-native-community/async-storage';

let deviceId = DeviceInfo.getUniqueId();

const LoginScreen = (props) => {
  const formElementsArray = [];
  const [visible, setVisible] = React.useState(false);
  const [isOtpLogin, setIsOtpLogin] = React.useState(false);
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
          placeholder: 'Enter your password',
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
      otp: {
        elementType: 'otp',
        value: '',
        validation: {
          required: true,
          minLength: defaultValue.otpLength,
        },
        valid: false,
        errors: '',
        success: '',
        className: [],
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
            errors: validation.requiredField(),
            valid: false,
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
    } else if (
      type === 'otp' &&
      !validate(val, {minLength: defaultValue.otpLength})
    ) {
      varVal = updateObject(data, {
        controls: updateObject(data.controls, {
          [type]: updateObject(data.controls[type], {
            value: val,
            errors: validation.validateField('OTP'),
            success: '',
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
      (x) => (
        x.id == 'email' ||
        (!isOtpLogin && x.id == 'password') ||
        (isOtpLogin && visible && x.id == 'otp')
          ? (val[x.id] = x.config.value)
          : null,
        (!isOtpLogin && x.id == 'password') ||
        (isOtpLogin && visible && x.id == 'otp')
          ? isValid.push(x.config.valid)
          : null
      ),
    );
    val.deviceId = deviceId;
    if (isValid.includes(false)) {
      displayResponse(validation.validateField());
    } else {
      props.loader(true);
      if (isOtpLogin && !visible) {
        let email = {
          email: val.email,
        };
        let varVl;
        varVl = updateObject(data, {
          controls: updateObject(data.controls, {
            otp: updateObject(data.controls.otp, {
              errors: '',
              value: '',
            }),
          }),
        });
        setData(varVl);
        OutsideAuthApi()
          .verifyOtp(email)
          .then((res) => {
            props.loader(false);
            displayResponse(res, true);
            setVisible(true);
          })
          .catch((err) => {
            props.loader(false);
            displayResponse(err.message);
          });
      } else {
        OutsideAuthApi()
          .loginApi(val)
          .then(async (res) => {
            props.loader(false);
            displayResponse(res, true);
            setVisible(false);
            props.updateAccessToken(res.data.token.access_token);
            props.updateRefreshToken(res.data.token.refresh_token);
            await _storeData('Token', res.data.token);
            await _storeData('UserType', res.data.type);
          })
          .catch((err) => {
            props.loader(false);
            if (visible) {
              let varVl;
              varVl = updateObject(data, {
                controls: updateObject(data.controls, {
                  otp: updateObject(data.controls.otp, {
                    errors: err.message,
                  }),
                }),
              });
              setData(varVl);
            } else {
              displayResponse(err.message);
            }
          });
      }
    }
  };

  const resendOtp = () => {
    props.loader(true);
    OutsideAuthApi()
      .verifyOtp({email: data.controls.email.value})
      .then((res) => {
        props.loader(false);
        displayResponse(res, true);
        let varVl;
        varVl = updateObject(data, {
          controls: updateObject(data.controls, {
            otp: updateObject(data.controls.otp, {
              success: res.message,
              errors: '',
            }),
          }),
        });
        setData(varVl);
      })
      .catch((err) => {
        props.loader(false);
        displayResponse(err.message);
        let varVl;
        varVl = updateObject(data, {
          controls: updateObject(data.controls, {
            otp: updateObject(data.controls.otp, {
              errors: err.message,
              success: '',
            }),
          }),
        });
        setData(varVl);
      });
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
      {!isOtpLogin ? (
        <Text style={[styles.text_footer, {marginTop: 35}]}>Password</Text>
      ) : null}
      {!isOtpLogin ? (
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
      ) : null}
      {data.controls.password.errors && !isOtpLogin ? (
        <Text style={{color: 'red'}}>{data.controls.password.errors}</Text>
      ) : null}
      <View style={styles.inlineInput}>
        <TouchableOpacity>
          <Text style={styles.otpBtn}>
            {!isOtpLogin ? 'Forgot Password?' : ''}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsOtpLogin(!isOtpLogin)}>
          <Text style={styles.otpBtn}>
            {!isOtpLogin ? 'Login with otp?' : 'Login with password?'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.button}>
        <ButtonLayout onPress={onSubmit}>Login</ButtonLayout>
        <ButtonLayout
          onPress={() => {
            props.navigation.navigate('RegisterScreen');
          }}
          outline>
          Sign Up
        </ButtonLayout>
      </View>
      <ModalLayout
        visable={visible}
        close={() => setVisible(false)}
        title="Verify OTP"
        onPress={onSubmit}
        btnTxt="submit">
        <OtpLayout
          resendOtp={resendOtp}
          onChange={onInputChange}
          value={data.controls.otp.value}
          type={data.controls.otp.elementType}
          error={data.controls.otp.errors}
          success={data.controls.otp.success}
        />
      </ModalLayout>
    </LoginLayout>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    loader: (val) => dispatch(actions.loading(val)),
    updateAccessToken: (data) => dispatch(actions.accessTokenUpdate(data)),
    updateRefreshToken: (data) => dispatch(actions.refreshTokenUpdate(data)),
  };
};

export default connect(null, mapDispatchToProps)(LoginScreen);
