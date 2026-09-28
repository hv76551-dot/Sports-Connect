import React, {useState} from 'react';
import {Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ComponentView from '../../common/index';
import {
  isEmpty,
  isValidIndianMobileNumber,
  showToast,
} from '../../common/Helper';
import {ScreenIdentifiers} from '../../routes';
import {registerApi} from '../../API/APICall';
import {useDispatch} from 'react-redux';
import {setLoading} from '../../redux/actions/indexActions';

const Register = props => {
  const dispatch = useDispatch();
  const {width, height} = Dimensions.get('window');
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const isValidEmail = email => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };
  const validate = async () => {
    if (isEmpty(email)) {
      showToast('Please enter email address');
    } else if (!isValidEmail(email)) {
      showToast('Please enter a valid email address');
    } else if (isEmpty(mobile)) {
      showToast('Please enter mobile number');
    } else if (!isValidIndianMobileNumber(mobile)) {
      showToast('Please enter a valid 10-digit Indian mobile number');
    } else if (isEmpty(name)) {
      showToast('Please enter full name');
    } else if (isEmpty(password)) {
      showToast('Please enter a password');
    } else if (isEmpty(gender)) {
      showToast('Please enter  Gender');
    } else {
      await handleSubmit();
    }
  };
  const handleSubmit = () => {
    dispatch(setLoading(true));
    const params = {
      email,
      password,
      name,
      mobile,
      gender,
    };
    registerApi(
      params,
      res => {
        console.log('REGISTER API SUCCESS:', res);
        dispatch(setLoading(false));

        if (res?.status) {
          showToast(res?.message);
          navigation.replace(ScreenIdentifiers.LoginScreen);
        } else {
          showToast(res?.message);
        }
      },
      err => {
        showToast(err?.message);
        dispatch(setLoading(false));
      },
    );
  };
  return (
    <ComponentView.MainContainer bgcolor={ComponentView.Colors.white}>
      <View
        style={{
          width: width,
          paddingVertical: 10,
          width: '90%',
        }}>
        <TouchableOpacity onPress={() => props.navigation.navigate(ScreenIdentifiers.SplashScreen)} style={{width: '20%', paddingVertical: 10}}>
          <Image
            style={{height: 33, width: 33}}
            source={ComponentView.ImagePath.back}></Image>
        </TouchableOpacity>
        <Text style={[ComponentView.font_style.text_24_500]}>Register</Text>
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
        onChangeText={value => setEmail(value)}
        value={email}
        keyboardType={ComponentView.KeyBoardType.default}
        viewStyle={{marginTop:10}}
      />
      <ComponentView.Input inputTitle={'Phone Number'}
        textInputStyle={{
          width: '100%',
          borderWidth: 1.5,
          borderRadius: 5,
          height: height * 0.055,
          paddingHorizontal: 10,
          marginRight: 10,
        }}
        placeholder={'Mobile Number'}
        maxLength={10}
        onChangeText={value => setMobile(value)}
        value={mobile}
        keyboardType={ComponentView.KeyBoardType.mobile}
        viewStyle={{marginTop:20}}
      />
      <ComponentView.Input inputTitle={'Full Name'}
        textInputStyle={{
          width: '100%',
          borderWidth: 1.5,
          borderRadius: 5,
          height: height * 0.055,
          paddingHorizontal: 10,
          marginRight: 10,
        }}
        placeholder={'Name'}
        onChangeText={value => setName(value)}
        value={name}
        keyboardType={ComponentView.KeyBoardType.default}
        viewStyle={{marginTop:20}}
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
        viewStyle={{marginTop:20}}
        placeholder={'Create Password'}
        onChangeText={value => setPassword(value)}
        value={password}
        secureTextEntry={true}
        keyboardType={ComponentView.KeyBoardType.default}
      />
      <ComponentView.Input inputTitle={'Gender'}
        textInputStyle={{
          width: '100%',
          borderWidth: 1.5,
          borderRadius: 5,
          height: height * 0.055,
          paddingHorizontal: 10,
          marginRight: 10,
        }}
        placeholder={'Male'}
        viewStyle={{marginTop:20}}
        onChangeText={value => setGender(value)}
        value={gender}
        keyboardType={ComponentView.KeyBoardType.default}
      />
      <ComponentView.Button
        title={'Register'}
        btnstyle={{marginTop: 40, width: '90%'}}
        onPress={validate}
      />
    </ComponentView.MainContainer>
  );
};

export default Register;
