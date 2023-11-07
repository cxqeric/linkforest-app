import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import React from 'react';
import Navigation from '../Components/Navigation';
import {colors} from '../../utils/colors';

const Links = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Navigation title={'LINKS'} />
      <ScrollView style={{width: '90%'}}>
        <View style={styles.content}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Links;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    backgroundColor: colors.light,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 18,
    width: '100%',
  },
});
