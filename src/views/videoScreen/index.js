import * as React from 'react';
import {ScrollView, RefreshControl, View, Dimensions} from 'react-native';
import Video from 'react-native-video';
import {Title, Paragraph, useTheme} from 'react-native-paper';
import InsideAuthApi from '../../services/inSideAuth';
import {connect} from 'react-redux';
import ButtonLayout from '../../sharedComponents/button';
import {displayResponse,_retrieveData} from '../../utils';

const VideoScreen = (props) => {
  const {colors} = useTheme();
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [role, setrole] = React.useState('');

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
    apiCall();
  }, []);
  const apiCall = async() => {
    const varUser = await _retrieveData('User');
    setrole(JSON.parse(varUser).type);
    InsideAuthApi(props.token)
      .GetTraining()
      .then((res) => {
        setData(res.data);
        displayResponse(res, true);
      })
      .catch((err) => {
        displayResponse(err.message);
      });
  };
  
  return (
    <React.Fragment>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
          <View style={{marginHorizontal: 20}}>
        {role === 'admin'?<ButtonLayout style={{marginVertical: 20}} onPress={()=>props.navigation.navigate('CreateTraining')}>Add A Video</ButtonLayout>:null}

        {data
          .filter((x) => x.type == props.route.params.data)
          .map((x, index) => (
            <View
              key={index}
              style={{
                marginBottom: 20,
                borderColor: 'black', // if you need
                borderWidth: 1,
                overflow: 'hidden',
                shadowColor: 'black',
                shadowRadius: 10,
                shadowOpacity: .8,
              }}>
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
                paused={true}
                fullscreen={true}
                resizeMode="cover"
              />
              <Title style={{marginHorizontal: 20}}>{x.heading}</Title>
              <Paragraph style={{marginHorizontal: 20, marginBottom: 15}}>{x.details}</Paragraph>
            </View>
          ))}
          </View>
      </ScrollView>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    token: state.auth.access_token,
  };
};
export default connect(mapStateToProps, null)(VideoScreen);
