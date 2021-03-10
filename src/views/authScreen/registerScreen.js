import React from 'react';
import {View, TouchableOpacity, Keyboard} from 'react-native';
import {Text} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LoginLayout from '../../sharedComponents/layout/loginLayout';
import {loginStyle as styles} from './style';
import CommonInput from '../../sharedComponents/commonInput';
import {updateObject, validate} from '../../utils';
import Toast from 'react-native-simple-toast';
import { loginApi } from '../../services/outSideAuth';

const RegisterScreen = ({navigation}) => {
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
    },
  });

  const onInputChange = (val, type) => {
    let varVal = {};
    if (!validate(val, {required:true})) {
      varVal = updateObject(data, {
        controls: updateObject(data.controls, {
          [type]: updateObject(data.controls[type], {
            value: val,
            errors: 'this field is required',
          }),
        }),
      });
    }else if (type === 'email' && !validate(val, {isEmail:true})) {
      varVal = updateObject(data, {
        controls: updateObject(data.controls, {
          [type]: updateObject(data.controls[type], {
            value: val,
            errors: 'Please Enter a valid email',
            valid: false
          }),
        }),
      });
    }else if (type === 'password' && !validate(val, {password:true})) {
      varVal = updateObject(data, {
        controls: updateObject(data.controls, {
          [type]: updateObject(data.controls[type], {
            value: val,
            errors: 'Minimum eight characters, at least one letter, one number and one special character',
            valid: false
          }),
        }),
      });
    } else {
      varVal = updateObject(data, {
        controls: updateObject(data.controls, {
          [type]: updateObject(data.controls[type], {
            value: val,
            errors: '',
            valid: true
          }),
        }),
      });
    }
    setData(varVal);
  };

  const onSubmit = () => {
    let isValid = []
    formElementsArray.map((x) => (
      isValid.push(x.config.valid)
    ))
    if(isValid.includes(false)){
      Toast.show('please validate all the fields.');
    }else{
      loginApi().then((response) => {
        console.log(response)
      })
      .catch((err) => {console.log(err);Toast.show(err)});
    }
  }

  const formElementsArray = [];

  for (let key in data.controls) {
    formElementsArray.push({
      id: key,
      config: data.controls[key],
    });
  }
  return (
    <LoginLayout headerText="Welcome">
      {formElementsArray.map((x, index) => (
        <CommonInput
          key={index}
          headerText={x.config.elementConfig.text}
          placeholder={x.config.elementConfig.placeholder}
          onInputChange={onInputChange}
          onSubmit={() => Keyboard.dismiss()}
          value={x.config.value}
          type={x.config.elementConfig.type}
          isValid={x.config.valid}
          validation={x.config.validation}
          className={x.config.className}
          icons={x.config.icons}
          ele={x.config.elementType}
          errors={x.config.errors}
        />
      ))}
      
      <View style={styles.button}>
        <LinearGradient colors={['#08d464', '#01ab9d']} style={styles.signIn}>
          <Text style={[styles.textSign, {color: 'white'}]} onPress={onSubmit}>Login</Text>
        </LinearGradient>
        <TouchableOpacity
          style={[
            styles.signIn,
            {borderColor: '#009387', borderWidth: 1, marginTop: 15},
          ]}
          onPress={()=>{navigation.navigate('LoginScreen')}}>
          <Text style={[styles.textSign, {color: '#009387'}]}>Loged in</Text>
        </TouchableOpacity>
      </View> 
    </LoginLayout>
  );
};

export default RegisterScreen;
