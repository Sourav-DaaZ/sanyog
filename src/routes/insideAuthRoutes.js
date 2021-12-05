import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DashboardLayout from '../sharedComponents/layout/dashboardLayout';
import {Text, useTheme} from 'react-native-paper';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import DrawerContent from '../sharedComponents/drawer';
import {styles} from './style';
import EditRegularUpdate from '../views/editRegularUpdate';
import ChatScreen from '../views/chatScreen';
import TrainnerScreen from '../views/trainner';
import AllChatScreen from '../views/allChatScreen';
import VideoScreen from '../views/videoScreen';
import SearchScreen from '../views/searchScreen';
import CreateTrainer from '../views/createTrainer';
import CreateTraining from '../views/createTraining';
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
              GETFIT
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
          headerRight: () => (
            <MaterialIcons 
              name = 'chat'
              color={colors.backgroundColor}
              style={{marginRight: 15}}
              size={30}
              onPress={()=>props.navigation.navigate('ChatScreen')} />
          )
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
        name="TrainnerScreen"
        component={TrainnerScreen}
        options={() => ({
          headerTitle: () => (
            <Text
              style={[
                styles.headerText,
                {color: colors.backgroundColor},
              ]}>Trainner</Text>
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
        name="VideoScreen"
        component={VideoScreen}
        options={() => ({
          headerTitle: () => (
            <Text
              style={[
                styles.headerText,
                {color: colors.backgroundColor},
              ]}>Video</Text>
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
        name="RegularUpdate"
        component={EditRegularUpdate}
        options={() => ({
          headerTitle: () => (
            <Text
              style={[
                styles.headerText,
                {color: colors.backgroundColor},
              ]}>Info Update</Text>
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
        name="AllChatScreen"
        component={AllChatScreen}
        options={() => ({
          headerTitle: () => (
            <Text
              style={[
                styles.headerText,
                {color: colors.backgroundColor},
              ]}>Chats</Text>
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
        name="ChatScreen"
        component={ChatScreen}
        options={() => ({
          headerTitle: () => (
            <Text
              style={[
                styles.headerText,
                {color: colors.backgroundColor},
              ]}>Admin</Text>
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
        name="CreateTraining"
        component={CreateTraining}
        options={() => ({
          headerTitle: () => (
            <Text
              style={[
                styles.headerText,
                {color: colors.backgroundColor},
              ]}>Add Video</Text>
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
        name="CreateTrainer"
        component={CreateTrainer}
        options={() => ({
          headerTitle: () => (
            <Text
              style={[
                styles.headerText,
                {color: colors.backgroundColor},
              ]}>Add Trainer</Text>
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
