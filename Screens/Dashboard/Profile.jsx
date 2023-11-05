import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import Navigation from '../Components/Navigation';
import {colors} from '../../utils/colors';

const Profile = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Navigation />
      <ScrollView style={{width: '90%'}}>
        <View style={styles.content}>
          <Image
            source={require('../../assets/logo.png')}
            style={{width: 100, height: 100, borderRadius: 20}}
          />
          <View>
            <TouchableOpacity style={styles.removeBtn}>
              <Text style={styles.removeTxt}>Remove Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.uploadBtn}>
              <Text style={styles.uploadTxt}>Upload Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.content}>
          <View>
            <Text>Display Name</Text>
            <TextInput />
          </View>
          <View>
            <Text>Message</Text>
            <TextInput />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Montserrat-SemiBold',
    color: colors.dark,
    fontSize: 22,
  },
  content: {
    backgroundColor: colors.light,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    marginBottom: 18,
  },
  removeBtn: {
    borderColor: colors.delete,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 2,
    marginBottom: 12,
  },
  removeTxt: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    color: colors.delete,
  },
  uploadBtn: {
    borderColor: colors.green,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 2,
  },
  uploadTxt: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    color: colors.green,
  },
});
