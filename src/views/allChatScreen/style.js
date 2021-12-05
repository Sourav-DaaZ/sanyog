import {StyleSheet} from 'react-native';

const Styles = StyleSheet.create({
  outerBox: {
    borderColor: 'red',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginHorizontal: 20,
  },
  inlineInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonInput: {
    width: '100%',
  },
  inputField: {
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    width: '75%',
    marginRight: '5%',
  },
  headerText: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: -30,
    marginBottom: 15,
  },
  bottomText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
});

export default Styles;
