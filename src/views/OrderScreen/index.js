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
  console.log(props.order);
  return (
    <ScrollView
      showsVerticalScrollIndicator={true}
      showsHorizontalScrollIndicator={true}
    >
      <View style={{flex: 1, justifyContent: 'center'}}>
      {props.order?.map((x, index) => (
        <Card.Title
        key={index}
        title={Object.keys(x.cart).length - 1 > 0?(Object.keys(x.cart)[0].toString() + ' and other ' + (Object.keys(x.cart).length - 1).toString() + 'items'):Object.keys(x.cart)[0].toString()}
        subtitle={x.location}
        style={{borderBottomColor: 'lightgray', borderBottomWidth: 1}}
        right={() => <Text style={{marginRight: 20}}>${x.cost}</Text>}
      />
      ))}
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    cart: state.auth.cart,
    order: state.auth.order
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loader: (val) => dispatch(actions.loading(val))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);
