import {StyleSheet, Dimensions} from 'react-native';

var {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  loaderBackground: {
    position: 'absolute',
    flex: 1,
    // backgroundColor: '#00000050',
    backgroundColor: '#ffffff50',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 99,
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    color: '#000000',
    backgroundColor: '#ffffff',
    padding: 30,
    borderRadius: 50,
    width: 60,
    height: 60,
    shadowColor: '#ffffff',
    shadowRadius: 10,
    shadowOpacity: .9,
    elevation: 15
  },
});

export default styles;
