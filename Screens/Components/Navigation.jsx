import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../../utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
const Navigation = ({title}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.navWrapper}>
      <Text style={styles.navTxt}>{title}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <Ionicons name={'settings-outline'} size={24} color={colors.dark} />
      </TouchableOpacity>
    </View>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  navWrapper: {
    width: '100%',
    backgroundColor: colors.green,
    elevation: 20,
    paddingVertical: 18,
    shadowColor: colors.green,
    marginBottom: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  navTxt: {
    fontFamily: 'Montserrat-Bold',
    color: colors.dark,
    textAlign: 'center',
    fontSize: 20,
    letterSpacing: 1,
  },
});
