import {StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Screens/Home';
import Dashboard from './Screens/Dashboard';
import Profile from './Screens/Dashboard/Profile';
import Themes from './Screens/Dashboard/Themes';
import Settings from './Screens/Settings';
import {Provider} from 'react-redux';
import {store} from './Redux Toolkit/store';
import Username from './Screens/Username';
import Websites from './Screens/Dashboard/Websites';
import {LogLevel, OneSignal} from 'react-native-onesignal';
import {ONESIGNAL} from './ONESIGNAL';

const App = () => {
  const Stack = createNativeStackNavigator();
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);
  OneSignal.initialize(ONESIGNAL);
  OneSignal.Notifications.requestPermission(true);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
        routeNameRef.current = currentRouteName;
      }}>
      <Provider store={store}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Websites"
            component={Websites}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Themes"
            component={Themes}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Username"
            component={Username}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
