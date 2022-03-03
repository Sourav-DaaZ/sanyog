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

const PaymentScreen = (props) => {
  const {colors} = useTheme();
  const [data, setData] = React.useState({
    controls: {
      card: {
        elementType: 'input',
        elementConfig: {
          type: 'card',
          text: 'Card Number',
          placeholder: 'Enter Your Card Number',
        },
        value: props.payment?.num?props.payment.num:'',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        errors: '',
        className: [],
        icons: [
          <FontAwesome name="paypal" color="#05375a" size={20} />,
          <Feather name="check-circle" color="green" size={20} />,
        ],
      },
      date: {
        elementType: 'input',
        elementConfig: {
          type: 'date',
          text: 'expiry',
          placeholder: 'Expiry time',
        },
        value: props.payment?.date?props.payment.date:'',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        errors: '',
        className: [],
        icons: [
          <FontAwesome name="calendar-o" color="#05375a" size={20} />,
          <Feather name="check-circle" color="green" size={20} />,
        ],
      },
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
    const data1 = {
      num: data.controls.card.value,
      date: data.controls.date.value
    }
    props.paymentUpdate(data1);
    props.navigation.goBack();
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={styles.headerText}>Card Details</Text>
        <View style={styles.outerBox}>

          <Text style={styles.text_footer}>Card Number</Text>
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
          <Text style={[styles.text_footer,{marginTop: 20}]}>Expiry Time</Text>
          <View>
            <CommonInput
              placeholder={data.controls.date.elementConfig.placeholder}
              onInputChange={onInputChange}
              onSubmit={() => Keyboard.dismiss()}
              value={data.controls.date.value}
              type={data.controls.date.elementConfig.type}
              isValid={data.controls.date.valid}
              validation={data.controls.date.validation}
              icons={data.controls.date.icons}
              ele={data.controls.date.elementType}
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
    payment: state.auth.payment,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loader: (val) => dispatch(actions.loading(val)),
    paymentUpdate: (val) => dispatch(actions.paymentUpdate(val)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PaymentScreen);
