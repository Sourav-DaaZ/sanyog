import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Text, useTheme} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BackBtn = (props) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={props.onClick}>
      <Ionicons
        name="chevron-back-sharp"
        color={colors.backgroundColor}
        style={{marginLeft: -2}}
        size={props.size}
      />
      <Text style={{color: colors.backgroundColor, fontSize: 15, fontWeight: 'bold', marginLeft: -6}}>
        Back
      </Text>
    </TouchableOpacity>
  );
};

export default BackBtn;
