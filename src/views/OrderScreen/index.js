import {View} from 'native-base';
import * as React from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import {useTheme, Text, Card} from 'react-native-paper';
import {connect} from 'react-redux';

import * as actions from '../../store/actions';
import {displayResponse, updateObject} from '../../utils';

const OrderScreen = (props) => {
  const {colors} = useTheme();
 
  const onPressFunc = () => {
    props.loader(true);
    
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={true}
      showsHorizontalScrollIndicator={true}
    >
      <View style={{flex: 1, justifyContent: 'center'}}>
      <Card.Title
          title="Milk, Curd..."
          subtitle="Big Bazar"
          style={{borderBottomColor: 'lightgray', borderBottomWidth: 1}}
          right={() => <Text style={{marginRight: 20}}>$120</Text>}
        />
        <Card.Title
          title="Milk, Curd..."
          subtitle="Big Bazar"
          style={{borderBottomColor: 'lightgray', borderBottomWidth: 1}}
          right={() => <Text style={{marginRight: 20}}>$120</Text>}
        />
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
    loader: (val) => dispatch(actions.loading(val))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);
