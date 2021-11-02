import * as React from 'react';
import {
  Alert,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {Avatar, Card, useTheme} from 'react-native-paper';
import InsideAuthApi from '../../services/inSideAuth';
import {connect} from 'react-redux';

import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuLayout from '../../sharedComponents/menu';
import {displayResponse} from '../../utils';

const AllGroups = (props) => {
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

  const apiCall = () => {
    InsideAuthApi(props.token)
      .AllProject()
      .then((res) => {
        console.log(res);
        setData(res.data);
        displayResponse(res, true);
      })
      .catch((err) => {
        displayResponse(err.message);
      });
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {data.map((x, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => props.navigation.navigate('TaskScreen',{
            projectId: x._id,
            owner: x.owner,
          })}>
          <Card.Title
            title={x.name}
            subtitle={x.details}
            left={() => <Avatar.Text size={45} label={x.name.charAt(0)} style={{paddingBottom: 5}} />}
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
  );
};
const mapStateToProps = (state) => {
  return {
    token: state.auth.access_token,
  };
};
export default connect(mapStateToProps, null)(AllGroups);
