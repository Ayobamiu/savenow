import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {SavingsTabScreenProps} from '../../routes/types';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Section from '../../components/Section';
import {currencyWrapper} from '../../utilities/currencyWrapper';
import {durationOptions} from '../../interfaces';
import AppButton from '../../components/Buttons/AppButton';
import PayWithFlutterWaveComponent from '../../components/Payment/PayWithFlutterWave';
import showToast from '../../utilities/showToast';
import useSavings from '../../hooks/useSavings';

const SavingDetailsScreen = ({
  navigation,
  route,
}: SavingsTabScreenProps<'SavingDetailsScreen'>) => {
  const {
    _id,
    savingScheme,
    duration,
    salesGoal,
    strictLevel,
    title,
    yieldDate,
    amount,
    savings,
  } = route.params;
  console.log({params: route.params});

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title,
    });
  }, [navigation]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [newSavings, setNewSavings] = useState(0);
  const {addSavings} = useSavings();

  console.log({newSavings});

  return (
    <KeyboardAwareScrollView contentInsetAdjustmentBehavior="automatic">
      <Section
        title="Savings"
        children={
          <View>
            <Text>{title || 'N/A'}</Text>
          </View>
        }
      />
      <Section
        title="Current savings"
        children={
          <View>
            <Text>
              {currencyWrapper(
                savings
                  .map(item => item.amount)
                  ?.reduce((prev, next) => prev + next) + newSavings,
              )}
            </Text>
          </View>
        }
      />
      <Section
        title="Savings goals"
        children={
          <View>
            <Text>{salesGoal ? currencyWrapper(salesGoal) : 'N/A'}</Text>
          </View>
        }
      />
      <Section
        title="Savings Scheme"
        children={
          <View>
            <Text>
              {savingScheme === 'goals'
                ? 'Specific Goal'
                : savingScheme === 'rainyDays'
                ? 'Rainy Days'
                : 'N/A'}
            </Text>
          </View>
        }
      />
      <Section
        title="Savings Yield Date"
        children={
          <View>
            <Text>
              {yieldDate ? new Date(yieldDate).toDateString() : 'N/A'}
            </Text>
          </View>
        }
      />
      <Section
        title="Savings Duration"
        children={
          <View>
            <Text>
              {durationOptions.find(i => i._id == duration)?.label || 'N/A'}
            </Text>
          </View>
        }
      />
      <Section
        title="Savings Strictness"
        children={
          <View>
            <Text>{strictLevel}</Text>
          </View>
        }
      />
      <AppButton
        title="+  Add Savings"
        buttonStyle={{width: '90%', alignSelf: 'center', marginVertical: 10}}
        onPress={() => {
          setShowPaymentModal(true);
        }}
      />
      <AppButton
        title="Yield"
        inverse
        buttonStyle={{width: '90%', alignSelf: 'center', marginVertical: 10}}
        onPress={() => {
          if (savingScheme === 'goals') {
            if (new Date(yieldDate!).getTime() <= new Date().getTime()) {
              //Yield
            } else {
              if (strictLevel === 'fair') {
                return Alert.alert(
                  `You will be charged ${currencyWrapper(
                    salesGoal! * 0.2,
                  )} to yield before ${new Date(yieldDate!).toDateString()}`,
                  '',
                  [
                    {
                      text: 'Continue',
                      onPress: () => {},
                      style: 'destructive',
                    },
                    {text: 'Cancel', style: 'cancel'},
                  ],
                );
              }
              if (strictLevel === 'mild') {
                return Alert.alert(
                  `You will be charged ${currencyWrapper(
                    salesGoal! * 0.1,
                  )} to yield before ${new Date(yieldDate!).toDateString()}`,
                  '',
                  [
                    {
                      text: 'Continue',
                      onPress: () => {},
                      style: 'destructive',
                    },
                    {text: 'Cancel', style: 'cancel'},
                  ],
                );
              }
              if (strictLevel === 'strict') {
                return Alert.alert(
                  `You cannot yield until ${new Date(
                    yieldDate!,
                  ).toDateString()}`,
                );
              }
            }
          } else {
            //yield
          }
        }}
      />
      {_id && (
        <PayWithFlutterWaveComponent
          visible={showPaymentModal}
          toggleModal={() => setShowPaymentModal(false)}
          id={_id}
          onSucces={async a => {
            const newSavingsValue = await addSavings(a, _id);
            newSavingsValue && setNewSavings(newSavingsValue.amount);
          }}
        />
      )}
    </KeyboardAwareScrollView>
  );
};

export default SavingDetailsScreen;

const styles = StyleSheet.create({});
