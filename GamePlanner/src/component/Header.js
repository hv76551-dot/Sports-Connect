import React from 'react';
import {
  Image,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Colors from '../common/Colors';
import ImageAssets from '../common/ImageAssets';
import {font_style} from '../common/MyStyle';
export default Header = props => {
  return (
    <View
      style={{
        width: width,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItem: 'center',
      }}>
      <Pressable
        style={{
          width: '15%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => props.onBack()}>
        <Image
          source={ImageAssets.leftarrow}
          resizeMode="contain"
          style={{
            width: 22,
            height: 22,
            tintColor: Colors.black,
          }}
        />
      </Pressable>
      <View
        style={{width: '70%', alignItems: 'center', justifyContent: 'center'}}>
        <Text
          style={[
            font_style.text_18_600,
            {
              color: Colors.darkblue,
            },
          ]}>
          {props.title}
        </Text>
      </View>
    </View>
  );
};
export const {width, height} = Dimensions.get('window');
