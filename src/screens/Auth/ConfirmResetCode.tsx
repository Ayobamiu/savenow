/** @format */

import {
  ActivityIndicator,
  Alert,
  Button,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AppButton from '../../components/Buttons/AppButton';
import AppTextInput from '../../components/Input/AppTextInput';
import * as Yup from 'yup';
import {Formik} from 'formik';
import useAuth from '../../hooks/useAuth';
import {get} from '../../secure/cache';
import React, {useEffect, useState} from 'react';
import HeaderText from '../../components/Text/HeaderText';
import {hideEmail} from '../../utilities/hideEmail';
import {AuthTabScreenProps} from '../../routes/types';
const validationSchema = Yup.object().shape({
  code: Yup.number().required().label('Code'),
});

const ConfirmResetCode = ({
  navigation,
}: AuthTabScreenProps<'StartPasswordReset'>) => {
  const {
    saveAndSendResetPassworCode,
    sendingCode,
    sendingCodeError,
    sendingCodeStatus,
  } = useAuth();

  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (sendingCodeStatus === 'success') {
      Alert.alert(
        'Code sent to your email',
        'We have sent a code to your email. Press Okay and use the code in the next step.',
      );
    }
    if (sendingCodeStatus === 'failed') {
      Alert.alert(sendingCodeError || 'Error sending code, Try Again.');
    }
  }, [sendingCodeStatus, sendingCodeError]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const code = await get('password:reset:code');
      const email = await get('password:reset:email');

      if (mounted) {
        setCode(code);
        setEmail(email);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const proceed = () => {
    Alert.alert('Code Verified ✔', 'Continue to reset password', [
      {
        text: 'Continue',
        onPress: () => {
          navigation.navigate('ResetPassword');
        },
      },
    ]);
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[styles.container]}
      contentInsetAdjustmentBehavior="automatic">
      <HeaderText style={{marginBottom: 20}}>Reset Password</HeaderText>
      <Text style={{marginBottom: 50}}>
        Check your mailbox, we’ve sent you a reset code to
        {hideEmail(email)}.
      </Text>

      <Formik
        initialValues={{code: ''}}
        onSubmit={async values => {
          if (values.code === code.toString()) {
            proceed();
          } else {
            Alert.alert('Incorrect code!');
          }
        }}
        validationSchema={validationSchema}>
        {({handleChange, handleBlur, handleSubmit, errors, values}) => (
          <View>
            <AppTextInput
              placeholder="Code"
              keyboardType="number-pad"
              returnKeyType="done"
              editable={!sendingCode}
              maxLength={6}
              onChangeText={txt => {
                handleChange('code')(txt);
                if (txt.length === 6) {
                  handleSubmit();
                }
              }}
            />
            <View style={{marginVertical: 20}}>
              <AppButton
                title={
                  sendingCode ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    'Verify Code'
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
        <Text style={{textAlign: 'center', marginRight: 10}}>
          Didn't get the code?
        </Text>
        <TouchableOpacity
          onPress={() => saveAndSendResetPassworCode(email)}
          disabled={sendingCode}>
          <Text style={{color: 'blue', textDecorationLine: 'underline'}}>
            Resend Code{' '}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ConfirmResetCode;

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
