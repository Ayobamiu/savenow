import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {YieldsTabScreenProps} from '../../routes/types';

const YieldDetailsScreen = ({
  navigation,
  route,
}: YieldsTabScreenProps<'YieldDetailsScreen'>) => {
  const {id} = route.params;
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: `Yield ${id}`,
    });
  }, [navigation]);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Yeild Screen {id}</Text>
    </View>
  );
};

export default YieldDetailsScreen;

const styles = StyleSheet.create({});
