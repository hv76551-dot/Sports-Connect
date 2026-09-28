import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
} from 'react-native';
import ComponentView from '../../common';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const GameDetail = props => {
  const navigation = useNavigation();
  const [name, setName] = useState('ekana Stadium');
  const [address, setAddress] = useState('Lucknow');
  const [note, setNote] = useState('game will start on time');
  
  return (
    <ComponentView.MainContainer bgcolor={ComponentView.Colors.white}>
      <ComponentView.HeaderBar title="Joined game detail" />
      <View
        style={{
          width: width,
          paddingVertical: 10,
        }}>
        <View
          style={{
            width: '90%',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'center',
            paddingVertical: 10,
          }}>
          <Image
            style={{height: 60, width: 60, borderRadius: 100}}
            source={ComponentView.ImagePath.splash}></Image>
          <View style={{width: '80%', paddingVertical: 10, bottom: 10}}>
            <Text
              style={[
                ComponentView.font_style.text_15_600,
                {color: ComponentView.Colors.black},
              ]}>
              {name}
            </Text>
            <Text
              style={[
                ComponentView.font_style.text_15_600,
                {color: ComponentView.Colors.black},
              ]}>
              {address}
            </Text>
          </View>
        </View>
        <View style={{paddingVertical: 10}}>
          <Image
            style={{
              width: '90%',
              height: height * 0.15,
              alignSelf: 'center',
              borderRadius: 10,
            }}
            source={ComponentView.ImagePath.splash}></Image>
        </View>
        <View style={{paddingVertical: 10, marginTop: 20}}>
          <TextInput
            placeholder="Note"
            value={note}
            onChangeText={value => setNote(value)}
            multiline={true}
            placeholderTextColor={ComponentView.Colors.black}
            style={[
              ComponentView.font_style.text_13_500,
              {
                color: ComponentView.Colors.black,
                width: '90%',
                height: height * 0.09,
                borderWidth: 1,
                borderColor: ComponentView.Colors.greyborder,
                alignSelf: 'center',
                borderRadius: 10,
                textAlign: 'left',
                textAlignVertical: 'top',
                padding: 10,
              },
            ]}></TextInput>
        </View>
      </View>
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
    borderColor: ComponentView.Colors.greyborder,
    borderRadius: 7,
  },
});

export default GameDetail;