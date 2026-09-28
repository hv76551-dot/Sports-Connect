import React, {useEffect} from 'react';
import {Image, Dimensions, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MainContainer from '../../common/MainContainer';
import ImageAssets from '../../common/ImageAssets';
import {ScreenIdentifiers} from '../../routes';
import Colors from '../../common/Colors';
import ComponentView from '../../common';
import {getPrefs, getToken} from '../../common/Prefs';
import Constants from '../../common/Constants';

const {width, height} = Dimensions.get('window');

const Splash = props => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userData = await getPrefs('loginData');
        const token = await getToken();
        const data = JSON.parse(userData);
        if (userData) {
          console.log(data, token);
          Constants.access_token = token;
          Constants.userData = userData;
          setTimeout(() => {
            navigation.reset({
              index: 0,
              routes: [{name: 'Tabs'}],
            });
          }, 2000);
        } else {
          // navigation.navigate(ScreenIdentifiers.LoginScreen);
        }
      } catch (error) {
        console.log('Error checking login status: ', error);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <MainContainer>
      <Image
        source={ImageAssets.splash}
        style={{
          width: '100%',
          height: '90%',
          resizeMode: 'cover',
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          paddingVertical: 20,
        }}>
        <ComponentView.Button
          onPress={() => navigation.navigate(ScreenIdentifiers.LoginScreen)}
          title="Login"
          btnstyle={{
            width: width * 0.4,
            backgroundColor: Colors.white,
            borderWidth: 1,
            borderRadius: 5,
            height: height * 0.055,
          }}
          textStyle={{color: ComponentView.Colors.blacktxt}}
        />
        <ComponentView.Button
          onPress={() => navigation.navigate(ScreenIdentifiers.RegisterScreen)}
          title="Register"
          btnstyle={{
            width: width * 0.4,
            backgroundColor: Colors.black,
            borderWidth: 1,
            borderRadius: 5,
            height: height * 0.055,
          }}
          textStyle={{color: ComponentView.Colors.white}}
        />
      </View>
    </MainContainer>
  );
};

export default Splash;
