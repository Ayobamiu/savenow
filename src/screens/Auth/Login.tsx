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
import * as Yup from 'yup';
import {Formik, FormikProps, FormikValues, FormikErrors} from 'formik';
import React, {useEffect} from 'react';
import useAuth from '../../hooks/useAuth';
import HeaderText from '../../components/Text/HeaderText';
import {AuthTabScreenProps} from '../../routes/types';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface FormValues {
  email: string;
  password: string;
}
const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

const Login = ({
  navigation,
}: AuthTabScreenProps<'Login'> & FormikProps<FormValues>) => {
  const {logIn, loggingIn, logInError, logInStatus} = useAuth();

  useEffect(() => {
    if (logInStatus === 'success') {
      Alert.alert('Logged In Successfully');
    }
    if (logInStatus === 'failed') {
      Alert.alert(logInError || 'Error Logging In, Try Again.');
    }
  }, [logInStatus, logInError]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[styles.container]}
      contentInsetAdjustmentBehavior="automatic">
      <HeaderText style={[{marginBottom: 20}]}>Welcome Back</HeaderText>
      <Text style={[{marginBottom: 50}]}>Login to your account</Text>

      <Formik
        initialValues={{password: '', email: ''}}
        onSubmit={(values: FormikValues) => {
          logIn(values.email, values.password);
        }}
        validationSchema={validationSchema}>
        {({handleChange, handleBlur, handleSubmit, errors, touched}) => (
          <View>
            <AppTextInput
              placeholder="enter email addres"
              title="Email Address"
              keyboardType="email-address"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              autoCapitalize="none"
              textContentType="emailAddress"
              autoCompleteType="email"
              editable={!loggingIn}
              clearTextOnFocus={false}
            />
            {touched.email && errors.email && (
              <Text style={[{color: 'red'}]}>{errors.email}</Text>
            )}

            <AppTextInput
              placeholder="enter password"
              title="Password"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              textContentType="password"
              autoCompleteType="password"
              autoCapitalize="none"
              editable={!loggingIn}
              clearTextOnFocus={false}
              onSubmitEditing={(values: FormikValues) => {
                logIn(values.email, values.password);
              }}
              returnKeyType="next"
            />
            {touched.password && errors.password && (
              <Text style={[{color: 'red'}]}>{errors.password}</Text>
            )}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginBottom: 20,
              }}>
              <Text
                onPress={() => {
                  navigation.navigate('StartPasswordReset');
                }}>
                Forgot Password?
              </Text>
            </View>
            <View style={{width: 100, marginBottom: 20}}></View>
            <AppButton
              title={loggingIn ? <ActivityIndicator color="white" /> : 'Login'}
              onPress={handleSubmit}
              disabled={loggingIn}></AppButton>
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
        <Text style={{textAlign: 'center', marginRight: 10}}>
          Don't have an account.
          <Text
            style={{color: Colors.primary}}
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            {' '}
            Sign Up
          </Text>
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    // minHeight: Dimensions.get("screen").height,
    // justifyContent: "center",
  },
  mb32: {marginBottom: 32},
  separator: {
    marginVertical: 10,
    height: 1,
    width: '100%',
    backgroundColor: 'black',
  },
});
