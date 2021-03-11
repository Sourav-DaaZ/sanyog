import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  modalPopup: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    paddingLeft: 0,
    alignItems: 'center',
  },
  container: {
    flexDirection: 'column',
    width: '100%',
  },
  body: {
    paddingVertical: 20,
    paddingHorizontal: 15
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
  },
  footer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: '#f2f2f2',
    alignItems: 'center'
  },
});

export default styles;
