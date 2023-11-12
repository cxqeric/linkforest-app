import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import Navigation from '../Components/Navigation';
import {colors} from '../../utils/colors';
import firestore from '@react-native-firebase/firestore';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  InterstitialAd,
  AdEventType,
} from 'react-native-google-mobile-ads';
import {ANALYTICS_BANNER, ANALYTICS_INTERSTITIAL} from '../../AdsData';

const adUnitIdInterstitial = __DEV__
  ? TestIds.INTERSTITIAL
  : ANALYTICS_INTERSTITIAL;
const adUnitId = __DEV__ ? TestIds.BANNER : ANALYTICS_BANNER;

const interstitial = InterstitialAd.createForAdRequest(adUnitIdInterstitial, {
  requestNonPersonalizedAdsOnly: true,
});

const Analytics = () => {
  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        interstitial.show();
      },
    );

    interstitial.load();

    return unsubscribe;
  }, []);

  const data = useSelector(state => state.userSlice.data);
  const uid = useSelector(state => state.userSlice.uid);
  const [analyticsData, setAnalyticsData] = useState();

  const formatDateString = date => {
    const day = String(date.getDate());
    const month = String(date.getMonth() + 1);
    const year = String(date.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const roomRef = firestore().collection('Analytics').doc(uid);
    const unsubscribe = roomRef.onSnapshot(documentSnapshot => {
      if (documentSnapshot.exists) {
        setAnalyticsData(documentSnapshot.data());
      }
    });

    return () => unsubscribe();
  }, [data]);

  const getTodayAndYesterdayData = () => {
    const currentDate = new Date();
    const yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - 1);
    const formattedCurrentDate = formatDateString(currentDate);
    const formattedYesterdayDate = formatDateString(yesterday);
    const todayData = analyticsData
      ? analyticsData[formattedCurrentDate] || 0
      : 0;
    const yesterdayData = analyticsData
      ? analyticsData[formattedYesterdayDate] || 0
      : 0;
    return {todayData, yesterdayData};
  };

  const getThisMonthData = () => {
    const thisMonthData = Object.keys(analyticsData || {}).reduce(
      (acc, date) => {
        if (
          new Date(date).getMonth() === new Date().getMonth() &&
          JSON.stringify(new Date(date).getDate()) ==
            JSON.stringify(new Date().getFullYear()).slice(2)
        ) {
          acc += analyticsData[date];
        }
        return acc;
      },
      0,
    );
    return thisMonthData;
  };

  const getThisYearData = () => {
    const thisYearData = Object.keys(analyticsData || {}).reduce(
      (acc, date) => {
        if (
          JSON.stringify(new Date(date).getDate()) ==
          JSON.stringify(new Date().getFullYear()).slice(2)
        ) {
          acc += analyticsData[date];
        }
        return acc;
      },
      0,
    );

    return thisYearData;
  };

  const {todayData, yesterdayData} = getTodayAndYesterdayData();
  const thisYearData = getThisYearData();
  const thisMonthData = getThisMonthData();

  const cardData = [
    {
      index: 0,
      name: 'Today',
      data: todayData,
    },
    {
      index: 1,
      name: 'Yesterday',
      data: yesterdayData,
    },
    {
      index: 2,
      name: 'This Month',
      data: thisMonthData,
    },
    {
      index: 3,
      name: 'This Year',
      data: thisYearData,
    },
  ];

  return (
    <SafeAreaView style={styles.wrapper}>
      <Navigation title={'ANALYTICS'} />
      <Text
        style={{
          fontFamily: 'Montserrat-Bold',
          color: colors.light,
          marginBottom: 12,
          fontSize: 16,
          textTransform: 'uppercase',
          letterSpacing: 1,
          backgroundColor: colors.green,
          width: '100%',
          textAlign: 'center',
          paddingVertical: 10,
        }}>
        Experimental Feature!
      </Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {cardData.map(item => (
          <View style={styles.card} key={item.index}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardData}>{item.data}</Text>
            <Text style={styles.cardSubtitle}>Views</Text>
          </View>
        ))}
        <Text
          style={{
            color: colors.gray,
            fontFamily: 'Montserrat-Medium',
            textAlign: 'center',
            lineHeight: 22,
            marginTop: 20,
          }}>
          The Analytics data is available starting from November 12, 2023.
        </Text>
      </ScrollView>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </SafeAreaView>
  );
};

export default Analytics;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
  },
  scrollViewContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  card: {
    backgroundColor: colors.light,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    width: '45%',
    marginBottom: 10,
  },
  cardTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15,
    color: colors.gray,
    textAlign: 'left',
    marginBottom: 6,
  },
  cardData: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 26,
    color: colors.dark,
    textAlign: 'left',
    marginBottom: 6,
  },
  cardSubtitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15,
    color: colors.gray,
    textAlign: 'left',
  },
});
