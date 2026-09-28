import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ComponentView from '../../common/index';
import {isEmpty, showToast} from '../../common/Helper';
import {chnagePasswordAPi, loginApi} from '../../API/APICall';
import {setLoading} from '../../redux/actions/indexActions';
import {useDispatch} from 'react-redux';

const {width, height} = Dimensions.get('window');

const ChangePassword = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [oldpassword, setOldPassword] = useState('');
  const [newpassword, setNewPassword] = useState('');

  const validate = async () => {
    if (isEmpty(oldpassword)) {
      showToast('Please enter old password');
    }  else if (isEmpty(newpassword)) {
      showToast('Please enter new password');
    } else {
      await handleSubmit();
    }
  };

  const handleSubmit = async () => {
    dispatch(setLoading(true));
    const params = {
        currentPassword: oldpassword,
        newPassword: newpassword,
    };
    chnagePasswordAPi(
      params,
      async res => {
        console.log('CHNAGE PASSWORD API SUCCESS ======>>>>>', res);
        if (res?.status) {
          dispatch(setLoading(false));
          showToast(res?.message);
          props.navigation.replace('SideMenu');
        } else {
          dispatch(setLoading(false));
          showToast(res?.message);
        }
      },
      error => {
        console.log('LOGIN API ERROR ======>>>>>', error);
        showToast(error?.message);
        dispatch(setLoading(false));
      },
    );
  };

  return (
    <ComponentView.MainContainer bgcolor={ComponentView.Colors.white}>
     <ComponentView.HeaderBar
             title="Change Password"
             onPress={() => props.navigation.goBack()}
           />

      <ComponentView.Input inputTitle={'Old Password'}
        textInputStyle={{
          width: '100%',
          borderWidth: 1.5,
          borderRadius: 5,
          height: height * 0.055,
          paddingHorizontal: 10,
          marginRight: 10,
        }}
        placeholder={'Old password'}
        onChangeText={value => setOldPassword(value)}
        value={oldpassword}
        secureTextEntry={true}
        keyboardType={ComponentView.KeyBoardType.email}
        viewStyle={{marginTop:10}}
      />
      <ComponentView.Input inputTitle={'New Password'}
        textInputStyle={{
          width: '100%',
          borderWidth: 1.5,
          borderRadius: 5,
          height: height * 0.055,
          paddingHorizontal: 10,
          marginRight: 10,
        }}
        placeholder={'New password'}
        onChangeText={value => setNewPassword(value)}
        value={newpassword}
        secureTextEntry={true}
        keyboardType={ComponentView.KeyBoardType.default}
        viewStyle={{marginTop:20}}
      />
      <ComponentView.Button
        title={'UPDATE PASSWORD'}
        btnstyle={{marginTop: 30, width: '90%'}}
        onPress={validate}
      />
    </ComponentView.MainContainer>
  );
};

export default ChangePassword;
