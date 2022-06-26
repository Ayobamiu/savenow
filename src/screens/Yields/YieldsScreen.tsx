import {FlatList, StyleSheet, Text, useColorScheme, View} from 'react-native';
import React from 'react';
import Section from '../../components/Section';
import {YieldsTabScreenProps} from '../../routes/types';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const data = [
  {
    id: '1',
    details: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi
asperiores, maxime ad expedita animi nisi fugiat incidunt quo ex
est.`,
  },
  {
    id: '2',
    details: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi
asperiores, maxime ad expedita animi nisi fugiat incidunt quo ex
est.`,
  },
  {
    id: '3',
    details: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi
asperiores, maxime ad expedita animi nisi fugiat incidunt quo ex
est.`,
  },
  {
    id: '4',
    details: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi
asperiores, maxime ad expedita animi nisi fugiat incidunt quo ex
est.`,
  },
  {
    id: '5',
    details: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi
asperiores, maxime ad expedita animi nisi fugiat incidunt quo ex
est.`,
  },
];
const YieldsScreen = ({
  navigation,
  route,
}: YieldsTabScreenProps<'YieldsScreen'>) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <FlatList
      data={data}
      renderItem={({index, item, separators}) => (
        <Section
          onPress={() => {
            navigation.navigate('YieldDetailsScreen', item);
          }}
          title={`Yield ${item.id}`}
          children={<Text>{item.details}</Text>}
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
            Total Yields
          </Text>
          <Text
            numberOfLines={1}
            style={[
              styles.sectionTitle,
              {
                color: isDarkMode ? Colors.white : Colors.black,
              },
            ]}>
            N 1,000,000
          </Text>
        </View>
      }
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default YieldsScreen;

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
