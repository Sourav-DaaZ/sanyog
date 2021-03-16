import React from 'react';
import {
  NavigationContainer,
  DarkTheme as navigationDarkTheme,
  DefaultTheme as navigationDefaultTheme,
} from '@react-navigation/native';
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import { defaultColor, darkColor } from "../constants/colorCode";

const customeDefaultTheme = {
  ...PaperDefaultTheme,
  ...navigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...navigationDefaultTheme.colors,
    ...defaultColor
  },
};
const customeDarkTheme = {
  ...PaperDarkTheme,
  ...navigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...navigationDarkTheme.colors,
    ...darkColor
  },
};

const GlobalTheme = (props) => (
  <PaperProvider theme={props.dark ? customeDarkTheme : customeDefaultTheme}>
    <NavigationContainer
      theme={props.dark ? customeDarkTheme : customeDefaultTheme}>
      {props.children}
    </NavigationContainer>
  </PaperProvider>
);

export default GlobalTheme;
