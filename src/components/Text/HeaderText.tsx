/** @format */

import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import useColorScheme from '../../hooks/useColorScheme';

export type TextProps = Text['props'];

export default function HeaderText(props: TextProps) {
  const {style, ...otherProps} = props;
  const colorScheme = useColorScheme();

  return (
    <Text
      style={[style, {color: Colors.primary}, styles.header]}
      {...otherProps}
    />
  );
}
const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
