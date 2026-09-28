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
import {registerApi, updateProfileApi} from '../../API/APICall';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading} from '../../redux/actions/indexActions';

const UpdateProfile = props => {
    const user = useSelector(state => state.indexReducer.user);
  const dispatch = useDispatch();
  const {width, height} = Dimensions.get('window');
  const navigation = useNavigation();
  const [email, setEmail] = useState(user?.email || '');
  const [mobile, setMobile] = useState(user?.mobile || '');
  const [name, setName] = useState(user?.name || '');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState(user?.gender || '');
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
    } else {
       handleSubmit();
    }
  };
  const handleSubmit = () => {
    dispatch(setLoading(true));
    const params = {
      email,
      name,
      mobile,
      gender,
    };
    updateProfileApi(
      params,
      res => {
        console.log('PROFILE UPDATE API SUCCESS:', res);
        dispatch(setLoading(false));

        if (res?.status) {
          showToast(res?.message);
          props.navigation.replace('SideMenu');
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
      <ComponentView.HeaderBar
                   title="Update Profile"
                   onPress={() => props.navigation.goBack()}
                 />
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
      <ComponentView.Input inputTitle={'Mobile Number'}
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
        placeholder={'Enter email'}
        onChangeText={value => setName(value)}
        value={name}
        keyboardType={ComponentView.KeyBoardType.default}
        viewStyle={{marginTop:20}}
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
        placeholder={'gender'}
        onChangeText={value => setGender(value)}
        value={gender}
        keyboardType={ComponentView.KeyBoardType.default}
        viewStyle={{marginTop:20}}
      />
      <ComponentView.Button
        title={'UPDATE'}
        btnstyle={{marginTop: 40, width: '90%'}}
        onPress={validate}
      />
    </ComponentView.MainContainer>
  );
};

export default UpdateProfile;
