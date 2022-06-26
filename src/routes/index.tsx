import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import * as React from 'react';
import {
  ActivityIndicator,
  Alert,
  ColorSchemeName,
  Text,
  TouchableOpacity,
} from 'react-native';

import AuthContext from '../contexts/authContext';

import SavingsNavigator from './SavingsNavigator';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome, faPlus, faSackDollar} from '@fortawesome/free-solid-svg-icons';
import YieldsNavigator from './YieldsNavigator';
import AuthNavigator from './AuthNavigator';
import {Home, User, Wallet, Work} from 'react-native-iconly';
import Profile from '../screens/Auth/Profile';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import useAuth from '../hooks/useAuth';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const {user, setUser} = React.useContext(AuthContext);
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {user ? (
        <BottomTabNavigator /> //User is logged in and yet to select a store
      ) : (
        <AuthNavigator /> //User is not logged in and yet to select a store
      )}
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  const {logOut, loggingOut, getSupport} = useAuth();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Savings"
        component={SavingsNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size, focused}) => (
            <Home size={size} color={color} filled={focused} />
          ),
          title: 'Home',
        }}
      />
      <Tab.Screen
        name="Yields"
        component={YieldsNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size, focused}) => (
            <Wallet size={size} color={color} filled={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={({navigation}) => ({
          tabBarIcon: ({color, size, focused}) => (
            <User size={size} color={color} filled={focused} />
          ),
          headerRight: ({tintColor}) => (
            <TouchableOpacity
              style={{marginHorizontal: 10}}
              onPress={() => {
                Alert.alert('Log Out', 'Are you sure you want to Log Out?', [
                  {text: 'Cancel', style: 'cancel'},
                  {
                    text: 'Yes, Log Out',
                    style: 'destructive',
                    onPress: () => {
                      logOut();
                    },
                  },
                ]);
              }}>
              <Text style={{color: tintColor}}>
                {loggingOut ? <ActivityIndicator /> : 'Log Out'}
              </Text>
            </TouchableOpacity>
          ),
        })}
      />
    </Tab.Navigator>
  );
}
