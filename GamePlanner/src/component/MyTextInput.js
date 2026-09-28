import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from 'react-native';
import Colors from '../common/Colors';
import {font_style} from '../common/MyStyle';
const MyTextInput = props => {
  return (
    <SafeAreaView style={[props.viewStyle, {width: '100%'}]}>
      <View
        style={[
          {
            flexDirection: 'row',
            width: '100%',
            alignSelf: 'center',
          },
        ]}>
        {props.inputTitle && (
          <View style={{position:'absolute',top:1,zIndex:1,left:40,backgroundColor:Colors.white}}>
            <Text
              style={[
                font_style.text_13_500,
                {
                  color: Colors.greytxt,
                  paddingHorizontal: 7,
                },
                props.textstyle,
              ]}>
              {props?.inputTitle}
            </Text>
          </View>
        )}
      </View>
      <Pressable
        onPress={props?.Nav}
        style={[styles.sectionStyle, props.inputStyle]}>
        {props?.source && (
          <Image source={props?.source} style={styles.imageStyle} />
        )}
        {props.righttxt && (
          <Text
            style={[
              font_style.text_12_600,
              {color: Colors.blacktxt, marginLeft: 15},
            ]}>
            {props.righttxt}
          </Text>
        )}
        <TextInput
          value={props.value}
          numberOfLines={props.numberOfLines}
          returnKeyType={props.returnKeyType ? props.returnKeyType : 'next'}
          multiline={props.multiline}
          maxLength={props?.maxLength}
          placeholderTextColor={
            props.placeholderTextColor
              ? props.placeholderTextColor
              : Colors.greytxt
          }
          style={[
            font_style.text_13_500,
            {
              flex: 1,
              color: Colors.blacktxt,
              // fontFamily: 'Inter-Medium',
              // fontSize: 15,
              marginLeft: 14,
              paddingLeft:20,
              top:3
            },
            props.textcolor,
            props?.textInputStyle,
          ]}
          editable={props.editable}
          placeholder={props.placeholder}
          keyboardType={props?.keyboardType ? props?.keyboardType : 'default'}
          secureTextEntry={props?.secureTextEntry}
          underlineColorAndroid="transparent"
          onChangeText={text => {
            props?.onValue(text);
          }}
          {...props}
        />
        {props.linktext && (
          <TouchableOpacity onPress={props.onPress}>
            <Text
              style={[
                font_style.text_12_400,
                {color: Colors.primary, marginRight: 12},
              ]}>
              {props.linktext}
            </Text>
          </TouchableOpacity>
        )}
        {props.righticon && (
          <TouchableOpacity onPress={props?.onClickIcon}>
            <Image
              source={props.righticon}
              resizeMode="contain"
              style={{
                marginRight: 2,
                height: 20,
                width: 26,
                tintColor: Colors.primary,
              }}></Image>
          </TouchableOpacity>
        )}
      </Pressable>
      {props?.hintText && (
        <Text
          style={[
            font_style.text_12_500,
            {color: Colors.primary, marginTop: 2, marginStart: 8},
          ]}>{`${props?.hintText}`}</Text>
      )}
    </SafeAreaView>
  );
};
export default MyTextInput;
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  sectionStyle: {
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.white,
    height: height / 16,
    borderRadius: 30,
    paddingHorizontal: 10,
  },
  imageStyle: {
    tintColor: Colors.blacktxt,
    height: 22,
    width: 22,
    resizeMode: 'contain',
  },
});
