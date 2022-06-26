import {Alert, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderText from '../../components/Text/HeaderText';
import AppTextInput from '../../components/Input/AppTextInput';
import DatePicker from 'react-native-date-picker';
import AppButton from '../../components/Buttons/AppButton';
import {SavingsTabScreenProps} from '../../routes/types';
import SavingDurationModal from '../../components/Input/SavingDurationModal';
import AppCurrencyInput from '../../components/Input/AppCurrencyInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {durationOptions} from '../../interfaces';

const AddSavingsDetails = ({
  navigation,
  route,
}: SavingsTabScreenProps<'AddSavingsDetails'>) => {
  const {savingScheme} = route.params;
  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(
    savingScheme === 'rainyDays' ? 'Rainy Days' : '',
  );
  const [duration, setDuration] = useState('');
  const [salesGoal, setSalesGoal] = useState<number | null>(null);
  useEffect(() => {
    if (savingScheme === 'rainyDays') {
      setTitle('Rainy Days');
    }
  }, [savingScheme]);

  return (
    <KeyboardAwareScrollView
      style={{padding: 24}}
      contentInsetAdjustmentBehavior="automatic">
      <HeaderText>Add Saving Details</HeaderText>
      <AppTextInput
        placeholder="What are you saving for?"
        title="What are you saving for?"
        keyboardType="default"
        onChangeText={setTitle}
        clearTextOnFocus={false}
        defaultValue={title}
      />

      <SavingDurationModal
        title="How Often do you want to save?"
        placeholder="Select duration"
        data={durationOptions}
        onSelect={value => {
          setDuration(value._id);
        }}
      />
      {savingScheme === 'goals' && (
        <AppCurrencyInput
          placeholder="How much is your savings goal?"
          title="How much is your savings goal?"
          keyboardType="number-pad"
          clearTextOnFocus={false}
          value={salesGoal}
          onChangeValue={(txt: number | null) => {
            setSalesGoal(Number(txt));
          }}
          editable={true}
        />
      )}
      {savingScheme === 'goals' && (
        <AppTextInput
          placeholder={
            date
              ? new Date(date).toDateString()
              : 'When will you like to yield your savings?'
          }
          title="When will you like to yield your savings?"
          keyboardType="email-address"
          editable={false}
          clearTextOnFocus={false}
          onPressIn={() => {
            setOpen(true);
          }}
        />
      )}
      <AppButton
        title="Continue"
        onPress={() => {
          if (!title) {
            return Alert.alert('What you are saving for?');
          }
          if (!duration) {
            return Alert.alert('How often do you want to save?');
          }
          if (savingScheme === 'goals' && !salesGoal) {
            return Alert.alert('How much is your savings goal?');
          }
          if (savingScheme === 'goals' && !date) {
            return Alert.alert('When do you want to yield your savings?');
          }

          if (savingScheme == 'goals') {
            navigation.navigate('SavingsStrictLevel', {
              yieldDate: date?.getTime(),
              savingScheme,
              title,
              duration,
              salesGoal: salesGoal || 0,
            });
          } else {
            navigation.navigate('PreveiwSavings', {
              savingScheme,
              duration,
              title,
              strictLevel: 'none',
            });
          }
        }}
      />
      <DatePicker
        mode="date"
        modal
        open={open}
        date={date || new Date()}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </KeyboardAwareScrollView>
  );
};

export default AddSavingsDetails;

const styles = StyleSheet.create({});
