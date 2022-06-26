import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SavingsScreen from '../screens/Savings/SavingsScreen';
import SavingDetailsScreen from '../screens/Savings/SavingDetailsScreen';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {TouchableOpacity} from 'react-native';
import ChooseSavingType from '../screens/Savings/ChooseSavingType';
import {User} from 'react-native-iconly';
import SavingsStrictLevel from '../screens/Savings/SavingsStrictLevel';
import AddSavingsDetails from '../screens/Savings/AddSavingsDetails';
import PreveiwSavings from '../screens/Savings/PreveiwSavings';

const Stack = createNativeStackNavigator();
const SavingsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SavingsScreen"
        component={SavingsScreen}
        options={({route, navigation}) => ({
          title: 'Savings',
          headerRight: ({tintColor}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ChooseSavingType');
              }}>
              <FontAwesomeIcon icon={faPlus} color={tintColor} />
            </TouchableOpacity>
          ),
          headerLeft: ({tintColor}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Profile');
              }}>
              <User color={tintColor} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="SavingDetailsScreen"
        component={SavingDetailsScreen}
        options={{}}
      />
      <Stack.Screen
        name="AddSavingsDetails"
        component={AddSavingsDetails}
        options={{title: ''}}
      />
      <Stack.Screen
        name="ChooseSavingType"
        component={ChooseSavingType}
        options={{title: ''}}
      />
      <Stack.Screen
        name="SavingsStrictLevel"
        component={SavingsStrictLevel}
        options={{title: ''}}
      />
      <Stack.Screen
        name="PreveiwSavings"
        component={PreveiwSavings}
        options={{title: ''}}
      />
    </Stack.Navigator>
  );
};

export default SavingsNavigator;
