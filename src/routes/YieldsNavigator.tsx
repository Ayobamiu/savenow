import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import YieldsScreen from '../screens/Yields/YieldsScreen';
import YieldDetailsScreen from '../screens/Yields/YieldDetailsScreen';

const Stack = createNativeStackNavigator();
const YieldsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="YieldsScreen"
        component={YieldsScreen}
        options={{title: 'Yields'}}
      />
      <Stack.Screen name="YieldDetailsScreen" component={YieldDetailsScreen} />
    </Stack.Navigator>
  );
};

export default YieldsNavigator;
