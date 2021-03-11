import { Picker } from 'native-base';
import React from 'react';
import {View, TextInput} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {styles} from './style';

const CommonInput = (props) => {
  const [dot, setDot] = React.useState(true);
  let inputElement = null;
  switch (props.ele) {
    case 'input':
      inputElement = <View
          style={props.style ? [styles.action, props.style[1]] : styles.action}>
          {/* <FontAwesome name="user-o" color="#05375a" size={20} /> */}
          {props.icons ? props.icons[0] : null}
          <TextInput
            placeholder={props.placeholder}
            style={
              props.style
                ? [styles.textInput, props.style[2]]
                : styles.textInput
            }
            onChangeText={(val) => props.onInputChange(val, props.type)}
            value={props.value}
            onSubmitEditing={() => props.onSubmit()}
            autoCapitalize="none"
          />
          {props.isValid ? (props.icons ? props.icons[1] : null) : null}
        </View>;
      break;
    case 'password':
      inputElement = <View
          style={props.style ? [styles.action, props.style[1]] : styles.action}>
          {props.icons ? props.icons[0] : null}
          <TextInput
            placeholder={props.placeholder}
            style={
              props.style
                ? [styles.textInput, props.style[2]]
                : styles.textInput
            }
            onChangeText={(val) => props.onInputChange(val, props.type)}
            value={props.value}
            onSubmitEditing={() => props.onSubmit()}
            autoCapitalize="none"
            secureTextEntry={dot}
          />
          <Feather
            name={dot ? 'eye-off' : 'eye'}
            color="gray"
            size={20}
            onPress={() => setDot(!dot)}
          />
        </View>;
      break;
      case 'select': 
        inputElement =  <Picker
        note
        mode="dropdown"
        style={{ width: '100%', height: 30 }}
        selectedValue={props.value}
        onValueChange={(val)=>props.onSelect(val,props.type)}
      >
        <Picker.Item label={props.placeholder} value="" disabled/>
        {props.options.map( (s, i) => {
            return <Picker.Item key={i} value={s} label={s} />
        })}
      </Picker>
  }
  return (
      inputElement
  );
};

export default CommonInput;
