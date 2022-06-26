/** @format */

import React, {FC, ReactElement} from 'react';
import {View, StyleSheet, useWindowDimensions, Text} from 'react-native';
import AppButton from '../Buttons/AppButton';

type Props = {
  headerText?: string;
  text?: string;
  buttonText?: string;
  onPress?: () => void;
  visible: boolean;
  iconComponent?: ReactElement;
};
const ListEmptyComponent: FC<Props> = ({
  text,
  buttonText,
  onPress,
  visible = true,
  iconComponent,
  headerText,
}) => {
  const {height, width} = useWindowDimensions();
  if (!visible) return null;
  return (
    <View style={[styles.container, {width: width - 20}]}>
      {iconComponent}
      <Text style={styles.headerText}>{headerText}</Text>
      <Text style={styles.text}>{text}</Text>
      {buttonText ? (
        <AppButton
          title={buttonText}
          onPress={onPress}

          // secondary
        />
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: '100%',
  },
  headerText: {
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 4,
    fontSize: 18,
    width: '80%',
    alignSelf: 'center',
  },
  text: {
    // fontWeight: "bold",
    textAlign: 'center',
    marginVertical: 8,
    fontSize: 14,
    marginBottom: 24,
    width: '80%',
    alignSelf: 'center',
  },
});
export default ListEmptyComponent;
