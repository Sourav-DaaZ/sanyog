import {Button, View} from 'native-base';
import * as React from 'react';
import {ScrollView, Keyboard} from 'react-native';
import {useTheme, Text, Card, Avatar} from 'react-native-paper';
import {connect} from 'react-redux';

import * as actions from '../../store/actions';
import {displayResponse} from '../../utils';
import ButtonLayout from '../../sharedComponents/button';
import InsideAuthApi from '../../services/inSideAuth';

const AllChatScreen = (props) => {
  const {colors} = useTheme();
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    props.loader(true);

    InsideAuthApi(props.token)
      .GetChats()
      .then(async (res) => {
        props.loader(false);
        displayResponse(res, true);
        setData(res.data);
      })
      .catch((err) => {
        props.loader(false);
        displayResponse(err.message);
      });
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{flex: 1}}>
      <View>
        {data.map((x, index) => (
          <Card.Title
            key={index}
            title={'user '+(index+1)}
            subtitle={x.chats[x.chats.length -1].chat}
            style={{marginBottom: 10}}
            left={(props) => (
              <Avatar.Text size={40} label={'U'} />
            )}
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

export default connect(mapStateToProps, mapDispatchToProps)(AllChatScreen);
