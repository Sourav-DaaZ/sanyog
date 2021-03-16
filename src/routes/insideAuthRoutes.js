import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DashboardLayout from '../sharedComponents/layout/dashboardLayout';
import {Text, View} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from 'react-native-paper';
import MenuLayout from '../sharedComponents/menu';

const RootStack = createStackNavigator();

const InsideAuthRoutes = (props) => {
  const {colors} = useTheme();

  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="LandingScreen"
        component={DashboardLayout}
        options={() => ({
          headerTitle: () => (
            <Text style={{color: colors.backgroundColor, fontSize: 20,fontWeight: 'bold', letterSpacing: 1}}>
              Sanyog
            </Text>
          ),
          headerStyle: {
            backgroundColor: colors.mainColor,
            height: 60
          },
          headerRight: () => (
            <View>
              <MenuLayout
                terget={
                  <MaterialIcons
                    name="dots-vertical"
                    color={colors.backgroundColor}
                    style={{marginRight: 5}}
                    size={30}
                  />
                }
                menuOption={[{text: 'enter', function: () => alert(`Save`)}]}
              />
            </View>
          ),
        })}
      />
    </RootStack.Navigator>
  );
};

export default InsideAuthRoutes;
