import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ToastAndroid,
  Linking,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Navigation from './Components/Navigation';
import {colors} from '../utils/colors';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {WEB_CLIENT_ID} from '../Config';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {firebase} from '@react-native-firebase/storage';

const Settings = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const uid = useSelector(state => state.userSlice.uid);
  const data = useSelector(state => state.userSlice.data);
  const logoutHandler = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.navigate('Home');
      })
      .catch(() => {
        ToastAndroid.show('Error: Failed To Logout!', ToastAndroid.BOTTOM);
      });
  };

  const links = {
    review:
      'https://play.google.com/store/apps/details?id=com.krish.linkforest',
    feedback: 'https://krishjotaniya.netlify.app/contactme?ref=LinkForest-App',
    developer: 'https://krishjotaniya.netlify.app/',
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
    });
  }, []);

  const googleSignInBtnHandler = async () => {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  };

  const deleteAccountHandler = () => {
    setModalVisible(false);
    firestore()
      .collection('Link Forests')
      .doc(uid)
      .delete()
      .then(() => {
        console.log('Link Forest Deleted');
      })
      .catch(error => {
        console.log(error);
        ToastAndroid.show(
          'Something Went Wrong [Link Forest]',
          ToastAndroid.BOTTOM,
        );
      });
    firestore()
      .collection('Analytics')
      .doc(uid)
      .delete()
      .then(() => {
        console.log('Analytics Deleted');
      })
      .catch(error => {
        console.log(error);
        ToastAndroid.show(
          'Something Went Wrong [Analytics]',
          ToastAndroid.BOTTOM,
        );
      });
    data?.image && removeStorageHandler();
    let user = auth().currentUser;
    user
      .delete()
      .then(() => navigation.navigate('Home'))
      .catch(error => {
        console.log(error);
        ToastAndroid.show(
          'Something Went Wrong [Authentication]',
          ToastAndroid.BOTTOM,
        );
      });
  };

  const removeStorageHandler = () => {
    var profileRef = firebase.storage().ref(`Link Forests Profiles/${uid}`);
    profileRef
      .delete()
      .then(function () {
        console.log('Profile Photo Deleted');
      })
      .catch(function (error) {
        ToastAndroid.show(
          'Something Went Wrong [Profile Photo]',
          ToastAndroid.BOTTOM,
        );
        console.error('Error deleting profile photo:', error);
      });
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <Navigation title={'SETTINGS'} />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          style={styles.btnStyle}
          activeOpacity={0.8}
          onPress={() => Linking.openURL(links.review)}>
          <Text style={styles.btnTxt}>Give Review</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnStyle}
          activeOpacity={0.8}
          onPress={() => Linking.openURL(links.feedback)}>
          <Text style={styles.btnTxt}>Feedback</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnStyle}
          activeOpacity={0.8}
          onPress={() => Linking.openURL(links.developer)}>
          <Text style={styles.btnTxt}>Developer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnStyle}
          activeOpacity={0.8}
          onPress={() => setModalVisible(!modalVisible)}>
          <Text style={styles.btnTxt}>Delete Account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnStyle}
          activeOpacity={0.8}
          onPress={logoutHandler}>
          <Text style={styles.btnTxt}>Logout</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setEditIndex(-1);
          setNewLink({link: '', title: ''});
        }}>
        <View style={styles.modalCont}>
          <View
            style={{
              backgroundColor: colors.light,
              width: '85%',
              borderRadius: 10,
              padding: 10,
            }}>
            <Text
              style={{
                fontFamily: 'Montserrat-Bold',
                color: '#ef4444',
                fontSize: 22,
                textAlign: 'center',
                marginVertical: 12,
              }}>
              Are You Sure?
            </Text>
            <Text
              style={{
                fontFamily: 'Montserrat-Medium',
                color: colors.dark,
                fontSize: 15,
                textAlign: 'center',
                marginBottom: 12,
              }}>
              Account deletion is a permanent action, and once completed, there
              is no possibility of recovering or regaining access to the
              account.
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginVertical: 12,
              }}>
              <TouchableOpacity
                style={{width: '45%'}}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Montserrat-SemiBold',
                    color: colors.dark,
                    backgroundColor: colors.lightgray,
                    paddingVertical: 10,
                    borderRadius: 6,
                  }}>
                  Keep
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{width: '45%'}}
                onPress={() =>
                  googleSignInBtnHandler()
                    .then(deleteAccountHandler)
                    .catch(error =>
                      ToastAndroid.show(`Error: ${error}`, ToastAndroid.BOTTOM),
                    )
                }>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Montserrat-SemiBold',
                    color: colors.light,
                    backgroundColor: '#ef4444',
                    paddingVertical: 10,
                    borderRadius: 6,
                  }}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    minWidth: '70%',
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
  modalCont: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
    flex: 1,
    paddingTop: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000030',
  },
});
