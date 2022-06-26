import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Section from '../../components/Section';
import {SavingsTabScreenProps} from '../../routes/types';
import HeaderText from '../../components/Text/HeaderText';
import AppButton from '../../components/Buttons/AppButton';
import {durationOptions} from '../../interfaces';
import SavingContext from '../../contexts/savingsContext';
import {currencyWrapper} from '../../utilities/currencyWrapper';

const PreveiwSavings = ({
  navigation,
  route,
}: SavingsTabScreenProps<'PreveiwSavings'>) => {
  const {
    yieldDate,
    savingScheme,
    _id,
    duration,
    salesGoal,
    title,
    strictLevel,
  } = route.params;
  const {savings, setSavings} = useContext(SavingContext);
  console.log({savings});

  return (
    <KeyboardAwareScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={{padding: 24}}>
        <HeaderText>Confirm Savings Details</HeaderText>
      </View>
      <Section
        title="Savings Description"
        children={
          <View>
            <Text>{title || 'N/A'}</Text>
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
      <View style={{margin: 24, marginBottom: 0}}>
        <AppButton
          title="Confirm & Save"
          onPress={() => {
            setSavings([
              ...savings,
              {
                yieldDate,
                savingScheme,
                _id: (Math.random() * 100000).toString(),
                duration,
                salesGoal,
                title,
                strictLevel,
              },
            ]);
            navigation.navigate('SavingsScreen');
          }}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default PreveiwSavings;

const styles = StyleSheet.create({});
