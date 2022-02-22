import React from 'react';
import {Text} from 'react-native-paper';
import {_retrieveData} from '../utils';

const InsidesideAuthRoutes = React.lazy(() => import('./insideAuthRoutes'));

const RootStackScreen = (props) => {

  return (
    <React.Suspense fallback={<Text>LOADING....</Text>}>
      <InsidesideAuthRoutes />
    </React.Suspense>
  );
};

export default RootStackScreen;
