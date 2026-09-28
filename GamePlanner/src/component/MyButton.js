import React from 'react';
import {Text, TouchableOpacity, Dimensions, Image, View} from 'react-native';
import Colors from '../common/Colors';
import {font_style} from '../common/MyStyle';

const {width, height} = Dimensions.get('window');
const MyButton = props => (
  // <View style={{width: width, paddingVertical: 10}}>
  <TouchableOpacity
    {...props}
    style={[
      {
        width: width * 0.9,
        alignSelf: 'center',
        backgroundColor: Colors.black,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        height: height * 0.058,
      },
      props.btnstyle,
    ]}>
    <Text
      style={[
        font_style.text_16_500,
        {textAlign: 'center', color: Colors.white},
        props.textStyle,
      ]}>
      {props.title}
    </Text>
  </TouchableOpacity>
  // </View>
);

export default MyButton;
