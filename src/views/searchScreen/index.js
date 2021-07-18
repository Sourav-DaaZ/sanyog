import * as React from 'react';
import {
  Alert,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {Avatar, Card, useTheme} from 'react-native-paper';

import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuLayout from '../../sharedComponents/menu';

const SearchScreen = (props) => {
  const {colors} = useTheme();
  const [refreshing, setRefreshing] = React.useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <TouchableOpacity onPress={() => props.navigation.navigate('ChatScreen')}>
        <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          onPress={() => Alert.alert('hi')}
          left={() => <Avatar.Icon size={45} icon="folder" />}
          right={() => (
            <MenuLayout
              terget={
                <MaterialIcons
                  name="dots-vertical"
                  color={colors.iconColor}
                  style={{marginRight: 5}}
                  size={30}
                />
              }
              menuOption={[{text: 'enter', function: () => alert(`Save`)}]}
            />
          )}
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SearchScreen;
