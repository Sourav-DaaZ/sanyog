import {View} from 'native-base';
import * as React from 'react';
import { ScrollView, Keyboard} from 'react-native';
import {useTheme, Text} from 'react-native-paper';
import {connect} from 'react-redux';
import styles from './style';
import CommonInput from '../../sharedComponents/commonInput';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {displayResponse, updateObject} from '../../utils';
import ButtonLayout from '../../sharedComponents/button';
import InsideAuthApi from '../../services/inSideAuth';

const CreateTrainer = (props) => {
  const {colors} = useTheme();
  const [data, setData] = React.useState({
    controls: {
      input: {
        elementType: 'input',
        elementConfig: {
          type: 'input',
          text: 'Name',
          placeholder: 'Enter the Trainer name',
        },
        value: 0,
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
      details: {
        elementType: 'input',
        elementConfig: {
          type: 'details',
          text: 'Place',
          placeholder: 'Enter the Place',
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
      price: {
        elementType: 'input',
        elementConfig: {
          type: 'price',
          text: 'Price',
          placeholder: 'Enter the Price',
        },
        value: 0,
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
      calorie: {
        elementType: 'input',
        elementConfig: {
          type: 'phone',
          text: 'Phone',
          placeholder: 'Enter the Phone Number',
        },
        value: 0,
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

  const onUpdate = () => {
    InsideAuthApi(props.token)
      .EditTrainer({
        "name": data.controls.input.value,
        "place": data.controls.details.value,
        "price": Number(data.controls.price.value),
        "callInfo": data.controls.calorie.value,
        "delete": false,
      })
      .then((res) => {
        props.navigation.goBack();
      })
      .catch((err) => {
        displayResponse(err.message);
      });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={styles.headerText}>Add Trainer</Text>
        <View style={styles.outerBox}>
          <React.Fragment>
            <Text style={styles.text_footer}>Name</Text>
            <View>
              <CommonInput
                placeholder={data.controls.input.elementConfig.placeholder}
                onInputChange={onInputChange}
                onSubmit={() => Keyboard.dismiss()}
                value={data.controls.input.value}
                type={data.controls.input.elementConfig.type}
                isValid={data.controls.input.valid}
                validation={data.controls.input.validation}
                icons={data.controls.input.icons}
                ele={data.controls.input.elementType}
              />
            </View>
          </React.Fragment>
          <React.Fragment>
            <Text style={[styles.text_footer, {marginTop: 20}]}>
            Place
            </Text>
            <View>
              <CommonInput
                placeholder={data.controls.details.elementConfig.placeholder}
                onInputChange={onInputChange}
                onSubmit={() => Keyboard.dismiss()}
                value={data.controls.details.value}
                type={data.controls.details.elementConfig.type}
                isValid={data.controls.details.valid}
                validation={data.controls.details.validation}
                icons={data.controls.details.icons}
                ele={data.controls.details.elementType}
              />
            </View>
          </React.Fragment>
          <React.Fragment>
            <Text style={[styles.text_footer, {marginTop: 20}]}>
            Price
            </Text>
            <View>
              <CommonInput
                placeholder={data.controls.price.elementConfig.placeholder}
                onInputChange={onInputChange}
                onSubmit={() => Keyboard.dismiss()}
                value={data.controls.price.value}
                type={data.controls.price.elementConfig.type}
                isValid={data.controls.price.valid}
                validation={data.controls.price.validation}
                icons={data.controls.price.icons}
                ele={data.controls.price.elementType}
                keyNum={true}
              />
            </View>
          </React.Fragment>
          <React.Fragment>
            <Text style={[styles.text_footer, {marginTop: 20}]}>
            Phone Number
            </Text>
            <View>
              <CommonInput
                placeholder={data.controls.calorie.elementConfig.placeholder}
                onInputChange={onInputChange}
                onSubmit={() => Keyboard.dismiss()}
                value={data.controls.calorie.value}
                type={data.controls.calorie.elementConfig.type}
                isValid={data.controls.calorie.valid}
                validation={data.controls.calorie.validation}
                icons={data.controls.calorie.icons}
                ele={data.controls.calorie.elementType}
              />
            </View>
            <ButtonLayout style={{marginTop: 20}} onPress={onUpdate}>Add</ButtonLayout>
          </React.Fragment>
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    token: state.auth.access_token,
  };
};

export default connect(mapStateToProps, null)(CreateTrainer);
