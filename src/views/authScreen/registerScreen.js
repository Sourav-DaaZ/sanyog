import React from 'react';
import {View, Keyboard} from 'react-native';
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
import ModalLayout from '../../sharedComponents/modal';
import OtpLayout from '../../sharedComponents/otpLayout';
import defaultValue from '../../constants/defaultValue';

let deviceId = DeviceInfo.getUniqueId();

const RegisterScreen = (props) => {
  const formElementsArray = [];
  const [visible, setVisible] = React.useState(false);

  const [data, setData] = React.useState({
    controls: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'name',
          text: 'Name',
          placeholder: 'Enter your name',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        errors: '',
        className: [],
        icons: [
          <FontAwesome name="user-o" color="#05375a" size={20} />,
          <Feather name="check-circle" color="green" size={20} />,
        ],
      },
      jobTitle: {
        elementType: 'input',
        elementConfig: {
          type: 'jobTitle',
          text: 'Job Title',
          placeholder: 'Enter job Title',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        errors: '',
        className: [],
        icons: [
          <FontAwesome name="user-o" color="#05375a" size={20} />,
          <Feather name="check-circle" color="green" size={20} />,
        ],
      },
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
          <FontAwesome name="envelope-o" color="#05375a" size={20} />,
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
      adminPassword: {
        elementType: 'password',
        elementConfig: {
          type: 'adminPassword',
          text: 'Admin Password',
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
    } else if (
      type === 'otp' &&
      !validate(val, {minLength: defaultValue.otpLength})
    ) {
      varVal = updateObject(data, {
        controls: updateObject(data.controls, {
          [type]: updateObject(data.controls[type], {
            value: val,
            errors: validation.validateField('OTP'),
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
    console.log(formElementsArray);
    formElementsArray.map(
      (x) => (
        (val[x.id] = x.config.value),
        !visible && x.id === 'otp' ? null : isValid.push(x.config.valid)
      ),
    );
    val.deviceId = deviceId;
    if (isValid.includes(false) && !visible) {
      displayResponse(validation.validateField());
    } else if (isValid.includes(false) && visible) {
      let varVl;
      varVl = updateObject(data, {
        controls: updateObject(data.controls, {
          otp: updateObject(data.controls.otp, {
            errors: validation.validateField(),
          }),
        }),
      });
      setData(varVl);
    } else {
      props.loader(true);
      if (!visible) {
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
          .registerApi(val)
          .then(async (res) => {
            props.loader(false);
            displayResponse(res, true);
            setVisible(false);
            // props.updateAccessToken(res.data.access_token);
            // props.updateRefreshToken(res.data.refresh_token);
            // await _storeData('Token', res.data);
            props.navigation.navigate('LoginScreen');
          })
          .catch((err) => {
            props.loader(false);
            let varVl;
            varVl = updateObject(data, {
              controls: updateObject(data.controls, {
                otp: updateObject(data.controls.otp, {
                  errors: err.message,
                }),
              }),
            });
            setData(varVl);
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

  const onBlurFunc = (type) => {
    let userName = {
      user_name: data.controls.user_name.value,
    };
    OutsideAuthApi()
      .verifyUserName(userName)
      .then((res) => {
        console.log(res.message);
        let varVal = {};
        if (res.message === 'Available') {
          varVal = updateObject(data, {
            controls: updateObject(data.controls, {
              [type]: updateObject(data.controls[type], {
                value: data.controls.user_name.value,
                errors: '',
                valid: true,
              }),
            }),
          });
        } else {
          varVal = updateObject(data, {
            controls: updateObject(data.controls, {
              [type]: updateObject(data.controls[type], {
                value: data.controls.user_name.value,
                errors: res.message,
                valid: false,
              }),
            }),
          });
        }
        setData(varVal);
      })
      .catch((err) => {
        displayResponse(err.message);
      });
  };

  return (
    <LoginLayout headerText="Register" layout={true}>
        <View style={styles.text_footer}>
          <Text style={styles.text_footer}>
            {data.controls.name.elementConfig.text}
          </Text>
          <CommonInput
            placeholder={data.controls.name.elementConfig.placeholder}
            onInputChange={onInputChange}
            onSubmit={() => Keyboard.dismiss()}
            value={data.controls.name.value}
            type={data.controls.name.elementConfig.type}
            isValid={data.controls.name.valid}
            icons={data.controls.name.icons}
            ele={data.controls.name.elementType}
          />
          {data.controls.name.errors ? (
            <Text style={{color: 'red'}}>{data.controls.name.errors}</Text>
          ) : null}
        </View>

      <Text style={[styles.text_footer, {marginTop: 15}]}>
        {data.controls.jobTitle.elementConfig.text}
      </Text>
      <CommonInput
        placeholder={data.controls.jobTitle.elementConfig.placeholder}
        onInputChange={onInputChange}
        onSubmit={() => Keyboard.dismiss()}
        value={data.controls.jobTitle.value}
        type={data.controls.jobTitle.elementConfig.type}
        isValid={data.controls.jobTitle.valid}
        icons={data.controls.jobTitle.icons}
        ele={data.controls.jobTitle.elementType}
      />
      {data.controls.jobTitle.errors ? (
        <Text style={{color: 'red'}}>{data.controls.jobTitle.errors}</Text>
      ) : null}
      <Text style={[styles.text_footer, {marginTop: 15}]}>
        {data.controls.email.elementConfig.text}
      </Text>
      <CommonInput
        placeholder={data.controls.email.elementConfig.placeholder}
        onInputChange={onInputChange}
        onSubmit={() => Keyboard.dismiss()}
        value={data.controls.email.value}
        type={data.controls.email.elementConfig.type}
        isValid={data.controls.email.valid}
        icons={data.controls.email.icons}
        ele={data.controls.email.elementType}
      />
      {data.controls.email.errors ? (
        <Text style={{color: 'red'}}>{data.controls.email.errors}</Text>
      ) : null}

      <Text style={[styles.text_footer, {marginTop: 15}]}>
        {data.controls.password.elementConfig.text}
      </Text>
      <CommonInput
        placeholder={data.controls.password.elementConfig.placeholder}
        onInputChange={onInputChange}
        onSubmit={() => Keyboard.dismiss()}
        value={data.controls.password.value}
        type={data.controls.password.elementConfig.type}
        isValid={data.controls.password.valid}
        icons={data.controls.password.icons}
        ele={data.controls.password.elementType}
      />
      {data.controls.password.errors ? (
        <Text style={{color: 'red'}}>{data.controls.password.errors}</Text>
      ) : null}
      
      <Text style={[styles.text_footer, {marginTop: 15}]}>
        {data.controls.adminPassword.elementConfig.text}
      </Text>
      <CommonInput
        placeholder={data.controls.adminPassword.elementConfig.placeholder}
        onInputChange={onInputChange}
        onSubmit={() => Keyboard.dismiss()}
        value={data.controls.adminPassword.value}
        type={data.controls.adminPassword.elementConfig.type}
        isValid={data.controls.adminPassword.valid}
        icons={data.controls.adminPassword.icons}
        ele={data.controls.adminPassword.elementType}
      />
      {data.controls.adminPassword.errors ? (
        <Text style={{color: 'red'}}>{data.controls.adminPassword.errors}</Text>
      ) : null}

      <View style={styles.button}>
        <ButtonLayout onPress={onSubmit}>Sign Up</ButtonLayout>
        <ButtonLayout
          onPress={() => {
            props.navigation.navigate('LoginScreen');
          }}
          outline>
          Login
        </ButtonLayout>
      </View>
      <ModalLayout
        visable={visible}
        close={() => setVisible(false)}
        title="Verify OTP"
        onPress={onSubmit}
        btnTxt="Submit">
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

export default connect(null, mapDispatchToProps)(RegisterScreen);
