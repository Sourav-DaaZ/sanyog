import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../views/authScreen/loginScreen';
import SplashScreen from '../views/authScreen/SpleshScreen';
import RegisterScreen from '../views/authScreen/registerScreen';

const RootStack = createStackNavigator();

const OutsideAuthRoute = () => (
  <RootStack.Navigator headerMode="none">
    {/* <RootStack.Screen name="SplashScreen" component={SplashScreen} /> */}
    <RootStack.Screen name="LoginScreen" component={LoginScreen} />
    <RootStack.Screen name="RegisterScreen" component={RegisterScreen} />
  </RootStack.Navigator>
);

export default OutsideAuthRoute;
