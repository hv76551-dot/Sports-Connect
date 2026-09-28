import React, {useState} from 'react';
import {Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ComponentView from '../../common/index';
import {isEmpty, showToast} from '../../common/Helper';
import {loginApi} from '../../API/APICall';
import {setLoading} from '../../redux/actions/indexActions';
import {useDispatch} from 'react-redux';
import {setPrefs, setToken} from '../../common/Prefs';
import Constants from '../../common/Constants';
import { ScreenIdentifiers } from '../../routes';

const {width, height} = Dimensions.get('window');

const isValidEmail = email => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
};

const Login = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validate = async () => {
    if (isEmpty(email)) {
      showToast('Please enter email address');
    } else if (!isValidEmail(email)) {
      showToast('Please enter a valid email address');
    } else if (isEmpty(password)) {
      showToast('Please enter a password');
    } else {
      await handleSubmit();
    }
  };

  const handleSubmit = async () => {
    console.log('Starting login process...');
    console.log('Email:', email);
    console.log('Password length:', password.length);
    
    dispatch(setLoading(true));
    const params = {
      email: email,
      password: password,
    };
    
    console.log('Calling login API with params:', params);
    
    loginApi(
      params,
      async res => {
        console.log('LOGIN API SUCCESS ======>>>>>', res);
        if (res?.status) {
          dispatch(setLoading(false));
          showToast(res?.message);
          const loginData = res?.data;
          const token = res?.data?.token;
          setPrefs('loginData', JSON.stringify(loginData));
          setToken(token);
          Constants.access_token = token;
          Constants.userData = loginData;
          console.log('Login successful, navigating to SideMenu');
          // props.navigation.replace('Tabs');
          props.navigation.replace('SideMenu');
        } else {
          dispatch(setLoading(false));
          showToast(res?.message);
        }
      },
      error => {
        console.log('LOGIN API ERROR ======>>>>>', error);
        showToast(error?.message || 'Login failed');
        dispatch(setLoading(false));
      },
    );
  };

  return (
    <ComponentView.MainContainer bgcolor={ComponentView.Colors.white}>
      <View style={{width: '90%', paddingVertical: 10}}>
        <TouchableOpacity
          style={{width: '20%', paddingVertical: 10}}
          onPress={() => props.navigation.navigate(ScreenIdentifiers.SplashScreen)}>
          <Image style={{height:33,width:33}} source={ComponentView.ImagePath.back} />
        </TouchableOpacity>
        <Text style={[ComponentView.font_style.text_24_500]}>Login</Text>
      </View>

      <ComponentView.Input inputTitle={'Email'}
        textInputStyle={{
          width: '100%',
          borderWidth: 1.5,
          borderRadius: 5,
          height: height * 0.055,
          paddingHorizontal: 10,
          marginRight: 10,
        }}
        placeholder={'Email Address'}
        onValue={value => setEmail(value)}
        value={email}
        keyboardType={ComponentView.KeyBoardType.email}
        viewStyle={{marginTop:10}}
      />
      <ComponentView.Input inputTitle={'Password'}
        textInputStyle={{
          width: '100%',
          borderWidth: 1.5,
          borderRadius: 5,
          height: height * 0.055,
          paddingHorizontal: 10,
          marginRight: 10,
        }}
        placeholder={'Password'}
        onValue={value => setPassword(value)}
        value={password}
        secureTextEntry={true}
        keyboardType={ComponentView.KeyBoardType.default}
        viewStyle={{marginTop:20}}
      />
      <ComponentView.Button
        title={'Login'}
        btnstyle={{marginTop: 40, width: '90%'}}
        onPress={validate}
      />
    </ComponentView.MainContainer>
  );
};

export default Login;
