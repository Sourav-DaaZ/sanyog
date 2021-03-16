import React, {useEffect, useState} from 'react';
import {View, useWindowDimensions, Text, StatusBar} from 'react-native';
import styles from './style';

import {connect} from 'react-redux';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {_retrieveData} from '../../../utils';
import Geolocation from '@react-native-community/geolocation';
import {useTheme} from 'react-native-paper';
import {FAB} from 'react-native-paper';

const DashboardLayout = () => {
  const [user, setUser] = useState('');
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const {colors} = useTheme();

  useEffect(() => {
    fetchUser();
  }, []);

  const FirstRoute = () => (
    <View style={{flex: 1}}>
      <Text>{user}</Text>
    </View>
  );

  const SecondRoute = () => <View style={{flex: 1}} />;

  const fetchUser = async () => {
    const userData = await _retrieveData('Token');
    setUser(userData);
  };

  const [routes] = React.useState([
    {key: 'first', title: 'First'},
    {key: 'second', title: 'Second'},
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.mainColor} barStyle="light-content" />
      <TabView
        lazy
        indicatorStyle={{backgroundColor: '#000000'}}
        tabStyle={{backgroundColor: 'black', minHeight: 30}} // here
        renderLabel={({route, focused, color}) => (
          <Text style={{color, margin: 8}}>{'hii'}</Text>
        )}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            // renderIcon={
            //     props => getTabBarIcon(props)
            // }
            style={{backgroundColor: colors.mainColor, height: 50}}
            // renderIcon={this.renderIcon}
            activeColor={colors.backgroundColor}
            labelStyle={{fontSize: 15, fontWeight: 'bold', letterSpacing: 1}}
            indicatorStyle={{
              backgroundColor: colors.backgroundColor,
              height: 2.5,
            }}
          />
        )}
        initialLayout={{width: layout.width}}
      />
      <FAB
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
          backgroundColor: colors.mainColor
        }}
        icon="plus"
        onPress={() => console.log('Pressed')}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
  };
};

export default connect(mapStateToProps, null)(DashboardLayout);
