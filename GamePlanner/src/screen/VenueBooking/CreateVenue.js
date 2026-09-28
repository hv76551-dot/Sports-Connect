import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import ComponentView from '../../common';
import {useNavigation} from '@react-navigation/native';
import ImageAssets from '../../common/ImageAssets';
import CustomDropDown from '../../common/CustomDropDown';
import ModalView from '../../component/ModalView';
import { ScreenIdentifiers } from '../../routes';
const {width, height} = Dimensions.get('window');
const CreateVenue = props => {
  const navigation = useNavigation();
  const [chooseSport, setChooseSport] = useState(null);
  const [selectVenue, setSelectVenue] = useState(null);
  const [skill, setSkill] = useState(null);
  const [visible, setVisible] = useState(false);
  const sportsOptions = [
    'Football',
    'Basketball',
    'Cricket',
    'Hockey',
    'Tennis',
  ];
  const playerOtions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const bookContent = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: ComponentView.Colors.rgbabg,
        alignItems: 'center',
        justifyContent: 'center',
        // justifyContent: 'flex-end',
      }}>
      {/* <TouchableWithoutFeedback onPress={() => setVisible(false)}>
        <View style={{flex: 1}} />
      </TouchableWithoutFeedback> */}
      <TouchableOpacity
        onPress={() => setVisible(false)}
        style={{width: '20%', paddingVertical: 10}}>
        <Image
          style={{
            height: 33,
            width: 33,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
          source={ComponentView.ImagePath.close}></Image>
      </TouchableOpacity>
      <View
        style={{
          width: '90%',
          backgroundColor: ComponentView.Colors.white,
          paddingVertical: 10,
          borderRadius: 22,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          style={{
            height: 100,
            width: 100,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
          source={ComponentView.ImagePath.booked}></Image>
        <Text style={[ComponentView.font_style.Montserrat_18_700]}>
          Venue Booked
        </Text>
        <View style={{paddingVertical: 10}}>
          <ComponentView.Button
            // onPress={() => navigation.navigate(ScreenIdentifiers.LoginScreen)}
            title="Share the Venue"
            btnstyle={{
              width: width * 0.4,
              backgroundColor: ComponentView.Colors.white,
              borderWidth: 1,
              borderRadius: 5,
              height: height * 0.05,
              marginTop: 20,
            }}
            textStyle={[
              ComponentView.font_style.text_12_500,
              {color: ComponentView.Colors.black},
            ]}
          />
          <ComponentView.Button
            onPress={() =>
              navigation.navigate(ScreenIdentifiers.VenueBooking,setVisible(false))
            }
            title="View Venue Detail"
            btnstyle={{
              width: width * 0.4,
              backgroundColor: ComponentView.Colors.black,
              borderWidth: 1,
              borderRadius: 5,
              height: height * 0.05,
              marginTop: 20,
            }}
            textStyle={[
              ComponentView.font_style.text_12_500,
              {color: ComponentView.Colors.white},
            ]}
          />
        </View>
      </View>
    </View>
  );
  return (
    <ComponentView.MainContainer bgcolor={ComponentView.Colors.white}>
      <ComponentView.HeaderBar title="Host a Game" />
      <View
        style={{
          width: width,
          // backgroundColor: 'red',
          paddingVertical: 10,
        }}>
        <CustomDropDown
          // inputTitle="Choose Sports"
          righticon={ImageAssets.down}
          value={chooseSport ? chooseSport : 'Choose Sports'}
          options={sportsOptions}
          onSelect={value => setChooseSport(value)}
          container_style={{marginBottom: 15, marginTop: 10}}
        />
        <CustomDropDown
          // inputTitle="Choose Sports"
          righticon={ImageAssets.down}
          value={selectVenue ? selectVenue : 'No. of Players'}
          options={playerOtions}
          onSelect={value => setSelectVenue(value)}
          container_style={{marginBottom: 15, marginTop: 10}}
        />
        <ComponentView.Input
          textInputStyle={{
            width: '100%',
            borderWidth: 1.5,
            borderRadius: 5,
            height: height * 0.052,
            paddingHorizontal: 10,
            marginRight: 10,
            borderColor: ComponentView.Colors.greytxt,
          }}
          placeholder={'Date'}
          // onChangeText={value => setEmail(value)}
          // value={email}
          keyboardType={ComponentView.KeyBoardType.default}
        />
        <ComponentView.Input
          textInputStyle={{
            width: '100%',
            borderWidth: 1.5,
            borderRadius: 5,
            height: height * 0.052,
            paddingHorizontal: 10,
            marginRight: 10,
            borderColor: ComponentView.Colors.greytxt,
          }}
          placeholder={'Time Slot'}
          // onChangeText={value => setEmail(value)}
          // value={email}
          keyboardType={ComponentView.KeyBoardType.default}
        />
        <ComponentView.Button
          onPress={() => setVisible(true)}
          btnstyle={{width: '91%', marginTop: 20}}
          title="Book The Venue"
        />
      </View>
      <ModalView
        visible={visible}
        modalMainContent={bookContent}
        onClose={() => setVisible(false)}
        statusBar={ComponentView.Colors.rgbabg}
      />
    </ComponentView.MainContainer>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  button: {
    width: '46%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: ComponentView.Colors.greyborder, // Ensure this exists
    borderRadius: 7,
  },
});

export default CreateVenue;
