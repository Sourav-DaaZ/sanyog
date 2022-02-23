import {View} from 'native-base';
import * as React from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import {useTheme, Card, Title, Paragraph} from 'react-native-paper';
import {connect} from 'react-redux';

import * as actions from '../../store/actions';
import {displayResponse, updateObject} from '../../utils';
import defaultValue from '../../constants/defaultValue';
import ButtonLayout from '../../sharedComponents/button';

const AllShopScreen = (props) => {
  const {colors} = useTheme();

  const onPressFunc = () => {
    props.loader(true);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={true}
      showsHorizontalScrollIndicator={true}>
      <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 10}}>
        <ButtonLayout
          style={{marginVertical: 10}}
          onPress={() => props.navigation.navigate('MapScreen')}>
          Set Location
        </ButtonLayout>
        {defaultValue.store.map((x) => (
          <View key={x.title} style={{marginVertical: 10}}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('SingleShopScreen')}>
              <Card>
                <Card.Cover
                  source={{
                    uri: x.image,
                  }}
                />
                <Card.Content>
                  <Title>{x.title}</Title>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(AllShopScreen);
