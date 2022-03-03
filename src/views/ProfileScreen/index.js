import {View} from 'native-base';
import * as React from 'react';
import {
  Alert,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  Image,
} from 'react-native';
import {Avatar, useTheme, Text} from 'react-native-paper';
import {connect} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonInput from '../../sharedComponents/commonInput';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MenuLayout from '../../sharedComponents/menu';
import styles from './style';
import * as actions from '../../store/actions';
import {_retrieveData, updateObject, displayResponse} from '../../utils';
import ButtonLayout from '../../sharedComponents/button';
import InsideAuthApi from '../../services/inSideAuth';

const ProfileScreen = (props) => {
  const {colors} = useTheme();
  const isFocused = useIsFocused();
  const [image, setImage] = React.useState(null);
  const [data, setData] = React.useState({
    controls: {
      input: {
        elementType: 'input',
        elementConfig: {
          type: 'input',
          text: 'First Name',
          placeholder: 'Enter First Name',
        },
        value: props.name?.fname?props.name.fname:'',
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
          text: 'Last Name',
          placeholder: 'Enter Last Name',
        },
        value: props.name?.lname?props.name.lname:'',
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
    const data1 = {
      fname: data.controls.input.value,
      lname: data.controls.details.value,
    };
    props.nameUpdate(data1);
    props.navigation.goBack();
  };

  console.log(props.img);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={styles.headerText}>Profile</Text>
        <View style={styles.outerBox}>
          <View style={{alignItems: 'center', marginBottom: 30}}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('CameraScreen')}>
              {props.img ? (
                <Image
                  style={{width: 166, height: 158}}
                  source={{uri: props.img}}
                />
              ) : (
                // <Avatar.Image
                //   size={100}
                //   source={{uri: image}}
                // />
                <Avatar.Image
                  size={100}
                  source={require('../../assets/images/user.jpeg')}
                />
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.text_footer}>First Name</Text>
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
          <Text style={[styles.text_footer, {marginTop: 20}]}>Last Name</Text>
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
          <View style={[styles.buttonInput, {marginTop: 20}]}>
            <ButtonLayout onPress={onSearch}>Save</ButtonLayout>
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
    img: state.auth.image,
    name: state.auth.name,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loader: (val) => dispatch(actions.loading(val)),
    nameUpdate: (val) => dispatch(actions.nameUpdate(val)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
