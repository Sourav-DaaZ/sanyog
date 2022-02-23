import {View} from 'native-base';
import * as React from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import {useTheme, Card, Title, Paragraph, Button} from 'react-native-paper';
import {connect} from 'react-redux';

import * as actions from '../../store/actions';
import {displayResponse, updateObject} from '../../utils';
import defaultValue from '../../constants/defaultValue';
import ButtonLayout from '../../sharedComponents/button';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

const SingleShopScreen = (props) => {
  const {colors} = useTheme();

  const onPressFunc = () => {
    props.loader(true);
  };

  return (
    <React.Fragment>
    <FontAwesome
        name="shopping-cart"
        color={colors.backgroundColor}
        style={{marginLeft: 15, position: 'absolute', right: 20, top: -40, zIndex: 9999 }}
        size={20}
        onPress={() => props.navigation.navigate('ShopScreen')}
      />
    <ScrollView
      showsVerticalScrollIndicator={true}
      showsHorizontalScrollIndicator={true}>
      <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 10}}>
        {defaultValue.items.map((x) => (
          <View key={x.title} style={{marginVertical: 10}}>
            <Card>
              <Card.Content>
                <Title>{x.title}</Title>
                <Paragraph>Price: ${x.price}</Paragraph>
                <Button
                  style={{
                    position: 'absolute',
                    right: 30,
                    top: 30,
                    backgroundColor: colors.mainColor,
                    with: 40,
                  }}
                  color={colors.backgroundColor}>
                  Buy
                </Button>
              </Card.Content>
            </Card>
          </View>
        ))}
      </View>
    </ScrollView>
    </React.Fragment>
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
export default connect(mapStateToProps, mapDispatchToProps)(SingleShopScreen);
