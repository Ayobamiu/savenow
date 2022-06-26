import React, {useState} from 'react';
import {StatusBar, StyleSheet, useColorScheme} from 'react-native';
import {NewSavings, User} from './src/interfaces';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './src/routes';
import AuthContext from './src/contexts/authContext';
import SavingContext from './src/contexts/savingsContext';
import {RootSiblingParent} from 'react-native-root-siblings';

export default function App() {
  const colorScheme = useColorScheme();
  const [user, setUser] = useState<User | null>(null);
  const [mySavingsPlans, setMySavingsPlans] = useState<NewSavings[]>([]);

  return (
    <RootSiblingParent>
      <SafeAreaProvider>
        <SavingContext.Provider value={{mySavingsPlans, setMySavingsPlans}}>
          <AuthContext.Provider value={{user, setUser}}>
            <Navigation colorScheme={colorScheme} />
            <StatusBar animated={true} />
          </AuthContext.Provider>
        </SavingContext.Provider>
      </SafeAreaProvider>
    </RootSiblingParent>
  );
}
