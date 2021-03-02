import React from 'react';
import {Text} from 'react-native';

const OutsideAuthRoutes = React.lazy(() => import('./outsideAuthRoutes'));
const InsidesideAuthRoutes = React.lazy(() => import('./insideAuthRoutes'));

const RootStackScreen = () => (
  <React.Suspense fallback={<Text>LOADING....</Text>}>
    {1 ? <OutsideAuthRoutes /> : <InsidesideAuthRoutes />}
  </React.Suspense>
);

export default RootStackScreen;
