import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SavingsTabScreenProps} from '../../routes/types';
import Section from '../../components/Section';
import {faGolang} from '@fortawesome/free-brands-svg-icons';
import HeaderText from '../../components/Text/HeaderText';

const ChooseSavingType = ({
  navigation,
  route,
}: SavingsTabScreenProps<'ChooseSavingType'>) => {
  const savingPlans = [
    {
      title: 'Specific Goal',
      details: `This is a saving for a specific goal. You have to set a savings goal e.g. $2000, set the yield date e.g. a year, and you can only yield the savings on or after the yield date.`,
      onPress: () => {
        navigation.navigate('AddSavingsDetails', {savingScheme: 'goals'});
      },
    },
    {
      title: 'Rainy Days',
      details: `This is a saving for rainy days. You don't have to set a savings goal, and you can yield the savings any time the rainy day comes.`,
      onPress: () => {
        navigation.navigate('AddSavingsDetails', {
          savingScheme: 'rainyDays',
          strictLevel: 'none',
        });
      },
    },
  ];
  return (
    <FlatList
      data={savingPlans}
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
          <HeaderText>Choose a saving Scheme</HeaderText>
        </View>
      }
    />
  );
};

export default ChooseSavingType;

const styles = StyleSheet.create({
  savingTypeBox: {
    width: Dimensions.get('screen').width * 0.4,
    height: Dimensions.get('screen').height * 0.4,
    borderRadius: 8,
  },
});
