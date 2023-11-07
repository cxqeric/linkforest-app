import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../../utils/colors';
import Icon from 'react-native-vector-icons/Ionicons';

const UserLinks = ({username}) => {
  const linkForestLink = [
    {
      index: 0,
      link: 'linkforest.web.app',
    },
    {
      index: 1,
      link: 'linkfo.web.app',
    },
  ];

  const LinkCard = data => {
    return (
      <View
        style={{
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          marginBottom: 10,
        }}>
        <Text
          style={styles.linkTxt}
          onPress={() => Linking.openURL(`https://${data.link}/${username}`)}>
          {data.link}/{username}
        </Text>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <TouchableOpacity activeOpacity={0.8} style={styles.iconBtn}>
            <Icon name="share-social-outline" color={colors.dark} size={18} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.iconBtn}>
            <Icon name="copy-outline" color={colors.dark} size={18} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.content}>
      <Text style={styles.linkMainTitle}>
        Your Link <Text style={{color: colors.green}}>Forest</Text>
      </Text>
      {linkForestLink.map(item => {
        return <LinkCard link={item.link} key={item.index} />;
      })}
    </View>
  );
};

export default UserLinks;

const styles = StyleSheet.create({
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
  linkMainTitle: {
    fontFamily: 'Montserrat-Bold',
    color: colors.dark,
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 14,
  },
  iconBtn: {
    padding: 6,
    marginLeft: 4,
  },
  linkTxt: {
    color: colors.dark,
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
  },
});
