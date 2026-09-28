import React from 'react';
import {Image, Dimensions, View, Text, TouchableOpacity} from 'react-native';
import ImageAssets from '../common/ImageAssets';
import {font_style} from '../common/MyStyle';
import {useNavigation} from '@react-navigation/native';
const HeaderBar = props => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        width: '90%',
        paddingVertical: 10,
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          width: '82%',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            if (props.onPress) {
              props.onPress();
            } else {
              navigation.goBack();
            }
          }}
          style={{
            width: '20%',
            paddingVertical: 10,
          }}>
          <Image style={{height: 33, width: 33}} source={ImageAssets.left} />
        </TouchableOpacity>
        <Text style={[font_style.text_15_500]}>{props.title}</Text>
      </View>

      {props.showHeartIcon && (
        <TouchableOpacity
          style={{
            width: '18%',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            paddingVertical: 10,
          }}>
          <Image style={{height: 33, width: 33}} source={ImageAssets.heart} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HeaderBar;
export const {width, height} = Dimensions.get('window');
