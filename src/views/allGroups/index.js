import * as React from 'react';
import {Avatar, Card} from 'react-native-paper';

import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuLayout from '../../sharedComponents/menu';
import {useTheme} from 'react-native-paper';
import {Alert, ScrollView, TouchableOpacity} from 'react-native';

const AllGroups = (props) => {
  const {colors} = useTheme();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
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

export default AllGroups;
