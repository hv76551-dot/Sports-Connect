import React from 'react'
import {Image, Dimensions, View, Text, TouchableOpacity} from 'react-native'
import Colors from '../common/Colors'
import {font_style} from '../common/MyStyle'

export default ActionBar = props => {
  return (
    <View
      style={[
        {
          width: width - 40,
          alignSelf: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: height * 0.085,
        },
        props?.mainView,
      ]}>
      <TouchableOpacity
        style={{
          alignSelf: 'center',
          justifyContent: 'flex-end',
          height: '100%',
          width: '15%',
        }}
        onPress={props.menubutton}>
        <View
          style={{
            height: 55,
            width: 55,
            backgroundColor: Colors.white,
            borderRadius: 55 / 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
         
        </View>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '80%',
        }}>
        <View style={{flexDirection: 'row', marginStart: 5, marginTop: 8}}>
          <View style={{marginStart: 8}}>
            <Text
              style={[
                font_style.text_15_600,
                {color: Colors.greyLight},
                props?.wishStyle,
              ]}>
              {props.role}
            </Text>
            {props.name && (
                <Text
                  numberOfLines={1}
                  style={[
                    font_style.text_16_700,
                    {color: Colors.white,marginTop:-7 },
                  ]}>
                  {props.name}
                </Text>
            )}
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={{alignSelf: 'center', flexDirection: 'row', marginTop: 8}}
          onPress={props.notificationButton}>
          {props?.rightImage && (
            <Image
              resizeMode='center'
              source={props?.rightImage}
              style={{height: 24, width: 24}}
            />
          )}
          {props?.count && (
            <Text
              style={[
                font_style.text_10_500,
                {
                  fontSize: 10,
                  textAlignVertical: 'center',
                  width: 20,
                  height: 20,
                  padding: 2,
                  textAlign: 'center',
                  color: Colors.white,
                  marginTop: -8,
                  backgroundColor: Colors.mediumblue,
                  borderRadius: 100,
                  marginStart: -20,
                },
              ]}>
              {props?.count ? props?.count : ''}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  )
}

export const {width, height} = Dimensions.get('window')
