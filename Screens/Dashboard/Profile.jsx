import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Navigation from '../Components/Navigation';
import {colors} from '../../utils/colors';
import UploadIcon from 'react-native-vector-icons/Feather';
import UserLinks from '../Components/UserLinks';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {setData} from '../../Redux Toolkit/user';

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const data = useSelector(state => state.dataSlice.userData);
  const dispatch = useDispatch();
  const [profile, setProfile] = useState({
    name: '',
    description: '',
    image:
      'https://firebasestorage.googleapis.com/v0/b/link-forest.appspot.com/o/noImage.png?alt=media&token=af7f81d0-1c93-4120-9824-df8c62d90fcd',
    username: '',
  });
  useEffect(() => {
    setProfile({
      username: data.username,
      uid: data.uid,
      name: data.name,
      image: data.profile,
    });
  }, [data]);

  useEffect(() => {
    getDataHandler();
  }, []);

  const getDataHandler = async () => {
    const user = await firestore()
      .collection('Link Forests')
      .doc(data.uid)
      .get();
    dispatch(setData(user.data()));
    setProfile({
      username: user.data().username,
      uid: user.data().uid,
      name: user.data().name,
      description: user.data().description,
      image: user.data().image,
    });
  };

  const saveChangesHandler = () => {
    setLoading(true);
    firestore()
      .collection('Link Forests')
      .doc(data.uid)
      .update({
        ...profile,
      })
      .then(() => {
        setLoading(false);
        ToastAndroid.show('Profile Updated', ToastAndroid.BOTTOM);
      });
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <Navigation title={'PROFILE'} />
      <ScrollView style={{width: '90%'}}>
        <UserLinks username={profile.username} />
        <KeyboardAvoidingView style={styles.content}>
          <View style={styles.imageView}>
            {!profile.image ? (
              <Image
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/link-forest.appspot.com/o/noImage.png?alt=media&token=af7f81d0-1c93-4120-9824-df8c62d90fcd',
                }}
                style={{width: 100, height: 100, borderRadius: 120}}
              />
            ) : (
              <Image
                source={{uri: profile.image}}
                style={{width: 100, height: 100, borderRadius: 120}}
              />
            )}
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
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.saveBtn}
            onPress={saveChangesHandler}>
            {!loading && <Text style={styles.saveTxt}>Save Changes</Text>}
            {loading && (
              <ActivityIndicator color={colors.light} size={'small'} />
            )}
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    flex: 1,
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
    marginBottom: 22,
    marginTop: 8,
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
    fontFamily: 'Montserrat-Medium',
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
    height: 40,
  },
  saveTxt: {
    fontFamily: 'Montserrat-Medium',
    color: colors.light,
    textAlign: 'center',
  },
});
