import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import AuthContext from '../../contexts/authContext';
import Section from '../../components/Section';
import AppButton from '../../components/Buttons/AppButton';
const Profile = () => {
  const {user, setUser} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Section
        title={`${user?.firstName} ${user?.lastName}`}
        children={<Text>{user?.email} </Text>}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
