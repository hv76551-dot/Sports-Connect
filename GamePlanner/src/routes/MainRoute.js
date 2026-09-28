import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ScreenIdentifiers, Screens} from '.';
import {fadAnimation} from './AnimationUtils';
import NavigationTabs from './NavigationTabs';
const Stack = createStackNavigator();
const MainRoute = ({}) => {
  return (
    <Stack.Navigator initialRouteName={ScreenIdentifiers.SplashScreen}>
      <Stack.Screen
        name={ScreenIdentifiers.SplashScreen}
        component={Screens.SplashScreen}
        options={fadAnimation}
      />
      <Stack.Screen
        name={'Tabs'}
        component={NavigationTabs}
        options={fadAnimation}
      />
        <Stack.Screen
        name={ScreenIdentifiers.SideMenu}
        component={Screens.SideMenu}
        options={fadAnimation}
      />
      <Stack.Screen
        name={ScreenIdentifiers.LoginScreen}
        component={Screens.LoginScreen}
        options={fadAnimation}
      />
      <Stack.Screen
        name={ScreenIdentifiers.RegisterScreen}
        component={Screens.RegisterScreen}
        options={fadAnimation}
      />
      <Stack.Screen
        name={ScreenIdentifiers.DashboardScreen}
        component={Screens.DashboardScreen}
        options={fadAnimation}
      />
      <Stack.Screen
        name={ScreenIdentifiers.GamesScreen}
        component={Screens.GamesScreen}
        options={fadAnimation}
      />
      <Stack.Screen
        name={ScreenIdentifiers.VenuesScreen}
        component={Screens.VenuesScreen}
        options={fadAnimation}
      />
      <Stack.Screen
        name={ScreenIdentifiers.ScheduleScreen}
        component={Screens.ScheduleScreen}
        options={fadAnimation}
      />
      <Stack.Screen
        name={ScreenIdentifiers.ProfileScreen}
        component={Screens.ProfileScreen}
        options={fadAnimation}
      />
      <Stack.Screen
        name={ScreenIdentifiers.HostGame}
        component={Screens.HostGame}
        options={fadAnimation}
      />
      <Stack.Screen
        name={ScreenIdentifiers.JoinGame}
        component={Screens.JoinGame}
        options={fadAnimation}
      />
       <Stack.Screen
        name={ScreenIdentifiers.GameDetailScreen}
        component={Screens.GameDetailScreen}
        options={fadAnimation}
      />
      <Stack.Screen
        name={ScreenIdentifiers.VenueBooking}
        component={Screens.VenueBooking}
        options={fadAnimation}
      />
       <Stack.Screen
        name={ScreenIdentifiers.CreateVanue}
        component={Screens.CreateVanue}
        options={fadAnimation}
      />
       <Stack.Screen
        name={ScreenIdentifiers.ChangePassword}
        component={Screens.ChangePassword}
        options={fadAnimation}
      />
       <Stack.Screen
        name={ScreenIdentifiers.UpdateProfile}
        component={Screens.UpdateProfile}
        options={fadAnimation}
      />
    </Stack.Navigator>
  );
};

export default MainRoute;
