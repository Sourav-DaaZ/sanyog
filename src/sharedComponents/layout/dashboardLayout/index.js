import React, {useEffect, useState} from 'react';
import {View, useWindowDimensions, Text, StatusBar} from 'react-native';
import styles from './style';

import {connect} from 'react-redux';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {_retrieveData} from '../../../utils';
import Loader from '../../loader';
import {useTheme, FAB} from 'react-native-paper';
import AllGroups from '../../../views/allGroups'; 

const DashboardLayout = (props) => {
  const [user, setUser] = useState('');
  const [type, setType] = useState('');
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const {colors} = useTheme();

  useEffect(() => {
    fetchUser();
  }, []);

  const SecondRoute = () => <View style={{flex: 1}} />;

  const fetchUser = async () => {
    const userData = await _retrieveData('Token');
    const userType = await _retrieveData('User');
    setUser(userData);
    setType(userType.type);
  };

  const [routes] = React.useState([
    {key: 'groups', title: 'Dashboard'},
    // {key: 'task', title: 'Play List'}
  ]);
  
  const renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case 'groups':
        return <AllGroups jumpTo={jumpTo} {...props} />;
    }
  };
  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.mainColor} barStyle="light-content" />
      <Loader loading={props.loading} />
      <TabView
        lazy={true}
        indicatorStyle={{backgroundColor: colors.backgroundColor}}
        renderLabel={({route, focused, color}) => (
          <Text style={{color, margin: 8}}>{'hii'}</Text>
        )}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={(prop) => (
          <TabBar
            {...prop}
            style={{backgroundColor: colors.mainColor, height: 55}}
            // renderIcon={this.renderIcon}
            activeColor={colors.backgroundColor}
            labelStyle={{fontSize: 15, fontWeight: 'bold', letterSpacing: 1}}
            indicatorStyle={{
              backgroundColor: colors.backgroundColor,
              height: 3.5,
            }}
          />
        )}
        initialLayout={{width: layout.width}}
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
