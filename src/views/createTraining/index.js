import {View} from 'native-base';
import * as React from 'react';
import {ScrollView, Keyboard} from 'react-native';
import {useTheme, Text, RadioButton} from 'react-native-paper';
import {connect} from 'react-redux';
import styles from './style';
import CommonInput from '../../sharedComponents/commonInput';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {displayResponse, updateObject} from '../../utils';
import ButtonLayout from '../../sharedComponents/button';
import InsideAuthApi from '../../services/inSideAuth';

const CreateTraining = (props) => {
  const {colors} = useTheme();
  const [data, setData] = React.useState({
    controls: {
      input: {
        elementType: 'input',
        elementConfig: {
          type: 'input',
          text: 'Name',
          placeholder: 'Enter the Video name',
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
          text: 'Details',
          placeholder: 'Enter the Details',
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
          text: 'Url',
          placeholder: 'Enter the Url',
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
      calorie: {
        elementType: 'input',
        elementConfig: {
          type: 'calorie',
          text: 'Type',
          placeholder: 'Enter the Type',
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
    },
  });

  const onInputChange = (val, type) => {
    console.log(val, type)
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
      .AddTraining({
        heading: data.controls.input.value,
        details: data.controls.details.value,
        url: data.controls.price.value,
        type: data.controls.calorie.value,
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
        <Text style={styles.headerText}>Add A Video</Text>
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
            <Text style={[styles.text_footer, {marginTop: 20}]}>Details</Text>
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
            <Text style={[styles.text_footer, {marginTop: 20}]}>URL</Text>
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
              />
            </View>
          </React.Fragment>
          <React.Fragment>
            <Text style={[styles.text_footer, {marginTop: 20}]}>Type</Text>
            <View style={{flexDirection: 'row'}}>
              <RadioButton
                value="Meditation"
                status={
                  data.controls.calorie.value == 'm' ? 'checked' : 'unchecked'
                }
                onPress={() => onInputChange('m', 'calorie')}
              />
              <Text style={{marginTop: 7, marginRight: 50}}>Meditation</Text>
              <RadioButton
                value="Workout"
                status={
                  data.controls.calorie.value == 'w' ? 'checked' : 'unchecked'
                }
                onPress={() => onInputChange('w', 'calorie')}
              />
              <Text style={{marginTop: 7}}>Workout</Text>
            </View>
            <ButtonLayout style={{marginTop: 20}} onPress={onUpdate}>
              Add
            </ButtonLayout>
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

export default connect(mapStateToProps, null)(CreateTraining);
