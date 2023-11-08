import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Navigation from '../Components/Navigation';
import {colors} from '../../utils/colors';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

const SocialLinkInput = ({icon, placeholder, value, onChangeText}) => {
  return (
    <View style={styles.socialLinkCont}>
      <View>
        <Icon name={icon} color={colors.dark} size={24} style={{width: 30}} />
      </View>
      <TextInput
        style={styles.inputField}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={colors.gray}
      />
    </View>
  );
};

const SocialLinks = () => {
  const [loading, setLoading] = useState(false);
  const data = useSelector(state => state.dataSlice.userData);

  const [links, setLinks] = useState({
    email: '',
    instagram: '',
    facebook: '',
    github: '',
    twitter: '',
    linkedin: '',
    youtube: '',
    snapchat: '',
    threads: '',
  });

  useEffect(() => {
    getDataHandler();
  }, []);

  const getDataHandler = async () => {
    const user = await firestore()
      .collection('Link Forests')
      .doc(data.uid)
      .get();
    if (user.data().socialLinks) {
      setLinks({...user.data().socialLinks});
    }
  };

  const saveChangesHandler = () => {
    setLoading(true);
    firestore()
      .collection('Link Forests')
      .doc(data.uid)
      .update({
        socialLinks: {...links},
      })
      .then(() => {
        setLoading(false);
        ToastAndroid.show('Social Links Updated', ToastAndroid.BOTTOM);
      });
  };

  const handleSocialLinkChange = (key, value) => {
    setLinks({
      ...links,
      [key]: value,
    });
  };

  const socialLinksData = [
    {key: 'envelope', placeholder: 'abc@gmail.com'},
    {key: 'github', placeholder: 'https://www.github.com/linkforest'},
    {key: 'linkedin', placeholder: 'https://www.linkedin.com/linkforest'},
    {key: 'instagram', placeholder: 'https://www.instagram.com/linkforest'},
    {key: 'facebook', placeholder: 'https://www.facebook.com/linkforest'},
    {key: 'twitter', placeholder: 'https://www.twitter.com/linkforest'},
    {key: 'threads', placeholder: 'https://www.threads.com/linkforest'},
    // {key: 'youtube', placeholder: 'https://www.youtube.com/linkforest'},
    {key: 'snapchat', placeholder: 'https://www.snapchat.com/linkforest'},
  ];

  return (
    <SafeAreaView style={styles.wrapper}>
      <Navigation title={'SOCIAL LINKS'} />
      <ScrollView style={{width: '90%'}}>
        {socialLinksData.map(linkData => (
          <SocialLinkInput
            key={linkData.key}
            icon={linkData.key}
            placeholder={linkData.placeholder}
            value={links[linkData.key === 'envelope' ? 'email' : linkData.key]}
            onChangeText={text =>
              handleSocialLinkChange(
                linkData.key === 'envelope' ? 'email' : linkData.key,
                text,
              )
            }
          />
        ))}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.saveBtn}
          onPress={saveChangesHandler}>
          {!loading && <Text style={styles.saveTxt}>Save Changes</Text>}
          {loading && <ActivityIndicator color={colors.light} size={'small'} />}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SocialLinks;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.light,
  },
  socialLinkCont: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor: colors.dark,
    borderWidth: 1.4,
    paddingHorizontal: 10,
    marginBottom: 22,
    borderRadius: 8,
  },
  inputField: {
    fontFamily: 'Montserrat-Medium',
    color: colors.dark,
    fontSize: 14,
    borderRadius: 6,
    width: '94%',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  saveBtn: {
    backgroundColor: colors.green,
    width: '100%',
    paddingVertical: 10,
    borderRadius: 8,
    height: 45,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  saveTxt: {
    fontFamily: 'Montserrat-Medium',
    color: colors.light,
    textAlign: 'center',
    fontSize: 16,
  },
});
