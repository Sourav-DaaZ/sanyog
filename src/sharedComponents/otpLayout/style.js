import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },
  underlineStyleHighLighted: {
    borderColor: '#000000',
  },
  borderStyleBase: {
    width: '95%',
    height: 100,
    paddingHorizontal: '5%',
  },
  basicStyle: {
    color: '#000000',
    borderColor: '#00000040',
  },
  borderStyleHighLighted: {
    borderColor: '#000000',
    width: '100%',
    paddingHorizontal: 20,
    height: 100,
  },
  resendOtpStyle: {
    color: '#00000060',
    borderBottomWidth: 1,
    borderBottomColor: '#00000060',
    marginBottom: 10,
    fontSize: 15,
    marginTop: 20
  },
});

export default styles;
