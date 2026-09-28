import {View, Text, Dimensions, TextInput} from 'react-native';
import React from 'react';
import {font_style} from '../../common/MyStyle';
import Colors from '../../common/Colors';

const PlaceInfo = props => {
  return (
    <View style={{width: '90%', paddingVertical: 10}}>
      <View style={{width: '100%', alignSelf: 'center'}}>
        <Text style={[font_style.text_13_400, {color: Colors.greytxt}]}>
          {props.title}
        </Text>
        <TextInput
          numberOfLines={1}
          style={[
            font_style.text_13_500,
            {
              color: Colors.blacktxt,
              width: '100%',
              borderBottomWidth: 1,
              height: height * 0.05,
              borderBottomColor: Colors.greyborder,
              right: 3,
            },
          ]}
          placeholder={props.placeholder}
          onChangeText={props.onChangeText}
          value={props.value}
          keyboardType={props.keyboardType}
          placeholderTextColor={Colors.greytxt}></TextInput>
      </View>
    </View>
  );
};
export default PlaceInfo;
const {width, height} = Dimensions.get('window');
