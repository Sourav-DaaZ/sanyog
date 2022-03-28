import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Dashboard from '../views/Dashboard';
import ProfileScreen from '../views/ProfileScreen';
import PaymentScreen from '../views/PaymentScreen';
import ShopScreen from '../views/ShopScreen';
import AllShopScreen from '../views/AllShopScreen';
import SingleShopScreen from '../views/SingleShopScreen';
import RiderScreen from '../views/RiderScreen';
import OrderScreen from '../views/OrderScreen';
import AddressScreen from '../views/AddressScreen';

import {Text, useTheme} from 'react-native-paper';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import DrawerContent from '../sharedComponents/drawer';
import {styles} from './style';
import Camera from '../views/Camera';

const RootStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const InsideAuthRoutes = () => {
  const {colors} = useTheme();

  const AllComponent = (props) => (
    <RootStack.Navigator>
      <RootStack.Screen
        name="MapScreen"
        component={Dashboard}
        options={() => ({
          headerTitle: () => (
            <Text style={[styles.headerText, {color: colors.backgroundColor}]}>
              Current Address
            </Text>
          ),
          headerStyle: {
            backgroundColor: colors.mainColor,
            borderBottomWidth: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => null,
        })}
      />
      <RootStack.Screen
        name="LandingScreen"
        component={SingleShopScreen}
        options={() => ({
          headerTitle: () => (
            <Text style={[styles.headerText, {color: colors.backgroundColor}]}>
              Grocery App
            </Text>
          ),
          headerStyle: {
            backgroundColor: colors.mainColor,
            borderBottomWidth: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => (
            <MaterialIcons
              name="menu"
              color={colors.backgroundColor}
              style={{marginLeft: 15}}
              size={30}
              onPress={() => props.navigation.openDrawer()}
            />
          ),
        })}
      />
      <RootStack.Screen
        name="ShopScreen"
        component={ShopScreen}
        options={() => ({
          headerTitle: () => (
            <Text style={[styles.headerText, {color: colors.backgroundColor}]}>
              Cart Details
            </Text>
          ),
          headerStyle: {
            backgroundColor: colors.mainColor,
            borderBottomWidth: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => (
            <MaterialIcon
              name="arrow-back"
              color={colors.backgroundColor}
              style={{marginLeft: 15}}
              size={30}
              onPress={() => props.navigation.goBack()}
            />
          ),
        })}
      />
      <RootStack.Screen
        name="CameraScreen"
        component={Camera}
        options={() => ({
          headerTitle: () => (
            <Text style={[styles.headerText, {color: colors.backgroundColor}]}>
              Camera
            </Text>
          ),
          headerStyle: {
            backgroundColor: colors.mainColor,
            borderBottomWidth: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => (
            <MaterialIcon
              name="arrow-back"
              color={colors.backgroundColor}
              style={{marginLeft: 15}}
              size={30}
              onPress={() => props.navigation.goBack()}
            />
          ),
        })}
      />
      <RootStack.Screen
        name="RiderScreen"
        component={RiderScreen}
        options={() => ({
          headerTitle: () => (
            <Text style={[styles.headerText, {color: colors.backgroundColor}]}>
              Rider Details
            </Text>
          ),
          headerStyle: {
            backgroundColor: colors.mainColor,
            borderBottomWidth: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => (
            <MaterialIcon
              name="arrow-back"
              color={colors.backgroundColor}
              style={{marginLeft: 15}}
              size={30}
              onPress={() => props.navigation.navigate('ShopScreen')}
            />
          ),
        })}
      />
      <RootStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={() => ({
          headerTitle: () => (
            <Text style={[styles.headerText, {color: colors.backgroundColor}]}>
              Profile
            </Text>
          ),
          headerStyle: {
            backgroundColor: colors.mainColor,
            borderBottomWidth: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => (
            <MaterialIcon
              name="arrow-back"
              color={colors.backgroundColor}
              style={{marginLeft: 15}}
              size={30}
              onPress={() => props.navigation.goBack()}
            />
          ),
        })}
      />
      <RootStack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={() => ({
          headerTitle: () => (
            <Text style={[styles.headerText, {color: colors.backgroundColor}]}>
              Payment Details
            </Text>
          ),
          headerStyle: {
            backgroundColor: colors.mainColor,
            borderBottomWidth: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => (
            <MaterialIcon
              name="arrow-back"
              color={colors.backgroundColor}
              style={{marginLeft: 15}}
              size={30}
              onPress={() => props.navigation.goBack()}
            />
          ),
        })}
      />
      <RootStack.Screen
        name="OrderScreen"
        component={OrderScreen}
        options={() => ({
          headerTitle: () => (
            <Text style={[styles.headerText, {color: colors.backgroundColor}]}>
              Order Details
            </Text>
          ),
          headerStyle: {
            backgroundColor: colors.mainColor,
            borderBottomWidth: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => (
            <MaterialIcon
              name="arrow-back"
              color={colors.backgroundColor}
              style={{marginLeft: 15}}
              size={30}
              onPress={() => props.navigation.goBack()}
            />
          ),
        })}
      />
      <RootStack.Screen
        name="AddressScreen"
        component={AddressScreen}
        options={() => ({
          headerTitle: () => (
            <Text style={[styles.headerText, {color: colors.backgroundColor}]}>
              Address Details
            </Text>
          ),
          headerStyle: {
            backgroundColor: colors.mainColor,
            borderBottomWidth: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => (
            <MaterialIcon
              name="arrow-back"
              color={colors.backgroundColor}
              style={{marginLeft: 15}}
              size={30}
              onPress={() => props.navigation.goBack()}
            />
          ),
        })}
      />
    </RootStack.Navigator>
  );

  return (
    <Drawer.Navigator
      lazy={true}
      initialRouteName="Home"
      screenOptions={{headerShown: false}}
      drawerStyle={{backgroundColor: 'black'}}
      drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="HomeDrawer" component={AllComponent} />
    </Drawer.Navigator>
  );
};

export default InsideAuthRoutes;
