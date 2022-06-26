/** @format */

import {useContext, useEffect, useState} from 'react';
import authStorage from '../secure/storage';
import jwt_decode from 'jwt-decode';
import {remove, store as save} from '../secure/cache';
import AuthContext from '../contexts/authContext';
import authApi from '../api/auth';
import {Alert} from 'react-native';

// import * as WebBrowser from 'expo-web-browser';

const useAuth = () => {
  let mounted = true;
  const {user, setUser} = useContext(AuthContext);

  const [loggingIn, setLoggingIn] = useState(false);
  const [logInError, setLogInError] = useState('');
  const [logInStatus, setLogInStatus] = useState('pending');

  const [signingUp, setSigningUp] = useState(false);
  const [signUpError, setSignUpError] = useState('');
  const [signUpStatus, setSignUpStatus] = useState('pending');

  const [resetingPassword, setResetingPassword] = useState(false);
  const [resetingPasswordError, setResetingPasswordError] = useState('');
  const [resetingPasswordStatus, setResetingPasswordStatus] =
    useState('pending');

  const [sendingCode, setSendingCode] = useState(false);
  const [sendingCodeError, setSendingCodeError] = useState('');
  const [sendingCodeStatus, setSendingCodeStatus] = useState('pending');

  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    return () => {
      mounted = false;
    };
  }, []);

  const signUp = async data => {
    try {
      if (mounted) {
        setSignUpStatus('pending');
        setSigningUp(true);
      }
      const result = await authApi.signUp(data);
      setUser(result.data.user);
      authStorage.storeUser(result.data.user);
      authStorage.storeAuthToken(result.data.token);
      if (mounted) {
        setSigningUp(false);
        setSignUpStatus('success');
      }
    } catch (error) {
      if (mounted) {
        setSigningUp(false);
        setSignUpStatus('failed');
        setSignUpError(error?.response?.data?.message);
      }
    }
  };
  const logIn = async (email, password) => {
    try {
      if (mounted) {
        setLogInStatus('pending');
        setLoggingIn(true);
      }
      const result = await authApi.login(email, password);
      setUser(result.data.user);
      authStorage.storeUser(result.data.user);
      authStorage.storeAuthToken(result.data.token);
      if (mounted) {
        setLoggingIn(false);
        setLogInStatus('success');
      }
    } catch (error) {
      if (mounted) {
        setLoggingIn(false);
        setLogInStatus('failed');
        setLogInError(error?.response?.data?.message);
      }
    }
  };
  const resetPassword = async (email, password) => {
    try {
      if (mounted) {
        setResetingPasswordStatus('pending');
        setResetingPassword(true);
      }
      await authApi.changePassword(email, password);
      if (mounted) {
        setResetingPassword(false);
        setResetingPasswordStatus('success');
      }
      await save('password:reset:email', '');
      await save('password:reset:code', '');
    } catch (error) {
      if (mounted) {
        setResetingPassword(false);
        setResetingPasswordStatus('failed');
        setResetingPasswordError(error?.response?.data?.message);
      }
    }
  };
  const saveUser = user => {
    authStorage.storeUser(user);
    setUser(user);
  };
  const saveAndSendCode = async email => {
    const code = Math.floor(100000 + Math.random() * 900000);
    //send it
    if (mounted) {
      setSendingCode(true);
    }
    const result = await authApi.verify({code, email});

    if (result.data && result.data.error) {
      if (mounted) {
        setSendingCode(false);
      }
      return Alert.alert('Error, try again!');
    }
    if (result.error) {
      if (mounted) {
        setSendingCode(false);
      }
      return Alert.alert('Error, try again!');
    }
    setSendingCode(false);

    //store it
    await save('verify:code', code);
    Alert.alert('A verification code has been sent to your phone and email!');

    return code;
  };
  const saveAndSendResetPassworCode = async email => {
    const code = Math.floor(100000 + Math.random() * 900000);
    try {
      if (mounted) {
        setSendingCodeStatus('pending');
        setSendingCode(true);
      }
      const result = await authApi.passordResetCode({
        code,
        email,
      });
      //store it
      await save('password:reset:email', email);
      await save('password:reset:code', code);
      if (mounted) {
        setSendingCode(false);
        setSendingCodeStatus('success');
      }
    } catch (error) {
      if (mounted) {
        setSendingCode(false);
        setSendingCodeStatus('failed');
        setSendingCodeError(error?.response?.data?.message);
      }
    }

    return code;
  };
  const logOut = async () => {
    try {
      if (mounted) {
        setLoggingOut(true);
      }
      await authApi.logOut();
      await remove('selectedStore');
      if (mounted) {
        setLoggingOut(false);
      }
      authStorage.removeToken();
      setTimeout(() => {
        setUser(null);
      }, 200);
    } catch (error) {
      if (mounted) {
        setLoggingOut(false);
      }
      Alert.alert('Enable to logout, Try again!');
    }
  };
  const getSupport = async () => {
    // await WebBrowser.openBrowserAsync(
    //   "https://tawk.to/chat/608fed0e55debc1e9711b45e/1fviisdga",
    //   {
    //     windowName: "SaveNow Support",
    //     showTitle: true,
    //     dismissButtonStyle: "close",
    //   }
    // ).catch((e) => {});
  };
  return {
    setUser,
    user,
    saveAndSendCode,
    saveUser,

    sendingCode,
    sendingCodeError,
    sendingCodeStatus,

    resetPassword,
    resetingPassword,
    resetingPasswordError,
    resetingPasswordStatus,

    signUp,
    signingUp,
    signUpError,
    signUpStatus,

    saveAndSendResetPassworCode,

    logOut,
    loggingOut,

    logIn,
    loggingIn,
    logInError,
    logInStatus,
    getSupport,
  };
};
export default useAuth;
