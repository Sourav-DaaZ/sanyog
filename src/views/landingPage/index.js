import React, {useEffect, useState} from 'react';
import {Text} from 'react-native-paper';
import DashboardLayout from '../../sharedComponents/layout/dashboardLayout';
import {_retrieveData} from '../../utils';

const LandingPage = (props) => {
  const [user, setUser] = useState('');
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const userData = await _retrieveData('Token');
    setUser(userData);
  };
  return (
    <DashboardLayout>
      <Text>{user}</Text>
    </DashboardLayout>
  );
};

export default LandingPage;
