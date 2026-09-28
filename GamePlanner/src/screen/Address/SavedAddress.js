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
import ComponentView from '../../common';
import MainContainer from '../../common/MainContainer';
import HeaderBar from '../../component/HeaderBar';
import {fonts} from 'react-native-elements/dist/config';
import {font_style} from '../../common/MyStyle';
import Colors from '../../common/Colors';
import PlaceAdapter from './PlaceAdapter';
const SavedAddress = props => {
  const navigation = useNavigation();
  const [data, setData] = useState([
    {
      id: 1,
      location: 'Office',
      place:
        '2101/ Omaxe Green Valley Society, A 59, RPS Green Valley, Sector 42, Faridabad',
    },
    {
      id: 2,
      location: 'Office',
      place:
        '2101/ Omaxe Green Valley Society, A 59, RPS Green Valley, Sector 42, Faridabad',
    },
  ]);
  return (
    <MainContainer hasFlatList={true}>
      <HeaderBar title="Saved Address" />
      <View
        style={{
          width: width,
          backgroundColor: Colors.greyborder,
          paddingVertical: 10,
        }}>
        <Text
          style={[
            font_style.text_14_500,
            {color: Colors.blacktxt, width: '86%', alignSelf: 'center'},
          ]}>
          Saved Address
        </Text>
      </View>
      <PlaceAdapter data={data} />
    </MainContainer>
  );
};

export default SavedAddress;
const {width, height} = Dimensions.get('window');
