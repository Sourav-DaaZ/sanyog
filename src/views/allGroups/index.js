import * as React from 'react';
import {
  Dimensions,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  useTheme,
  Avatar,
  Button,
} from 'react-native-paper';
import Video from 'react-native-video';
import ButtonLayout from '../../sharedComponents/button';
import InsideAuthApi from '../../services/inSideAuth';
import {connect} from 'react-redux';

import {displayResponse} from '../../utils';
import {View} from 'native-base';

const AllGroups = (props) => {
  const {colors} = useTheme();
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [trainer, setTrainer] = React.useState([]);
  const [training, setTraining] = React.useState([]);

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

  const apiCall = () => {
    InsideAuthApi(props.token)
      .UserData()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        displayResponse(err.message);
      });
    InsideAuthApi(props.token)
      .GetTrainer()
      .then((res) => {
        setTrainer(res.data);
      })
      .catch((err) => {
        displayResponse(err.message);
      });
    InsideAuthApi(props.token)
      .GetTraining()
      .then((res) => {
        setTraining(res.data);
      })
      .catch((err) => {
        displayResponse(err.message);
      });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={{backgroundColor: '#f0f8ff3b', paddingHorizontal: 20}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Title style={{fontSize: 20, marginVertical: 20}}>
        Hello {data.name}
      </Title>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('RegularUpdate')}>
          <Card style={{flex: 1, marginRight: 10, width: (Dimensions.get('window').width / 2) - 15}}>
            <Card.Content>
              <Title>Water Taken</Title>
              <Paragraph>{data.waterInfo}</Paragraph>
            </Card.Content>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('RegularUpdate')}>
          <Card style={{flex: 1, width: (Dimensions.get('window').width / 2) - 15}}>
            <Card.Content>
              <Title>Calories Taken </Title>
              <Paragraph>{data.calInfo}</Paragraph>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      </View>
      <View style={{backgroundColor: 'white', marginTop: 20}}>
        <Card.Title
          title="All Trainers"
          style={{borderBottomWidth: 1, borderBottomColor: colors.mainColor}}
          right={() => (
            <ButtonLayout
              outline
              style={{width: 50}}
              onPress={() => props.navigation.navigate('TrainnerScreen')}>
              Vew
            </ButtonLayout>
          )}
        />
        {trainer.map((x, index) =>
          index < 2 ? (
            <Card.Title
              key={index}
              title={x.name}
              style={{marginBottom: 10}}
              left={(props) => (
                <Avatar.Text size={40} label={x?.name.charAt(0)} />
              )}
            />
          ) : null,
        )}
      </View>
      <View style={{backgroundColor: 'white', marginTop: 20}}>
        {training.filter((x) => x.type == 'm').length ? (
          <Card.Title
            title="Meditation"
            style={{borderBottomWidth: 1, borderBottomColor: colors.mainColor}}
            right={() => (
              <ButtonLayout
                outline
                style={{width: 50}}
                onPress={() =>
                  props.navigation.navigate('VideoScreen', {
                    data: 'm',
                  })
                }>
                Vew
              </ButtonLayout>
            )}
          />
        ) : null}
        {training
          .filter((x) => x.type == 'm')
          .map((x, index) =>
            index < 2 ? (
              <View key={index} style={{marginTop: 10}}>
                <Video
                  source={{uri: x.url}}
                  style={{
                    alignItems: 'center',
                    flex: 1,
                    justifyContent: 'center',
                    width: Dimensions.get('window').width,
                    height: 200,
                    backgroundColor: 'black',
                  }}
                  controls={true}
                  controls={true}
                  paused={false}
                  fullscreen={true}
                  resizeMode="cover"
                />
                <Title>{x.heading}</Title>
                <Paragraph>{x.details}</Paragraph>
              </View>
            ) : null,
          )}
      </View>
      <View style={{backgroundColor: 'white', marginTop: 20}}>
        {training.filter((x) => x.type != 'm').length ? (
          <Card.Title
            title="Workout"
            style={{borderBottomWidth: 1, borderBottomColor: colors.mainColor}}
            right={() => (
              <ButtonLayout
                outline
                style={{width: 50}}
                onPress={() =>
                  props.navigation.navigate('VideoScreen', {
                    data: 'w',
                  })
                }>
                Vew
              </ButtonLayout>
            )}
          />
        ) : null}
        {training
          .filter((x) => x.type != 'm')
          .map((x, index) =>
            index < 2 ? (
              <View key={index} style={{marginTop: 10}}>
                <Video
                  source={{uri: x.url}}
                  style={{
                    alignItems: 'center',
                    flex: 1,
                    justifyContent: 'center',
                    width: Dimensions.get('window').width,
                    height: 200,
                    backgroundColor: 'black',
                  }}
                  controls={true}
                  controls={true}
                  paused={false}
                  fullscreen={true}
                  resizeMode="cover"
                />
                <Title>{x.heading}</Title>
                <Paragraph>{x.details}</Paragraph>
              </View>
            ) : null,
          )}
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.access_token,
  };
};

export default connect(mapStateToProps, null)(AllGroups);
