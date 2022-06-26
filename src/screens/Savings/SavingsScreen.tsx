import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import React, {useCallback, useContext, useState} from 'react';
import Section from '../../components/Section';
import {SavingsTabScreenProps} from '../../routes/types';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {durationOptions, NewSavings} from '../../interfaces';
import SavingContext from '../../contexts/savingsContext';
import ListEmptyComponent from '../../components/Others/ListEmptyComponent';
import {Search} from 'react-native-iconly';
import {currencyWrapper} from '../../utilities/currencyWrapper';
import useSavings from '../../hooks/useSavings';

const SavingsScreen = ({
  navigation,
  route,
}: SavingsTabScreenProps<'SavingsScreen'>) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {mySavingsPlans, setMySavingsPlans} = useContext(SavingContext);
  console.log({savings: mySavingsPlans});
  const {getAllMySavingsPlans} = useSavings();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    (async () => {
      await getAllMySavingsPlans();
      // getOfflineSalesPendingUpload();
      setRefreshing(false);
    })();
  }, []);
  let totalSavings = 0;
  for (let index = 0; index < mySavingsPlans.length; index++) {
    const plan = mySavingsPlans[index];
    totalSavings += plan.savings
      .map(item => item.amount)
      ?.reduce((prev, next) => prev + next);
  }
  console.log({totalSavings});

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      data={mySavingsPlans}
      renderItem={({index, item, separators}) => (
        <Section
          onPress={() => {
            navigation.navigate('SavingDetailsScreen', item);
          }}
          title={item.title || 'N/A'}
          children={
            <View>
              <View style={{flexDirection: 'row'}}>
                <Text>Sales goal:</Text>
                <Text>
                  {item.salesGoal ? currencyWrapper(item.salesGoal) : 'N/A'}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text>Current Savings:</Text>
                <Text>
                  {currencyWrapper(
                    item.savings
                      .map(item => item.amount)
                      ?.reduce((prev, next) => prev + next),
                  )}
                </Text>
              </View>
              {/* <View style={{flexDirection: 'row'}}>
                <Text>Yield Date:</Text>
                <Text>
                  {item.yieldDate && new Date(item.yieldDate).toDateString()}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text>Saving Scheme:</Text>
                <Text>
                  {item.savingScheme === 'goals'
                    ? 'Specific Goal'
                    : item.savingScheme === 'rainyDays'
                    ? 'Rainy Days'
                    : 'N/A'}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text>Strictness:</Text>
                <Text>{item.strictLevel}</Text>
              </View> */}
              <View style={{flexDirection: 'row'}}>
                <Text>Duration:</Text>
                <Text>
                  {durationOptions.find(i => i._id == item.duration)?.label ||
                    'N/A'}
                </Text>
              </View>
            </View>
          }
        />
      )}
      ListHeaderComponent={
        <View style={[styles.totalBox, {backgroundColor: Colors.primary}]}>
          <Text
            numberOfLines={2}
            style={[
              styles.sectionDescription,
              {
                color: isDarkMode ? Colors.light : Colors.dark,
              },
            ]}>
            Total Savings
          </Text>
          <Text
            numberOfLines={1}
            style={[
              styles.sectionTitle,
              {
                color: isDarkMode ? Colors.white : Colors.black,
              },
            ]}>
            {currencyWrapper(totalSavings)}
          </Text>
        </View>
      }
      keyExtractor={(item, index) => index.toString()}
      ListEmptyComponent={
        <ListEmptyComponent
          headerText="You have no savings yet"
          text="easily add your first savings here."
          buttonText="Add savings"
          onPress={() => {
            navigation.navigate('ChooseSavingType');
          }}
          visible={mySavingsPlans.length === 0}
          iconComponent={
            <Search
              size={164}
              color={Colors.primary}
              style={{alignSelf: 'center'}}
            />
          }
        />
      }
    />
  );
};

export default SavingsScreen;

const styles = StyleSheet.create({
  sectionDescription: {
    fontSize: 18,
    fontWeight: '400',
  },
  sectionTitle: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: '600',
  },
  totalBox: {
    height: 150,
    borderRadius: 8,
    marginTop: 32,
    marginHorizontal: 24,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
