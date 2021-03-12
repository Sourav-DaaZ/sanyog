import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LandingScreen from '../views/landingPage';

const RootStack = createStackNavigator();

const InsideAuthRoutes = () => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="LandingScreen" component={LandingScreen} />
  </RootStack.Navigator>
);

export default InsideAuthRoutes;
