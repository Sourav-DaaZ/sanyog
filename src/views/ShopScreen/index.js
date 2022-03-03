import {View} from 'native-base';
import * as React from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import {useTheme, Text, Card} from 'react-native-paper';
import {connect} from 'react-redux';
import defaultValue from '../../constants/defaultValue';
import ButtonLayout from '../../sharedComponents/button';

import * as actions from '../../store/actions';
import {displayResponse, updateObject} from '../../utils';

const ShopScreen = (props) => {
  const {colors} = useTheme();
  const [data, setData] = React.useState(defaultValue.items);

  const onPressFunc = () => {
    props.loader(true);
  };
  React.useEffect(()=>{
    let val = 0;
    data.map((x, index) => props.cart[x.id]? val = val + (x.price * props.cart[x.id]) : null)
    props.cost(val);
  },[])
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={true}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          {data.map((x, index) =>
            props.cart[x.id] ? (
              <Card.Title
                key={x.id}
                title={x.id}
                subtitle={
                  props.store_location?.location
                    ? props.store_location.location
                    : ''
                }
                style={{borderBottomColor: 'lightgray', borderBottomWidth: 1}}
                right={() => (
                  <Text style={{marginRight: 20}}>x {props.cart[x.id]}</Text>
                )}
              />
            ) : null,
          )}
        </View>
      </ScrollView>
      <ButtonLayout
        onPress={() => props.navigation.navigate('RiderScreen')}
        style={{position: 'absolute', bottom: 0}}>
        Checkout
      </ButtonLayout>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    cart: state.auth.cart,
    store_location: state.auth.store_location,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loader: (val) => dispatch(actions.loading(val)),
    cost: (val) => dispatch(actions.costUpdate(val))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ShopScreen);
