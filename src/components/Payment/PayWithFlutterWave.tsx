/** @format */

import React, {FC, useContext, useEffect, useState} from 'react';
import {PayWithFlutterwave} from 'flutterwave-react-native';
import {
  View,
  StyleSheet,
  Modal,
  Pressable,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
  Alert,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AppText from '../Text/AppText';
import AppTextInput from '../Input/AppTextInput';
import AppButton from '../Buttons/AppButton';
import showToast from '../../utilities/showToast';
import AuthContext from '../../contexts/authContext';
import useSavings from '../../hooks/useSavings';

type Props = {
  visible: boolean;
  toggleModal?: () => void;
  onSucces: (amount: number) => void;
  id: string;
};
const PayWithFlutterWaveComponent: FC<Props> = ({
  visible,
  toggleModal,
  id,
  onSucces,
}) => {
  let mounted = true;
  const [amount, setAmount] = useState<number>();
  const [processing, setProcessing] = useState(false);
  const [useProcessingModal, setUseProcessingModal] = useState(false);
  const {user} = useContext(AuthContext);
  const {addingSavings, addingSavingsStatus, addingSavingsError} = useSavings();
  useEffect(() => {
    if (addingSavingsStatus === 'success') {
      toggleModal && toggleModal();
    }
    if (addingSavingsStatus === 'failed') {
      Alert.alert(addingSavingsError || 'Error Logging In, Try Again.');
    }
  }, [addingSavingsStatus, addingSavingsError]);

  useEffect(() => {
    return () => {
      mounted = false;
    };
  }, []);

  const handleRedirect = data => {
    if (data.status === 'successful') {
      //   handlePaymentOnTheServer(data.transaction_id, data);

      amount && onSucces(amount);
    }
  };
  // const handler = useCallback(debounce(someFunction, 2000), []);

  return (
    <View>
      <Modal visible={visible} transparent>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.5)',
              width: '100%',
              height: '100%',
            }}>
            <Pressable style={{flex: 0.5, flexGrow: 1}} onPress={toggleModal} />
            <View
              style={{
                flex: 0.5,
                width: '100%',
                borderTopRightRadius: 15,
                borderTopLeftRadius: 16,
                backgroundColor: Colors.white,
                padding: 32,
                flexShrink: 1,
              }}>
              <View>
                {useProcessingModal && (
                  <View>
                    <ActivityIndicator
                      animating={processing || addingSavings}
                      color={Colors.primary}
                    />
                  </View>
                )}
                <AppText>Add funds </AppText>

                <View style={styles.mv10}>
                  <AppTextInput
                    placeholder="Amount"
                    title="How much?"
                    onChangeText={text => {
                      if (mounted) {
                        console.log({text});

                        setAmount(Number(text));
                      }
                    }}
                    defaultValue={amount?.toString()}
                    keyboardType="numeric"
                    returnKeyType="done"
                    editable={!addingSavings}
                  />
                </View>
                <View
                  style={[
                    styles.row,
                    {
                      width: '100%',
                      justifyContent: 'space-between',
                      marginTop: 30,
                    },
                  ]}>
                  <AppButton
                    title="Go back"
                    secondary
                    style={{
                      borderColor: Colors.black,
                      borderWidth: 1,
                      paddingHorizontal: 40,
                    }}
                    onPress={toggleModal}
                    disabled={processing || addingSavings}
                  />

                  <PayWithFlutterwave
                    onRedirect={handleRedirect}
                    options={{
                      tx_ref: new Date().toString(),
                      authorization:
                        'FLWPUBK_TEST-8695ab6c72a954f50398f53e2e6a8a38-X',
                      customer: {
                        email: user?.email || '',
                      },
                      amount: Number(amount),
                      currency: 'NGN',
                      payment_options: 'card',
                      customizations: {
                        title: 'Add to your savings',
                        description:
                          'While recharging your account, note 1.7% processing fee.',
                      },
                    }}
                    customButton={props => (
                      <AppButton
                        title="Submit"
                        style={{
                          paddingHorizontal: 40,
                        }}
                        onPress={() => {
                          if (amount) {
                            props.onPress();
                          } else {
                            showToast('Enter amount!');
                          }
                        }}
                        disabled={processing || addingSavings}
                      />
                    )}
                  />
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {},
  full_width: {flex: 1, height: '100%'},
  mv10: {marginVertical: 10},
  picker: {
    borderLeftColor: Colors.secondary,
    borderLeftWidth: 1,
    width: 120,
    height: '100%',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
  },
  pickedItem: {
    backgroundColor: Colors.light,
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    borderRadius: 5,
  },
  pickerItem: {
    backgroundColor: Colors.white,
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickedItemText: {fontWeight: 'bold', color: Colors.white},
  pickerItemText: {fontWeight: 'bold', color: Colors.black},
  row: {flexDirection: 'row', alignItems: 'center'},
  statusContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});
export default PayWithFlutterWaveComponent;
