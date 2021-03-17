import React from 'react';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {useTheme} from 'react-native-paper';
import {Text} from 'react-native-paper';

const MenuLayout = (props) => {
  const {colors} = useTheme();
  return (
    <Menu>
      <MenuTrigger>{props.terget}</MenuTrigger>
      <MenuOptions>
        {props.menuOption.map((x, index) => (
          <MenuOption key={index} onSelect={x.function}>
            <Text
              style={{
                color: colors.textColor,
                paddingHorizontal: 15,
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: colors.borderBottomColor,
              }}>
              {x.text}
            </Text>
          </MenuOption>
        ))}
      </MenuOptions>
    </Menu>
  );
};

export default MenuLayout;
