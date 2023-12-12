import {StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from './Dashboard/Profile';
import Themes from './Dashboard/Themes';
import {colors} from '../utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SocialLinks from './Dashboard/SocialLinks';
import Analytics from './Dashboard/Analytics';
import Websites from './Dashboard/Websites';

const Dashboard = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          let iconName;
          if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Websites') {
            iconName = focused ? 'link' : 'link-outline';
          } else if (route.name === 'Themes') {
            iconName = focused ? 'color-filter' : 'color-filter-outline';
          } else if (route.name === 'Socials') {
            iconName = 'logo-instagram';
          } else if (route.name === 'Analytics') {
            iconName = focused ? 'analytics' : 'analytics-outline';
          }
          return <Ionicons name={iconName} size={24} color={color} />;
        },
        tabBarActiveTintColor: colors.green,
        tabBarInactiveTintColor: 'gray',
        gestureEnabled: true,
        swipeEnabled: true,
        tabBarStyle: {
          height: 65,
          padding: 10,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontFamily: 'Montserrat-Medium',
        },
      })}>
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Socials"
        component={SocialLinks}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Websites"
        component={Websites}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Analytics"
        component={Analytics}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Themes"
        component={Themes}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
