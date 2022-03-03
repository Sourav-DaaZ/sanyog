import {View} from 'native-base';
import * as React from 'react';
import {Alert, ScrollView, TouchableOpacity, Keyboard} from 'react-native';
import {Avatar, useTheme, Text} from 'react-native-paper';
import {connect} from 'react-redux';

import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonInput from '../../sharedComponents/commonInput';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import styles from './style';
import * as actions from '../../store/actions';
import {displayResponse, updateObject} from '../../utils';
import ButtonLayout from '../../sharedComponents/button';

const AddressScreen = (props) => {
  const {colors} = useTheme();
  const [data, setData] = React.useState({
    controls: {
      card: {
        elementType: 'input',
        elementConfig: {
          type: 'card',
          text: 'Address',
          placeholder: 'Enter Your Full Address',
        },
        value: props.address?props.address:'',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        errors: '',
        className: [],
        icons: [
          <FontAwesome name="home" color="#05375a" size={20} />,
          <Feather name="check-circle" color="green" size={20} />,
        ],
      }
    },
  });

  const onInputChange = (val, type) => {
    let varVal = {};
    varVal = updateObject(data, {
      controls: updateObject(data.controls, {
        [type]: updateObject(data.controls[type], {
          value: val,
          errors: '',
          valid: false,
        }),
      }),
    });
    setData(varVal);
  };
  const onSearch = () => {
    props.loader(true);
    props.addressUpdate(data.controls.card.value);
    props.navigation.goBack();
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={styles.headerText}>Address Details</Text>
        <View style={styles.outerBox}>

          <Text style={styles.text_footer}>Address</Text>
          <View>
            <CommonInput
              placeholder={data.controls.card.elementConfig.placeholder}
              onInputChange={onInputChange}
              onSubmit={() => Keyboard.dismiss()}
              value={data.controls.card.value}
              type={data.controls.card.elementConfig.type}
              isValid={data.controls.card.valid}
              validation={data.controls.card.validation}
              icons={data.controls.card.icons}
              ele={data.controls.card.elementType}
            />
           </View>
          
          <View style={[styles.buttonInput,{marginTop: 20}]}>
            <ButtonLayout onPress={onSearch}>Save</ButtonLayout>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    token: state.auth.access_token,
    address: state.auth.address,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loader: (val) => dispatch(actions.loading(val)),
    addressUpdate: (val) => dispatch(actions.addressUpdate(val)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddressScreen);
