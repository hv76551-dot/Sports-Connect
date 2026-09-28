import React from 'react';
import {Image, Dimensions, View, Text, TouchableOpacity} from 'react-native';
import ImageAssets from '../../common/ImageAssets';
import {font_style} from '../../common/MyStyle';
import Colors from '../../common/Colors';
const HeaderSection = props => {
  return (
    <View
      style={{
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
      }}>
      <View
        style={{
          width: '86%',
          paddingVertical: 10,
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <TouchableOpacity onPress={props.onMenu} style={{width: '20%'}}>
          <Image
            style={{height: 20, width: 20}}
            source={ImageAssets.menu}></Image>
        </TouchableOpacity>
        <Text style={[font_style.text_14_700, {color: Colors.black}]}>
          {props.userName}
        </Text>
        {/* <TouchableOpacity
          onPress={props.onNotification}
          style={{
            width: '20%',
            alignItems: 'flex-end',
          }}>
          <Image
            style={{height: 24, width: 24}}
            source={ImageAssets.bell}></Image>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};
export default HeaderSection;
export const {width, height} = Dimensions.get('window');
