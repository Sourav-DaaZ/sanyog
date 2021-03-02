import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../views/authScreen/SpleshScreen';

const RootStack = createStackNavigator();

const InsideAuthRoutes = () => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="SplashScreen" component={SplashScreen} />
  </RootStack.Navigator>
);

export default InsideAuthRoutes;
