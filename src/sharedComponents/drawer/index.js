import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import {Drawer} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import * as actions from '../../store/actions';
import {styles} from './style';

const DrawerContent = (props) => {
  const {colors} = useTheme();
  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundColor}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image
                source={{
                  uri:
                    'https://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder.png',
                }}
                size={50}
              />
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={styles.title}>User</Title>
              </View>
            </View>
          </View>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({color, size}) => (
              <Icon name={'home-outline'} color={color} size={size} />
            )}
            label="Home"
            onPress={() => props.navigation.navigate('LandingScreen')}
          />
        </Drawer.Section>
        {/* <Drawer.Section title="Prefarence">
          <TouchableRipple title={'Prefarence'}>
            <View style={styles.preference}>
              <Text>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch value={true} />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section> */}
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDraweeSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name={'exit-to-app'} color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {
            props.updateAccessToken('');
            // props.navigation.navigate('LoginScreen');
          }}
        />
      </Drawer.Section>
      {/* <Text>hi</Text> */}
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateAccessToken: (data) => dispatch(actions.accessTokenUpdate(data)),
  };
};

export default connect(null, mapDispatchToProps)(DrawerContent);
