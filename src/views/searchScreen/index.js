import {View} from 'native-base';
import * as React from 'react';
import {
  Alert,
  ScrollView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {Avatar, Card, useTheme, Text} from 'react-native-paper';

import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonInput from '../../sharedComponents/commonInput';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MenuLayout from '../../sharedComponents/menu';
import styles from './style';
import {updateObject} from '../../utils';
import ButtonLayout from '../../sharedComponents/button';

const SearchScreen = (props) => {
  const {colors} = useTheme();
  const [data, setData] = React.useState({
    controls: {
      input: {
        elementType: 'input',
        elementConfig: {
          type: 'input',
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
  const onSearch = (x) => {
    console.log(x);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={styles.headerText}>Search User</Text>
        <View style={styles.outerBox}>
          <Text style={styles.text_footer}>Enter User Name</Text>
          <View style={styles.inlineInput}>
            <View style={styles.inputField}>
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
            <View style={styles.buttonInput}>
              <ButtonLayout onPress={onSearch}>Search</ButtonLayout>
            </View>
          </View>
          {data.controls.input.errors ? (
            <Text style={{color: 'red'}}>{data.controls.input.errors}</Text>
          ) : null}
          <Text style={styles.bottomText}>Search Result</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ChatScreen')}>
            <Card.Title
              title="Card Title"
              subtitle="Card Subtitle"
              onPress={() => Alert.alert('hi')}
              left={() => <Avatar.Icon size={45} icon="folder" />}
              right={() => (
                <MenuLayout
                  terget={
                    <MaterialIcons
                      name="dots-vertical"
                      color={colors.iconColor}
                      style={{marginRight: 5}}
                      size={30}
                    />
                  }
                  menuOption={[{text: 'enter', function: () => alert(`Save`)}]}
                />
              )}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SearchScreen;
