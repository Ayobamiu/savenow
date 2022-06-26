import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SavingsTabScreenProps} from '../../routes/types';
import Section from '../../components/Section';
import HeaderText from '../../components/Text/HeaderText';

const SavingsStrictLevel = ({
  navigation,
  route,
}: SavingsTabScreenProps<'SavingsStrictLevel'>) => {
  const {yieldDate, savingScheme, _id, duration, salesGoal, title} =
    route.params;
  const strictnessLevels = [
    {
      title: 'Mild',
      details: `Yeilding your saving before ${new Date(
        yieldDate!,
      ).toDateString()} will attract a 10% charge on your savings. It will be donated for good cause😊.`,
      onPress: () => {
        navigation.navigate('PreveiwSavings', {
          yieldDate,
          savingScheme,
          _id,
          duration,
          salesGoal,
          title,
          strictLevel: 'mild',
        });
      },
    },
    {
      title: 'Fairly Strict',
      details: `Yeilding your saving before ${new Date(
        yieldDate!,
      ).toDateString()} will attract a 20% charge on your savings. It will be donated for good cause😊.`,
      onPress: () => {
        navigation.navigate('PreveiwSavings', {
          yieldDate,
          savingScheme,
          _id,
          duration,
          salesGoal,
          title,
          strictLevel: 'fair',
        });
      },
    },
    {
      title: 'Very Strict',
      details: `You can only yield on the ${new Date(
        yieldDate!,
      ).toDateString()}`,
      onPress: () => {
        navigation.navigate('PreveiwSavings', {
          yieldDate,
          savingScheme,
          _id,
          duration,
          salesGoal,
          title,
          strictLevel: 'strict',
        });
      },
    },
    {
      title: `No restrictions 🤓`,
      details: `You can yield your saving anytime the need comes.`,
      onPress: () => {
        navigation.navigate('AddSavingsDetails', {savingScheme: 'rainyDays'});
      },
    },
  ];

  return (
    <FlatList
      data={strictnessLevels}
      renderItem={({item}) => (
        <Section
          title={item.title}
          children={<Text>{item.details}</Text>}
          onPress={item.onPress}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={
        <View style={{margin: 24, marginBottom: 0}}>
          <HeaderText>How hard do you want to go?</HeaderText>
        </View>
      }
      // ListFooterComponent={
      //   <View style={{margin: 24, marginBottom: 0}}>
      //     <AppButton title="Save" />
      //   </View>
      // }
    />
  );
};

export default SavingsStrictLevel;

const styles = StyleSheet.create({});
