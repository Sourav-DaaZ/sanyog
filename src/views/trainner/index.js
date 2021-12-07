import {Button, View} from 'native-base';
import * as React from 'react';
import {ScrollView, RefreshControl} from 'react-native';
import {useTheme, Text, Card, Avatar} from 'react-native-paper';
import {connect} from 'react-redux';

import * as actions from '../../store/actions';
import {displayResponse, _retrieveData} from '../../utils';
import ButtonLayout from '../../sharedComponents/button';
import InsideAuthApi from '../../services/inSideAuth';

const TrainnerScreen = (props) => {
  const {colors} = useTheme();
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [role, setrole] = React.useState('');

  React.useEffect(() => {
    apiCall();
  }, []);

  const apiCall = async() => {
    const varUser = await _retrieveData('User');
    setrole(JSON.parse(varUser).type);
    props.loader(true);

    InsideAuthApi(props.token)
      .GetTrainer()
      .then(async (res) => {
        props.loader(false);
        displayResponse(res, true);
        setData(res.data);
      })
      .catch((err) => {
        props.loader(false);
        displayResponse(err.message);
      });
  };
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      apiCall();
      setRefreshing(false);
    });
  }, []);

  React.useEffect(() => {
    apiCall();
  }, []);
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      apiCall();
    });

    return unsubscribe;
  }, [props.navigation]);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{flex: 1}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={{marginHorizontal: 20}}>
      {role === 'admin'?<ButtonLayout
          style={{marginVertical: 20}}
          onPress={() => props.navigation.navigate('CreateTrainer')}>
          Add Trainer
        </ButtonLayout>:null}
        {data.map((x, index) => (
          <Card.Title
            key={index}
            title={x.name}
            subtitle={x.place}
            style={{marginBottom: 10}}
            left={(props) => (
              <Avatar.Text size={40} label={x?.name.charAt(0)} />
            )}
            right={(props) => <Text>{x.price} Rs/month</Text>}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    token: state.auth.access_token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loader: (val) => dispatch(actions.loading(val)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrainnerScreen);
