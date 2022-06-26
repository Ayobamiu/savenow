/** @format */

import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AppButton from '../../components/Buttons/AppButton';
import AppTextInput from '../../components/Input/AppTextInput';
import useColorScheme from '../../hooks/useColorScheme';
import {Formik, FormikValues} from 'formik';
import * as Yup from 'yup';
import React, {useEffect, useState} from 'react';
import {get} from '../../secure/cache';
import useAuth from '../../hooks/useAuth';
import HeaderText from '../../components/Text/HeaderText';
import {AuthTabScreenProps} from '../../routes/types';

const validationSchema = Yup.object().shape({
  password: Yup.string().required('This field is required'),
  changepassword: Yup.string()
    .required('This field is required')
    .when('password', {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref('password')],
        'Both password need to be the same',
      ),
    }),
});

const ResetPassword = ({
  navigation,
}: AuthTabScreenProps<'StartPasswordReset'>) => {
  const colorScheme = useColorScheme();
  const {
    resetPassword,
    resetingPassword,
    resetingPasswordError,
    resetingPasswordStatus,
  } = useAuth();

  const [email, setEmail] = useState('');
  useEffect(() => {
    let mounted = true;
    (async () => {
      const email = await get('password:reset:email');
      if (mounted) {
        setEmail(email);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);
  const proceed = () => {
    Alert.alert('Password Reset Complete ✅', 'Proceed to login', [
      {
        text: 'Okay',
        onPress: () => {
          navigation.navigate('Login');
        },
      },
    ]);
  };

  useEffect(() => {
    if (resetingPasswordStatus === 'success') {
      proceed();
    }
    if (resetingPasswordStatus === 'failed') {
      Alert.alert(
        resetingPasswordError || 'Error Reseting Password, Try Again.',
      );
    }
  }, [resetingPasswordStatus, resetingPasswordError]);
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[styles.container]}
      contentInsetAdjustmentBehavior="automatic">
      <HeaderText style={[{marginBottom: 50}]}>
        Choose a strong password you can remember
      </HeaderText>

      <Formik
        initialValues={{password: '', changepassword: ''}}
        onSubmit={(values: FormikValues) => {
          resetPassword(email, values.password);
        }}
        validationSchema={validationSchema}>
        {({handleChange, handleBlur, handleSubmit, errors, touched}) => (
          <View>
            <AppTextInput
              placeholder="Enter New Password"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              textContentType="password"
              autoCompleteType="password"
              autoCapitalize="none"
              editable={!resetingPassword}
            />
            {touched.password && errors.password && (
              <Text style={[{color: 'red'}]}>{errors.password}</Text>
            )}
            <AppTextInput
              placeholder="Re-Enter New Password"
              secureTextEntry
              onChangeText={handleChange('changepassword')}
              onBlur={handleBlur('changepassword')}
              textContentType="password"
              autoCompleteType="password"
              autoCapitalize="none"
              editable={!resetingPassword}
            />
            {touched.changepassword && errors.changepassword && (
              <Text style={[{color: 'red'}]}>{errors.changepassword}</Text>
            )}
            <View style={{marginVertical: 20}}>
              <AppButton
                title={
                  resetingPassword ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    'Reset Password'
                  )
                }
                onPress={handleSubmit}
                disabled={resetingPassword}
              />
            </View>
          </View>
        )}
      </Formik>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 20,
          alignItems: 'center',
        }}>
        <Text style={{textAlign: 'center', marginRight: 10}}>Go back to</Text>
        <Text
          style={{color: 'blue', textDecorationLine: 'underline'}}
          onPress={() => {
            navigation.navigate('Login');
          }}>
          Login{' '}
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    minHeight: Dimensions.get('screen').height,
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '100%',
    backgroundColor: 'black',
  },
});
