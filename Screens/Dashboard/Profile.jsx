import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Linking,
} from 'react-native';
import React, {useState} from 'react';
import Navigation from '../Components/Navigation';
import {colors} from '../../utils/colors';
import UploadIcon from 'react-native-vector-icons/Feather';
import UserLinks from '../Components/UserLinks';

const Profile = () => {
  const [username, setUsername] = useState('krish7104');
  const [profile, setProfile] = useState({
    name: '',
    description: '',
    image:
      'https://firebasestorage.googleapis.com/v0/b/link-forest.appspot.com/o/noImage.png?alt=media&token=af7f81d0-1c93-4120-9824-df8c62d90fcd',
  });

  return (
    <SafeAreaView style={styles.wrapper}>
      <Navigation />
      <ScrollView style={{width: '90%'}}>
        <View style={styles.content}>
          <View style={styles.imageView}>
            <Image
              source={{uri: profile.image}}
              style={{width: 120, height: 120, borderRadius: 20}}
            />
            <TouchableOpacity style={styles.uploadBtn} activeOpacity={0.8}>
              <Text style={styles.uploadTxt}>Upload</Text>
              <UploadIcon
                name="upload"
                size={18}
                color={colors.green}
                style={{marginLeft: 6}}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.inputView}>
            <Text style={styles.inputTxt}>Display Name</Text>
            <TextInput
              style={styles.inputField}
              value={profile.name}
              onChangeText={text => setProfile({...profile, name: text})}
            />
          </View>
          <View style={styles.inputView}>
            <Text style={styles.inputTxt}>Description</Text>
            <TextInput
              multiline={true}
              style={styles.textarea}
              value={profile.description}
              onChangeText={text => setProfile({...profile, description: text})}
              placeholder="Enter your description"
            />
          </View>
          <TouchableOpacity activeOpacity={0.8} style={styles.saveBtn}>
            <Text style={styles.saveTxt}>Save Changes</Text>
          </TouchableOpacity>
        </View>
        <UserLinks username={username} />
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
  imageView: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
  },
  uploadBtn: {
    borderColor: colors.green,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 2,
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  uploadTxt: {
    color: colors.green,
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
  inputView: {
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 10,
  },
  inputTxt: {
    fontFamily: 'Montserrat-Bold',
    color: colors.dark,
    fontSize: 14,
    marginBottom: 6,
  },
  textarea: {
    fontFamily: 'Montserrat-Medium',
    color: colors.dark,
    fontSize: 14,
    borderRadius: 6,
    borderWidth: 1.4,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderColor: colors.gray,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  inputField: {
    fontFamily: 'Montserrat-Medium',
    color: colors.dark,
    fontSize: 14,
    borderRadius: 6,
    borderWidth: 1.4,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderColor: colors.gray,
  },
  saveBtn: {
    backgroundColor: colors.green,
    marginTop: 10,
    width: '60%',
    paddingVertical: 10,
    borderRadius: 8,
  },
  saveTxt: {
    fontFamily: 'Montserrat-Medium',
    color: colors.light,
    textAlign: 'center',
  },
});
