/** @format */

import {
  Alert,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AppButton from '../../components/Buttons/AppButton';
import AppTextInput from '../../components/Input/AppTextInput';
import useColorScheme from '../../hooks/useColorScheme';
import * as Yup from 'yup';
import {Formik} from 'formik';
import useAuth from '../../hooks/useAuth';
import HeaderText from '../../components/Text/HeaderText';
import {AuthTabScreenProps} from '../../routes/types';
const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
});

const StartPasswordReset = ({
  navigation,
}: AuthTabScreenProps<'StartPasswordReset'>) => {
  const colorScheme = useColorScheme();
  const {
    saveAndSendResetPassworCode,
    sendingCode,
    sendingCodeError,
    sendingCodeStatus,
  } = useAuth();

  useEffect(() => {
    if (sendingCodeStatus === 'success') {
      Alert.alert(
        'Code sent to your email',
        'We have sent a code to your email. Press Okay and use the code in the next step.',
        [
          {
            text: 'Okay',
            onPress: () => {
              navigation.navigate('ConfirmResetCode');
            },
          },
        ],
      );
    }
    if (sendingCodeStatus === 'failed') {
      Alert.alert(sendingCodeError || 'Error sending code, Try Again.');
    }
  }, [sendingCodeStatus, sendingCodeError]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[styles.container]}
      contentInsetAdjustmentBehavior="automatic">
      <HeaderText style={[{marginBottom: 20}]}>Forgot Password</HeaderText>
      <Text style={{marginBottom: 50}}>
        Please kindly provide valid informations so we help you recover you
        account
      </Text>

      <Formik
        initialValues={{email: ''}}
        onSubmit={async values => {
          await saveAndSendResetPassworCode(values.email);
        }}
        validationSchema={validationSchema}>
        {({handleChange, handleBlur, handleSubmit, errors, touched}) => (
          <View>
            <AppTextInput
              placeholder="enter email address"
              title="Email Address"
              keyboardType="email-address"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              autoCapitalize="none"
              textContentType="emailAddress"
              autoCompleteType="email"
              editable={!sendingCode}
              clearTextOnFocus={false}
            />
            {touched.email && errors.email && (
              <Text style={[{color: 'red'}]}>{errors.email}</Text>
            )}
            <View style={{marginVertical: 20}}>
              <AppButton
                title={
                  sendingCode ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    'Reset Pssword'
                  )
                }
                onPress={handleSubmit}
                disabled={sendingCode}
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

export default StartPasswordReset;

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
