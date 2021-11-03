import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DashboardLayout from '../sharedComponents/layout/dashboardLayout';
import {Text, useTheme} from 'react-native-paper';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import DrawerContent from '../sharedComponents/drawer';
import {styles} from './style';
import TaskScreen from '../views/taskScreen';
import CreatTaskScreen from '../views/createTask';
import EditTaskScreen from '../views/editTask';
import SearchScreen from '../views/searchScreen';
import BackBtn from '../sharedComponents/backBtn';

const RootStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const InsideAuthRoutes = () => {
  const {colors} = useTheme();

  const AllComponent = (props) => (
    <RootStack.Navigator>
      <RootStack.Screen
        name="LandingScreen"
        component={DashboardLayout}
        options={() => ({
          headerTitle: () => (
            <Text style={[styles.headerText, {color: colors.backgroundColor}]}>
              Project Management
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
      <RootStack.Screen
        name="TaskScreen"
        component={TaskScreen}
        options={() => ({
          headerTitle: () => (
            <Text style={[styles.headerText, {color: colors.backgroundColor}]}>
              Task List
            </Text>
          ),
          headerStyle: {
            backgroundColor: colors.mainColor,
            borderBottomWidth: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => (
            <BackBtn onClick={() => props.navigation.goBack()} size={35} />
          ),
        })}
      />
      <RootStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={() => ({
          headerTitle: () => (
            <Text
              style={[
                styles.headerText,
                {color: colors.backgroundColor},
              ]}></Text>
          ),
          headerStyle: {
            backgroundColor: colors.mainColor,
            borderBottomWidth: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => (
            <BackBtn onClick={() => props.navigation.goBack()} size={35} />
          ),
        })}
      />
      <RootStack.Screen
        name="CreateTaskScreen"
        component={CreatTaskScreen}
        options={() => ({
          headerTitle: () => (
            <Text
              style={[
                styles.headerText,
                {color: colors.backgroundColor},
              ]}></Text>
          ),
          headerStyle: {
            backgroundColor: colors.mainColor,
            borderBottomWidth: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => (
            <BackBtn onClick={() => props.navigation.goBack()} size={35} />
          ),
        })}
      />
      <RootStack.Screen
        name="EditTaskScreen"
        component={EditTaskScreen}
        options={() => ({
          headerTitle: () => (
            <Text
              style={[
                styles.headerText,
                {color: colors.backgroundColor},
              ]}></Text>
          ),
          headerStyle: {
            backgroundColor: colors.mainColor,
            borderBottomWidth: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => (
            <BackBtn onClick={() => props.navigation.goBack()} size={35} />
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
