/** @format */

import React from 'react';
import {StyleSheet} from 'react-native';
import {Text as DefaultText, View as DefaultView} from 'react-native';

// import {
//   useFonts,
//   Inter_600SemiBold,
//   Inter_500Medium,
//   Inter_400Regular,
// } from "@expo-google-fonts/inter";

export type TextProps = DefaultText['props'];

export default function AppText(props: TextProps) {
  const {style, ...otherProps} = props;

  return <DefaultText style={[style]} {...otherProps} />;
}
