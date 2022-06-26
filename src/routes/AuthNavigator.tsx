/** @format */

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ResetPassword from '../screens/Auth/ResetPassword';
import Login from '../screens/Auth/Login';
import SignUp from '../screens/Auth/SignUp';
import StartPasswordReset from '../screens/Auth/StartPasswordReset';
import Onboarding from '../screens/Auth/Onboarding';
import ConfirmResetCode from '../screens/Auth/ConfirmResetCode';
import useColorScheme from '../hooks/useColorScheme';
import {AuthTabParamList, AuthTabScreenProps} from './types';
import TermsAndPolicy from '../screens/Others/TermsAndPolicy';

const Stack = createNativeStackNavigator<AuthTabParamList>();

function AuthNavigator() {
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{headerShadowVisible: false}}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={({navigation}: AuthTabScreenProps<'Login'>) => ({
          title: '',
        })}
      />
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={({navigation}: AuthTabScreenProps<'Onboarding'>) => ({
          title: '',
          // headerTintColor: "white",
          // headerShadowVisible: false,
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={({navigation}: AuthTabScreenProps<'SignUp'>) => ({
          title: '',
        })}
      />
      <Stack.Screen
        name="StartPasswordReset"
        component={StartPasswordReset}
        options={({navigation}: AuthTabScreenProps<'StartPasswordReset'>) => ({
          title: '',
        })}
      />
      <Stack.Screen
        name="ConfirmResetCode"
        component={ConfirmResetCode}
        options={({navigation}: AuthTabScreenProps<'ConfirmResetCode'>) => ({
          title: '',
        })}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={({navigation}: AuthTabScreenProps<'ResetPassword'>) => ({
          title: 'Reset Password',
        })}
      />
      <Stack.Screen
        name="TermsAndPolicy"
        component={TermsAndPolicy}
        options={({navigation}: AuthTabScreenProps<'TermsAndPolicy'>) => ({
          title: '',
        })}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
