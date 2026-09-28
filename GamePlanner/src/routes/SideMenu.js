import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Pressable,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {useDispatch, useSelector} from 'react-redux';
import {CommonActions, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TabNavigator from './NavigationTabs';
import Colors from '../common/Colors';
const Drawer = createDrawerNavigator();
const {width, height} = Dimensions.get('window');

const SideMenu = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const CustomDrawerContent = props => (
    <DrawerContentScrollView
      contentContainerStyle={{
        height: '100%',
        width: '100%',
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      {...props}>
      <View style={{width: width, height: '100%'}}>
      </View>
    </DrawerContentScrollView>
  );

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: width >= 768 ? 'permanent' : 'front',
        headerShown: false,
        overlayColor: 'transparent',
        drawerStyle: styles.drawerStyle,
        drawerStatusBarAnimation: 'slide',
        sceneContainerStyle: {
          elevation: 3,
          backgroundColor: Colors.primary,
          height: height,
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name={'Dashboard'} component={TabNavigator} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerStyle: {
    backgroundColor: Platform.OS === 'ios' ? Colors.primary : Colors.white,
    width: width * 0.75,
    elevation: 3,
  },
});

export default SideMenu;
