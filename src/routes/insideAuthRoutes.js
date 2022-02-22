import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Dashboard from '../views/Dashboard';
import {Text, useTheme} from 'react-native-paper';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import DrawerContent from '../sharedComponents/drawer';
import {styles} from './style';

const RootStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const InsideAuthRoutes = () => {
  const {colors} = useTheme();

  const AllComponent = (props) => (
    <RootStack.Navigator>
      <RootStack.Screen
        name="LandingScreen"
        component={Dashboard}
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
          )
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
