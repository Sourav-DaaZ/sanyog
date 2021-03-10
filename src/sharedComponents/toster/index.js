import {Toast} from 'native-base';

const Toaster = (text, duration, type, position, btnText) => {
  return Toast.show({
    text: text,
    buttonText: btnText ? btnText : 'Close',
    duration: duration ? duration : 3000,
    textStyle: {color: 'yellow'},
    // buttonStyle: { backgroundColor: "#5cb85c" },
    position: position ? position : 'bottom', // "bottom" "top"
    type: type ? type : 'default', //"default" "success" "warning" "danger"
  });
};

export default Toaster;
