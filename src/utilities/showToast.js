/** @format */

import Toast from 'react-native-root-toast';

function showToast(msg) {
  Toast.show(msg, {
    position: Toast.positions.TOP,
    duration: Toast.durations.SHORT,
  });
}
export default showToast;
