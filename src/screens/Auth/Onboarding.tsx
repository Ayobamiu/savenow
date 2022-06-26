/** @format */

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AppButton from '../../components/Buttons/AppButton';
import {AuthTabScreenProps} from '../../routes/types';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBank, faSackDollar, faSave} from '@fortawesome/free-solid-svg-icons';

const Onboarding = ({navigation}: AuthTabScreenProps<'Onboarding'>) => {
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        justifyContent: 'center',
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FontAwesomeIcon
          icon={faSackDollar}
          color={Colors.primary}
          size={200}
        />
        <Text
          style={[{color: Colors.primary, marginVertical: 20}, styles.header]}>
          Save for Rainy Days
        </Text>
      </View>

      <AppButton
        buttonStyle={{marginTop: 50}}
        style={{width: '80%'}}
        title="Get Started"
        onPress={() => {
          navigation.navigate('Login');
        }}
      />
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {alignSelf: 'center', marginVertical: 40},
  slideBox: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 15,
    // marginBottom: 20,
  },
  subHeader: {
    lineHeight: 19,
    width: '85%',
    marginTop: 15,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },
});
