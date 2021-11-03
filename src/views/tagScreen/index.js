import * as React from 'react';
import {
  Alert,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {Avatar, Card, FAB, useTheme} from 'react-native-paper';
import InsideAuthApi from '../../services/inSideAuth';
import {connect} from 'react-redux';

import {displayResponse} from '../../utils';

const TagScreen = (props) => {
  const {colors} = useTheme();
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = React.useState([]);

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
    const unsubscribe = props.navigation.addListener('focus', () => {
      apiCall();
    });

    return unsubscribe;
  }, [props.navigation]);

  React.useEffect(() => {
      apiCall();
  },[])
  const apiCall = () => {
    InsideAuthApi(props.token)
      .GetTagTask()
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
        {data.map((x, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              props.navigation.navigate('EditTaskScreen', {
                projectId: '',
                task_id: x._id,
                status: x.status,
                owner: x.owner,
                my_id: '',
                time: x.time,
                task_d_id: x.task_id,
                name: x.name,
                parentTask: x.parentTask?x.parentTask:0,
                details: x.details?x.details:'',
                start_date: x.start_date?x.start_date:undefined,
                end_date: x.end_date? x.end_date: undefined
              })
            }
            >
            <Card.Title
              title={x.name}
              subtitle={x.details}
              left={() => (
                <Avatar.Text
                  size={45}
                  label={x.name.charAt(0)}
                  style={{paddingBottom: 5}}
                />
              )}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    token: state.auth.access_token,
  };
};
export default connect(mapStateToProps, null)(TagScreen);
