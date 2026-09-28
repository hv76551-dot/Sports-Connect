import React, {useState} from 'react';
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';
import PlaceInfo from './placeinfo';
import ComponentView from '../../common';
import {ScreenIdentifiers} from '../../routes';
const Address = props => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState('Home');
  const [name, setName] = useState('Kushal Kumar');
  const [mobile, setMobile] = useState('9898989898');
  const [place, setPlace] = useState('2101/ Omaxe Green Valley Society ');
  const [street, setStreet] = useState('2101/ Omaxe Green Valley Society ');
  const [pinCode, setPinCode] = useState('226021');
  const [mealName, setMealName] = useState('Regular Lunch');
  const [price, setPrice] = useState('150');
  const options = ['Home', 'Office', 'Other'];
  return (
    <ComponentView.MainContainer>
      <ComponentView.HeaderBar
        title="Address & Info"
        showHeartIcon={true}
        onPress={() => navigation.goBack()}
      />
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
          <View style={{width: width * 0.86, paddingVertical: 20}}>
            <Text
              style={[
                ComponentView.font_style.text_13_500,
                {color: ComponentView.Colors.blacktxt},
              ]}>
              A precise address ensures accurate and hassle-free meal delivery.
            </Text>
          </View>

          <View
            style={{
              width: width * 0.86,
              paddingVertical: 10,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: ComponentView.Colors.border,
              backgroundColor: ComponentView.Colors.white,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: '90%',
                paddingVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{width: '45%'}}>
                <Text
                  style={[
                    ComponentView.font_style.text_13_400,
                    {color: ComponentView.Colors.greytxt},
                  ]}>
                  Full Name
                </Text>
                <TextInput
                  style={[
                    ComponentView.font_style.text_13_400,
                    {
                      color: ComponentView.Colors.blacktxt,
                      width: '100%',
                      borderBottomWidth: 1,
                      height: height * 0.05,
                      borderBottomColor: ComponentView.Colors.greyborder,
                      textAlign: 'left',
                      right: 3,
                    },
                  ]}
                  placeholder="Kushal Kumar"
                  placeholderTextColor={ComponentView.Colors.greyborder}
                  value={name}
                  onChangeText={value => setName(value)}
                  keyboardType="default"
                />
              </View>
              <View style={{width: '45%'}}>
                <Text
                  style={[
                    ComponentView.font_style.text_13_400,
                    {color: ComponentView.Colors.greytxt},
                  ]}>
                  Mobile
                </Text>
                <TextInput
                  style={[
                    ComponentView.font_style.text_13_400,
                    {
                      color: ComponentView.Colors.blacktxt,
                      width: '100%',
                      borderBottomWidth: 1,
                      height: height * 0.05,
                      borderBottomColor: ComponentView.Colors.greyborder,
                      textAlign: 'left',
                      right: 3,
                    },
                  ]}
                  placeholder="+91 9971405612"
                  placeholderTextColor={ComponentView.Colors.greytxt}
                  value={mobile}
                  onChangeText={value => setMobile(value)}
                  keyboardType="phone-pad"
                  maxLength={10}
                />
              </View>
            </View>
            <PlaceInfo
              title="House No / Flat No / Floor*"
              placeholder="2101/ Omaxe Green Valley Society"
              value={place}
              onChangeText={value => setPlace(value)}
              keyboardType="default"
            />
            <PlaceInfo
              title="Society / Street Name*"
              placeholder="Green Valley"
              value={street}
              onChangeText={value => setStreet(value)}
              keyboardType="default"
            />
            <PlaceInfo
              title="Pincode"
              placeholder="226035"
              value={pinCode}
              onChangeText={value => setPinCode(value)}
              keyboardType="phone-pad"
            />
            <View
              style={{
                width: width * 0.78,
                paddingVertical: 10,
                alignSelf: 'center',
                // backgroundColor: 'red',
              }}>
              <Text
                style={[
                  ComponentView.font_style.text_13_500,
                  {color: ComponentView.Colors.blacktxt},
                ]}>
                Save As
              </Text>
            </View>
            <View
              style={{
                width: width * 0.78,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 5,
                alignSelf: 'center',
              }}>
              {options.map(option => (
                <TouchableOpacity
                  key={option}
                  onPress={() => setSelected(option)}
                  style={{
                    width: '30%',
                    paddingVertical: 10,
                    borderWidth: 1,
                    borderColor: ComponentView.Colors.greyborder,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5,
                    backgroundColor:
                      selected === option
                        ? ComponentView.Colors.primary
                        : ComponentView.Colors.lightgreybg,
                  }}>
                  <Text
                    style={[
                      ComponentView.font_style.text_12_500,
                      {
                        color:
                          selected === option
                            ? ComponentView.Colors.white
                            : ComponentView.Colors.blacktxt,
                      },
                    ]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={{paddingVertical: 15, width: width * 0.86}}>
            <View
              style={{
                width: width * 0.86,
                paddingVertical: 10,
                backgroundColor: ComponentView.Colors.white,
                borderRadius: 10,
                paddingHorizontal: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  paddingVertical: 5,
                  flexDirection: 'row',
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    width: '50%',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{height: 18, width: 18}}
                    source={ComponentView.ImagePath.greendot}
                  />
                  <Text
                    style={[
                      ComponentView.font_style.text_16_600,
                      {color: ComponentView.Colors.blacktxt, left: 14},
                    ]}>
                    {mealName}
                  </Text>
                </View>
                <Text
                  style={[
                    ComponentView.font_style.text_14_600,
                    {
                      color: ComponentView.Colors.blacktxt,
                      alignSelf: 'center',
                      paddingVertical: 10,
                    },
                  ]}>
                  ₹.{price}/
                  <Text
                    style={[
                      ComponentView.font_style.text_13_400,
                      {color: ComponentView.Colors.blacktxt},
                    ]}>
                    Meal{' '}
                  </Text>
                </Text>
              </View>
              <Text
                style={[
                  ComponentView.font_style.text_13_400,
                  {color: ComponentView.Colors.blacktxt},
                ]}>
                <Image
                  style={{height: 13, width: 13}}
                  source={ComponentView.ImagePath.clock}></Image>
                {'   '}
                22 August, 2025
              </Text>
            </View>
          </View>
          <ComponentView.Button
            btnstyle={{
              borderRadius: 5,
            }}
            title="Continue"
            onPress={() => {
              navigation.navigate(ScreenIdentifiers.PaymentScreen);
            }}
          />
        </ScrollView>
      </View>
    </ComponentView.MainContainer>
  );
};

export default Address;
const {width, height} = Dimensions.get('window');
