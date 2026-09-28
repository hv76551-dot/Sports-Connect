import React, {useState} from 'react';
import {Dimensions, View, Text, Image} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';
import ComponentView from '../../common';
import {ScreenIdentifiers} from '../../routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileOptions from '../../component/profileOptions';
import { useSelector } from 'react-redux';
import { clearAll, setToken } from '../../common/Prefs';

const {width, height} = Dimensions.get('window');

const Profile = props => {
  const navigation = useNavigation();
  const user = useSelector(state => state.indexReducer.user);
  const [userName, setUserName] = useState('Abhishek Kumar');
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('loginData');
                setToken(null);
                clearAll()
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: ScreenIdentifiers.LoginScreen}],
        }),
      );
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  console.log(user,'=========')
  return (
    <ComponentView.MainContainer >
      <ComponentView.HeaderBar
        title="My Profile"
        onPress={() => props.navigation.goBack()}
      />
      <View
        style={{
          width: width * 0.9,
          paddingVertical: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom:20
        }}>
        <Image source={ComponentView.ImagePath.man}></Image>
        <View style={{width: '75%'}}>
          <Text
            style={[
              ComponentView.font_style.text_15_500,
              {color: ComponentView.Colors.black},
            ]}>
            {user?.name}
          </Text>
          <Text
            style={[
              ComponentView.font_style.text_15_500,
              {color: ComponentView.Colors.black},
            ]}>
            {user?.email}
          </Text>
        </View>
      </View>
      <ProfileOptions
        title="Update Profile"
        source={ComponentView.ImagePath.person}
        onPress={()=>props.navigation.navigate(ScreenIdentifiers.UpdateProfile)}
      />
      {/* <ProfileOptions
        title="Notifications"
        source={ComponentView.ImagePath.bell}
      /> */}
       <ProfileOptions
        title="ChnagePassword"
        source={ComponentView.ImagePath.bell}
        onPress={()=>props.navigation.navigate(ScreenIdentifiers.ChangePassword)}
      />
      <ProfileOptions
        title="Help Center"
        source={ComponentView.ImagePath.help}
      />
      <ProfileOptions
        title="Privacy Policy"
        source={ComponentView.ImagePath.policy}
      />
      <ProfileOptions
        title="LogOut"
        onPress={handleLogout}
        source={ComponentView.ImagePath.logout}
        tintColor={ComponentView.Colors.redtext}
      />
    </ComponentView.MainContainer>
  );
};

export default Profile;
