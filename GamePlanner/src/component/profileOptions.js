import React from 'react';
import {Image, Dimensions, View, Text, TouchableOpacity} from 'react-native';
import ImageAssets from '../common/ImageAssets';
import {font_style} from '../common/MyStyle';
import {useNavigation} from '@react-navigation/native';
import Colors from '../common/Colors';
import ComponentView from '../common';
const ProfileOptions = props => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        width: width,
        paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        onPress={props.onPress}
        style={{
          width: '90%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderColor: Colors.greyborder,
          // borderWidth: 1,
          paddingVertical: 15,
          borderRadius: 10,
          backgroundColor: Colors.white,
          elevation: 2,
        }}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            width: '85%',
          }}>
          <View style={{width: '15%'}}>
            <Image
              style={{
                height: 22,
                width: 22,
                resizeMode: 'contain',
                tintColor: props.tintColor,
                alignSelf: 'center',
              }}
              source={props.source}></Image>
          </View>
          <Text
            style={[
              font_style.text_13_500,
              {color: ComponentView.Colors.black, width: '80%'},
            ]}>
            {props.title}
          </Text>
        </View>
        <Image
          style={{
            height: 22,
            width: 22,
            resizeMode: 'contain',
            tintColor: Colors.greytxt,
            width: '15%',
            left: 5,
          }}
          source={ImageAssets.next}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileOptions;
export const {width, height} = Dimensions.get('window');
