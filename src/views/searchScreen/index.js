import {View} from 'native-base';
import * as React from 'react';
import {Alert, ScrollView, TouchableOpacity, Keyboard} from 'react-native';
import {Avatar, Card, useTheme, Text} from 'react-native-paper';
import {connect} from 'react-redux';

import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonInput from '../../sharedComponents/commonInput';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MenuLayout from '../../sharedComponents/menu';
import styles from './style';
import * as actions from '../../store/actions';
import {displayResponse, updateObject} from '../../utils';
import ButtonLayout from '../../sharedComponents/button';
import InsideAuthApi from '../../services/inSideAuth';

const SearchScreen = (props) => {
  const {colors} = useTheme();
  const [data, setData] = React.useState({
    controls: {
      input: {
        elementType: 'input',
        elementConfig: {
          type: 'input',
          text: 'Name',
          placeholder: 'Enter project name',
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
      details: {
        elementType: 'input',
        elementConfig: {
          type: 'details',
          text: 'Description',
          placeholder: 'Enter project description',
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
    let varVl;
    let datas = {
      "name": data.controls.input.value,
      "details": data.controls.details.value,
    }
    InsideAuthApi(props.token)
      .CreateProject(datas)
      .then(async (res) => {
        props.loader(false);
        displayResponse(res, true);
        props.navigation.navigate('LandingScreen');
      })
      .catch((err) => {
        props.loader(false);
        varVl = updateObject(data, {
          controls: updateObject(data.controls, {
            input: updateObject(data.controls.input, {
              errors: err.message,
            }),
          }),
        });
        setData(varVl);
      });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={styles.headerText}>Create Project</Text>
        <View style={styles.outerBox}>
          <Text style={styles.text_footer}>Enter Project Name</Text>
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
          <Text style={[styles.text_footer,{marginTop: 20}]}>Enter Project description</Text>
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
          <View style={[styles.buttonInput,{marginTop: 20}]}>
            <ButtonLayout onPress={onSearch}>Create Project</ButtonLayout>
          </View>
          {data.controls.input.errors ? (
            <Text style={{color: 'red'}}>{data.controls.input.errors}</Text>
          ) : null}
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
const mapDispatchToProps = (dispatch) => {
  return {
    loader: (val) => dispatch(actions.loading(val))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
