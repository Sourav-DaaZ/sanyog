import {View} from 'native-base';
import * as React from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import {useTheme, Text, Card} from 'react-native-paper';
import {connect} from 'react-redux';
import ButtonLayout from '../../sharedComponents/button';

import * as actions from '../../store/actions';
import {displayResponse, updateObject} from '../../utils';

const ShopScreen = (props) => {
  const {colors} = useTheme();
 
  const onPressFunc = () => {
    props.loader(true);
    
  };

  return (
    <>
    <ScrollView
      showsVerticalScrollIndicator={true}
      showsHorizontalScrollIndicator={true}
    >
      <View style={{flex: 1, justifyContent: 'center'}}>
      <Card.Title
          title="curd"
          subtitle="Shopiz"
          style={{borderBottomColor: 'lightgray', borderBottomWidth: 1}}
          right={() => <Text style={{marginRight: 20}}>x 4</Text>}
        />
        <Card.Title
          title="curd"
          subtitle="Shopiz"
          style={{borderBottomColor: 'lightgray', borderBottomWidth: 1}}
          right={() => <Text style={{marginRight: 20}}>x 4</Text>}
        />
      </View>
    </ScrollView>
    <ButtonLayout onPress={()=> props.navigation.navigate('RiderScreen')} style={{position: 'absolute', bottom: 0}}>Checkout</ButtonLayout>
    </>
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
export default connect(mapStateToProps, mapDispatchToProps)(ShopScreen);
