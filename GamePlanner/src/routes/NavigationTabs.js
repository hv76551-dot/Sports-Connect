import React from 'react';
import {StyleSheet, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Colors from '../common/Colors';
import Dashboard from '../screen/Dashboard/Dashboard';
import ComponentView from '../common';
import MyTabs from './MyTabs';
import Games from '../screen/Games/games';
import Venues from '../screen/Venues/Venues';
import Schedule from '../screen/Schedule/Schedule';
import Profile from '../screen/MyProfile/Profile';
const Tab = createBottomTabNavigator();
const TabNavigator = props => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      removeClippedSubviews={true}
      tabBarOptions={{
        showLabel: false,

        style: {
          backgroundColor: Colors.white,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 2,
        },
        activeBackgroundColor: Colors.white,
      }}>
      <Tab.Screen
        name="Home"
        component={Dashboard}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => (
            <MyTabs
              focused={focused}
              source={ComponentView.ImagePath.home}
              title={'Home'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Games"
        component={Games}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => (
            <MyTabs
              focused={focused}
              source={ComponentView.ImagePath.game}
              title={'Games'}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Venues"
        component={Venues}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => (
            <MyTabs
              focused={focused}
              source={ComponentView.ImagePath.venue}
              title={'Venues'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={Schedule}
        options={{
          tabBarIcon: ({focused}) => (
            <MyTabs
              focused={focused}
              source={ComponentView.ImagePath.calendar}
              title={'Schedule'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <MyTabs
              focused={focused}
              source={ComponentView.ImagePath.user}
              title={'Profile'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor:
      Platform.OS == 'ios' ? Colors.greenbordercolor : Colors.greytxt,
    backgroundColor: 'red',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 3.5,
    elevation: 2,
  },
  selectedTab: {
    width: 0,
    height: 6,
    backgroundColor: Colors.white,
    borderTopRightRadius: 3,
    borderTopLeftRadius: 3,
    // marginTop: 5,
    bottom: 0,
  },
});

export default TabNavigator;
