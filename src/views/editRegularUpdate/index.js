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

const EditRegularUpdate = (props) => {
  const {colors} = useTheme();
  const [data, setData] = React.useState({
    controls: {
      input: {
        elementType: 'input',
        elementConfig: {
          type: 'input',
          text: 'Water Update',
          placeholder: 'Enter the amount that you took',
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
          text: 'Calorie Update',
          placeholder: 'Enter the amount that you took',
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
      .RegularUpdate({
        "waterInfo": Number(data.controls.input.value),
        "calInfo": Number(data.controls.details.value)
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
        <Text style={styles.headerText}>Details Update</Text>
        <View style={styles.outerBox}>
          <React.Fragment>
            <Text style={styles.text_footer}>Total Water</Text>
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
                keyNum={true}
              />
            </View>
          </React.Fragment>
          <React.Fragment>
            <Text style={[styles.text_footer, {marginTop: 20}]}>
            Total Calorie
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
                keyNum={true}
              />
            </View>
            <ButtonLayout style={{marginTop: 20}} onPress={onUpdate}>Update</ButtonLayout>
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

export default connect(mapStateToProps, null)(EditRegularUpdate);
