import {View} from 'native-base';
import * as React from 'react';
import {Alert, ScrollView, TouchableOpacity} from 'react-native';
import {
  useTheme,
  Card,
  Title,
  Paragraph,
  Button,
  Text,
  Badge,
} from 'react-native-paper';
import {connect} from 'react-redux';
import {displayResponse, _retrieveData, _storeData} from '../../utils';
import {useIsFocused} from '@react-navigation/native';

import * as actions from '../../store/actions';
import defaultValue from '../../constants/defaultValue';
import ButtonLayout from '../../sharedComponents/button';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

const ShopScreen = (props) => {
  const {colors} = useTheme();
  const isFocused = useIsFocused();
  const [cart, setCart] = React.useState(props.cart);
  const [count, setCount] = React.useState(0);
  const [data, setData] = React.useState(defaultValue.items);
  const [loader, setLoader] = React.useState(false);

  const onPressFunc = () => {
    props.loader(true);
  };

  const plusItem = (id) => {
    setLoader(true);
    let data1 = cart;
    let cost = props.cost;

    if (data1[id] === undefined || data1[id] === 0) {
      data1[id] = 1;
      cost = cost + price;
    } else {
      data1[id] = data1[id] + 1;
      cost = cost + price;
    }
    setCart(data1);
    props.orderUpdate(data1);
    props.costUpdate(cost);
    setTimeout(() => {
      setLoader(false);
    }, 500);
  };
  const minusItem = (id,index,price) => {
    setLoader(true);
    let data1 = cart;
    let cost = props.cost;

    if (data1[id] !== undefined || data1[id] !== 0) {
      data1[id] = data1[id] - 1;
      cost = cost - price;
    }
    setCart(data1);
    props.orderUpdate(data1);
    props.costUpdate(cost);
    setTimeout(() => {
      setLoader(false);
    }, 500);
  };
  const onRemove = (id, index, price) => {
    setLoader(true);
    let data1 = cart;
    let cost = props.cost;

    if (data1[id] !== undefined || data1[id] !== 0) {
      data1[id] = 0;
      cost = cost - price;
    }
    setCart(data1);
    props.orderUpdate(data1);
    props.costUpdate(cost);
    setTimeout(() => {
      setLoader(false);
    }, 500);
  };

  const HtmlContent = data.map((x, index) => (
    <View key={x.title} style={{marginVertical: 10}}>
      {cart[x.id] ? (
        <Card>
          <Card.Content>
            <Title>{x.title}</Title>
            <Paragraph>Price: ${x.price}</Paragraph>
            {cart[x.id] ? (
              <View
                style={{
                  position: 'absolute',
                  right: 30,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  top: 30,
                }}>
                <Button
                  style={{
                    backgroundColor: colors.mainColor,
                    with: 5,
                  }}
                  onPress={() => {
                    minusItem(x.id, index, x.price);
                  }}
                  color={colors.backgroundColor}>
                  dec
                </Button>
                <Text
                  style={{
                    margin: 10,
                  }}>
                  {cart[x.id]}
                </Text>
                <Button
                  style={{
                    backgroundColor: colors.mainColor,
                    with: 5,
                  }}
                  onPress={() => {
                    plusItem(x.id, index, x.price);
                  }}
                  color={colors.backgroundColor}>
                  INC
                </Button>
              </View>
            ) : null}
          </Card.Content>
          <ButtonLayout
            style={{marginTop: 20}}
            onPress={() =>
              onRemove(x.id, index, Number(x.price) * Number(cart[x.id]))
            }>
            Remove
          </ButtonLayout>
        </Card>
      ) : null}
    </View>
  ));

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <ScrollView
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={true}>
        <View
          style={{flex: 1, justifyContent: 'center', paddingHorizontal: 10}}>
          {HtmlContent}
        </View>
      </ScrollView>
      {props.cost > 0 ? (
        <ButtonLayout
          onPress={() => props.navigation.navigate('RiderScreen')}
          style={{position: 'absolute', bottom: 0}}>
          Checkout
        </ButtonLayout>
      ) : null}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    token: state.auth.access_token,
    cart: state.auth.cart,
    cost: state.auth.cost,
    store_location: state.auth.store_location,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loader: (val) => dispatch(actions.loading(val)),
    orderUpdate: (val) => dispatch(actions.orderUpdate(val)),
    costUpdate: (val) => dispatch(actions.costUpdate(val)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopScreen);
