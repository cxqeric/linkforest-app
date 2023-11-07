import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import React from 'react';
import Navigation from '../Components/Navigation';

const Settings = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Navigation title={'THEMES'} />
      <ScrollView></ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
  },
});
