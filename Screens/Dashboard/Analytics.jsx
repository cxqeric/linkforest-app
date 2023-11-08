import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import Navigation from '../Components/Navigation';
import {colors} from '../../utils/colors';
import firestore from '@react-native-firebase/firestore';

const Analytics = () => {
  const data = useSelector(state => state.userSlice.data);
  const [analyticsData, setAnalyticsData] = useState();

  const formatDateString = date => {
    const day = String(date.getDate());
    const month = String(date.getMonth() + 1);
    const year = String(date.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const roomRef = firestore().collection('Analytics').doc(data.uid);
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
        if (new Date(date).getMonth() === new Date().getMonth()) {
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
          JSON.stringify(new Date().getFullYear()).slice(2) ===
          new Date().getFullYear()
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
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {cardData.map(item => (
          <View style={styles.card} key={item.index}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardData}>{item.data}</Text>
            <Text style={styles.cardSubtitle}>Views</Text>
          </View>
        ))}
      </ScrollView>
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
