/** @format */

import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Pressable,
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
import React, {useEffect, useState} from 'react';
import useAuth from '../../hooks/useAuth';
import HeaderText from '../../components/Text/HeaderText';
import {useTheme} from '@react-navigation/native';
import {AuthTabScreenProps} from '../../routes/types';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().label('First Name'),
  lastName: Yup.string().required().label('Last Name'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});
const SignUp = ({navigation}: AuthTabScreenProps<'SignUp'>) => {
  const [agreeToTerms, setAgreeToTerms] = useState(true);
  const {signUp, signingUp, signUpError, signUpStatus} = useAuth();
  const colorScheme = useColorScheme();
  useEffect(() => {
    if (signUpStatus === 'success') {
      Alert.alert('Signed Up Successfully');
    }
    if (signUpStatus === 'failed') {
      Alert.alert(signUpError || 'Error Signing Up, Try Again.');
    }
  }, [signUpStatus, signUpError]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[styles.container]}
      contentInsetAdjustmentBehavior="automatic">
      <HeaderText style={[{marginBottom: 20}]}>Create an account</HeaderText>
      <Text style={[{marginBottom: 50, width: '80%'}]}>
        Create your account today with us, this would only take few minutes
      </Text>
      <Formik
        initialValues={{password: '', email: '', firstName: '', lastName: ''}}
        onSubmit={(values: FormikValues) => {
          signUp(values);
        }}
        validationSchema={validationSchema}>
        {({handleChange, handleBlur, handleSubmit, errors, touched}) => (
          <View style={{}}>
            <AppTextInput
              placeholder="enter first name"
              title="First Name"
              onChangeText={handleChange('firstName')}
              onBlur={handleBlur('firstName')}
              autoCapitalize="none"
              textContentType="givenName"
              autoCompleteType="name"
              editable={!signingUp}
              clearTextOnFocus={false}
            />
            {touched.firstName && errors.firstName && (
              <Text style={[{color: 'red'}]}>{errors.firstName}</Text>
            )}
            <AppTextInput
              placeholder="enter last name"
              title="Last Name"
              onChangeText={handleChange('lastName')}
              onBlur={handleBlur('lastName')}
              autoCapitalize="none"
              textContentType="familyName"
              autoCompleteType="name"
              editable={!signingUp}
              clearTextOnFocus={false}
            />
            {touched.lastName && errors.lastName && (
              <Text style={[{color: 'red'}]}>{errors.lastName}</Text>
            )}
            <AppTextInput
              placeholder="enter email"
              title="Email Address"
              keyboardType="email-address"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              autoCapitalize="none"
              textContentType="emailAddress"
              autoCompleteType="email"
              editable={!signingUp}
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
              editable={!signingUp}
              clearTextOnFocus={false}
              onSubmitEditing={(values: FormikValues) => {
                signUp(values);
              }}
              returnKeyType="next"
            />
            {touched.password && errors.password && (
              <Text style={[{color: 'red'}]}>{errors.password}</Text>
            )}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Pressable
                style={[
                  styles.switchBox,
                  {borderColor: Colors.border},
                  agreeToTerms && {
                    backgroundColor: Colors.primary,
                  },
                ]}
                onPress={() => {
                  if (agreeToTerms) {
                    setAgreeToTerms(false);
                  } else {
                    setAgreeToTerms(true);
                  }
                }}
              />

              <Text style={{flex: 1}}>
                I agree with SaveNow{' '}
                <Text
                  style={{color: Colors.primary}}
                  onPress={() => {
                    navigation.navigate('TermsAndPolicy');
                  }}>
                  Terms & Conditions
                </Text>{' '}
                and{' '}
                <Text
                  style={{color: Colors.primary}}
                  onPress={() => {
                    navigation.navigate('TermsAndPolicy');
                  }}>
                  Privacy Policy
                </Text>
              </Text>
            </View>
            <View style={[{marginBottom: 30}]} />
            <AppButton
              title={
                signingUp ? (
                  <ActivityIndicator color="white" />
                ) : (
                  'Create account'
                )
              }
              disabled={!agreeToTerms || signingUp}
              onPress={handleSubmit}
            />

            <Text style={{textAlign: 'center', marginVertical: 20}}>
              Have an account?
              <Text
                style={{color: Colors.primary}}
                onPress={() => {
                  navigation.navigate('Login');
                }}>
                {' '}
                Login
              </Text>
            </Text>
          </View>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
};

export default SignUp;

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
  switchBox: {
    width: 16,
    height: 16,
    borderRadius: 5,
    borderWidth: 2,
    marginRight: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
