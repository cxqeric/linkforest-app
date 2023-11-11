import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import Navigation from './Components/Navigation';
import {colors} from '../utils/colors';
import auth from '@react-native-firebase/auth';

const Settings = ({navigation}) => {
  const logoutHandler = () => {
    auth()
      .signOut()
      .then(() => {
        ToastAndroid.show('Logout!', ToastAndroid.BOTTOM);
        navigation.navigate('Home');
      });
  };
  return (
    <SafeAreaView style={styles.wrapper}>
      <Navigation title={'SETTINGS'} />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity style={styles.btnStyle}>
          <Text style={styles.btnTxt}>Give Review</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnStyle}>
          <Text style={styles.btnTxt}>Feedback</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnStyle}>
          <Text style={styles.btnTxt}>Developer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnStyle}>
          <Text style={styles.btnTxt}>Delete Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnStyle} onPress={logoutHandler}>
          <Text style={styles.btnTxt}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
  },
  btnStyle: {
    minWidth: '60%',
    backgroundColor: colors.dark,
    paddingHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  btnTxt: {
    fontFamily: 'Montserrat-SemiBold',
    width: '100%',
    textAlign: 'center',
    fontSize: 16,
    color: colors.light,
  },
});
