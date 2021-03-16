import * as React from 'react';
import {View, useWindowDimensions,Text} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import DashboardLayout from '../../sharedComponents/layout/dashboardLayout';

import {_retrieveData} from '../../utils';

const LandingPage = (props) => {
  const [user, setUser] = React.useState('');
  React.useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const userData = await _retrieveData('Token');
    setUser(userData);
  };

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'First'},
    {key: 'second', title: 'Second'},
  ]);

  const FirstRoute = () => (
    <View style={{flex: 1}} ><Text>{user}</Text></View>
  );

  const SecondRoute = () => (
    <View style={{flex: 1}} />
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });
  return (
    <DashboardLayout>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
    </DashboardLayout>
  );
};

export default LandingPage;