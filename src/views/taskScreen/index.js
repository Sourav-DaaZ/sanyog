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

const TaskScreen = (props) => {
  const {colors} = useTheme();
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [owner, setOwner] = React.useState([]);

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

  const apiCall = () => {
    InsideAuthApi(props.token)
      .AllTask(props.route.params.projectId)
      .then((res) => {
        console.log(res);
        setData(res.data.data);
        setOwner(res.data.owner)
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
                projectId: props.route.params.projectId,
                task_id: x._id,
                status: x.status,
                owner: x.owner,
                my_id: owner,
                time: x.time,
                task_d_id: x.task_id,
                name: x.name,
                parentTask: x.parentTask?x.parentTask:0,
                details: x.details?x.details:'',
                start_date: x.start_date?x.start_date:undefined,
                end_date: x.end_date? x.end_date: undefined
              })
            }>
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
              // right={() => (
              //   <MenuLayout
              //     terget={
              //       <MaterialIcons
              //         name="dots-vertical"
              //         color={colors.iconColor}
              //         style={{marginRight: 5}}
              //         size={30}
              //       />
              //     }
              //     menuOption={[{text: 'enter', function: () => alert(`Save`)}]}
              //   />
              // )}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      {String(owner) == String(props.route.params.owner)?<FAB
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
          backgroundColor: colors.mainColor,
        }}
        icon="plus"
        onPress={() =>
          props.navigation.navigate('CreateTaskScreen', {
            projectId: props.route.params.projectId,
          })
        }
      />:null}
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    token: state.auth.access_token,
  };
};
export default connect(mapStateToProps, null)(TaskScreen);
