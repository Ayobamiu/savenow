/** @format */

import Clipboard from '@react-native-clipboard/clipboard';

const copyToClipboard = text => {
  if (text) {
    Clipboard.setString(text);
  }
};

export default copyToClipboard;
