/** @format */

import React, {ReactElement, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Hide, Show} from 'react-native-iconly';
import useColorScheme from '../../hooks/useColorScheme';
import {useTheme} from '@react-navigation/native';
import CurrencyInput, {CurrencyInputProps} from 'react-native-currency-input';
import {Colors} from 'react-native/Libraries/NewAppScreen';

type Props = {
  showPasswordButton?: boolean;
  onPressShowPassword?: () => void;
  secondary?: boolean;
  showPasswordText?: string;
  title?: string;
  IconComponent?: ReactElement;
};
export type ViewProps = Props & CurrencyInputProps;

const AppCurrencyInput = (props: ViewProps) => {
  const {
    style,
    title,
    secondary,
    IconComponent,
    showPasswordText,
    showPasswordButton,
    onPressShowPassword,
    ...otherProps
  } = props;
  const [hide, setHide] = useState(otherProps.secureTextEntry);
  const colorScheme = useColorScheme();
  const {colors} = useTheme();

  return (
    <View style={{marginVertical: 12}}>
      {title && (
        <Text
          style={{
            fontWeight: '500',
            fontSize: 10,
            lineHeight: 12,
            marginBottom: 12,
          }}>
          {title}
        </Text>
      )}
      <View
        style={[
          styles.container,
          style,
          {
            backgroundColor: colors.background,
            borderColor: colors.border,
            borderRadius: otherProps.multiline ? 20 : 2000,
          },
        ]}>
        {IconComponent}
        <CurrencyInput
          style={[styles.placeHolderText, styles.full_width]}
          delimiter=","
          separator="."
          precision={0}
          prefix="&#x20A6; "
          {...otherProps}
          secureTextEntry={hide}
          placeholderTextColor={Colors.dark}
          onChangeText={text => {}}
        />
        {showPasswordButton && (
          <Text style={styles.showPassword} onPress={onPressShowPassword}>
            {showPasswordText}
          </Text>
        )}
        {otherProps.secureTextEntry && (
          <TouchableOpacity onPress={() => setHide(!hide)}>
            {hide ? (
              <Hide color={Colors.dark} />
            ) : (
              <Show color={Colors.primary} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default AppCurrencyInput;

const styles = StyleSheet.create({
  box: {borderRadius: 100},
  container: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    alignItems: 'center',
    paddingHorizontal: 20,
    elevation: 1,
    borderWidth: 1,
  },
  full_width: {flex: 1},
  icon: {
    marginRight: 10,
  },
  placeHolderText: {
    fontSize: 16,
  },
  text: {
    fontSize: 12,
  },
  rounded: {borderRadius: 100},
  showPassword: {color: '#1563FF'},
});
