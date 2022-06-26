/** @format */

import React, {ReactElement} from 'react';
import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

type Props = {
  inverse?: boolean;
  secondary?: boolean;
  danger?: boolean;
  title: string | ReactElement;
  buttonStyle?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>);

  small?: boolean;
};
export type ViewProps = Props & PressableProps & React.RefAttributes<View>;

const AppButton = (props: ViewProps) => {
  const {
    style,
    title,
    secondary,
    inverse,
    buttonStyle,
    danger,
    small,
    ...otherProps
  } = props;

  return (
    <Pressable
      style={[
        styles.button,
        {backgroundColor: Colors.primary},
        danger && {backgroundColor: '#FFE9E9'},
        secondary && styles.secondaryButton,
        inverse && styles.inverse,
        inverse && {borderColor: Colors.primary},
        otherProps.disabled && styles.opaque,
        small && {paddingVertical: 10 * 0.5, paddingHorizontal: 20 * 0.5},
      ]}
      {...buttonStyle}
      {...otherProps}>
      <Text
        style={[
          styles.text,
          secondary && {color: Colors.primary},
          inverse && {color: Colors.primary},
          danger && {color: '#FF0F0F'},
          small && {fontSize: 13},
        ]}>
        {title}
      </Text>
    </Pressable>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    paddingVertical: 10 * 1.5,
    paddingHorizontal: 20 * 1.5,
  },
  inverse: {
    borderWidth: 1,
    backgroundColor: 'white',
  },
  opaque: {opacity: 0.5},
  secondaryButton: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  inverseText: {color: '#1563FF'},
  secondaryText: {color: '#1563FF'},
  text: {
    color: 'white',
    fontWeight: '500',
    fontSize: 15,
  },
});
