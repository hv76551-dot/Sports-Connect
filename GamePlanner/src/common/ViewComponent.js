import React from 'react';
import {Dimensions, View, StyleSheet, Image, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from './Colors';
import ImageAssets from './ImageAssets';
import {font_style} from './MyStyle';
import LinearGradientView from '../component/LinearGradientView';
import GradientText from '../component/GradientText';
const {width, height} = Dimensions.get('window');

export function OwnerModalView(props) {
  return (
    <View style={{width: width - 40}}>
      <View style={{width: '100%', flexDirection: 'row'}}>
        <View
          style={{
            width: '23%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <LinearGradient
            colors={[
              Colors.primary,
              Colors.primary,
              Colors.primary,
              Colors.secondry,
            ]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{
              height: height * 0.1,
              width: width * 0.19,
              borderRadius: 100 / 2,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: '90%',
                height: '90%',
                backgroundColor: Colors.white,
                borderRadius: 80 / 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={ImageAssets.man}
                style={{height: '90%', width: '90%', resizeMode: 'contain'}}
              />
            </View>
          </LinearGradient>
        </View>
        <View
          style={{
            width: '60%',
            paddingHorizontal: 10,
          }}>
          <Text style={[font_style.text_16_600, {color: Colors.black}]}>
            {'Aarav Sharma'}
          </Text>
          <Text
            numberOfLines={3}
            style={[font_style.text_12_600, {color: Colors.black}]}>
            {
              '7th Floor, Cyber Tower, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010'
            }
          </Text>
        </View>
        <View style={{width: '15%', alignItems: 'flex-end'}}>
          <Text
            numberOfLines={1}
            style={[font_style.text_13_600, {color: Colors.red}]}>
            {'Male'}
          </Text>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 20,
        }}>
        <View style={{width: '50%'}}>
          <Text style={[font_style.text_13_600, {color: Colors.red}]}>
            {'Aarav@gmail.com'}
          </Text>
          <Text style={[font_style.text_13_500, {color: Colors.black}]}>
            {'Email Address'}
          </Text>
        </View>
        <View style={{width: '50%', alignItems: 'flex-end'}}>
          <Text style={[font_style.text_13_600, {color: Colors.red}]}>
            {'8885567763'}
          </Text>
          <Text style={[font_style.text_13_500, {color: Colors.black}]}>
            {'Contact Number'}
          </Text>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <View style={{width: '50%'}}>
          <Text style={[font_style.text_13_600, {color: Colors.red}]}>
            {'95345 9654 93'}
          </Text>
          <Text style={[font_style.text_13_500, {color: Colors.black}]}>
            {'Aadhaar No.'}
          </Text>
        </View>
        <View style={{width: '50%', alignItems: 'flex-end'}}>
          <Text style={[font_style.text_13_600, {color: Colors.red}]}>
            {'30/09/1988'}
          </Text>
          <Text style={[font_style.text_13_500, {color: Colors.black}]}>
            {'DOB'}
          </Text>
        </View>
      </View>
      <View style={{width: '100%', marginTop: 10, flexDirection: 'row'}}>
        <View style={{width: '50%'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={ImageAssets.pin}
              style={{height: 18, width: 18, resizeMode: 'contain'}}
            />
            <Text
              style={[font_style.text_14_600, {color: Colors.black, left: 5}]}>
              {'Aadhaar Front'}
            </Text>
          </View>
          <Image
            source={ImageAssets.adharfront}
            style={{
              height: height * 0.15,
              width: '100%',
              resizeMode: 'contain',
            }}
          />
        </View>
        <View style={{width: '50%'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={ImageAssets.pin}
              style={{height: 18, width: 18, resizeMode: 'contain'}}
            />
            <Text
              style={[font_style.text_14_600, {color: Colors.black, left: 5}]}>
              {'Aadhaar Back'}
            </Text>
          </View>
          <Image
            source={ImageAssets.adharback}
            style={{
              height: height * 0.15,
              width: '100%',
              resizeMode: 'contain',
            }}
          />
        </View>
      </View>
      <View
        style={{
          width: '100%',
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <LinearGradientView
          onPress={props.onEdit}
          mainstyle={{
            width: '48%',
            height: height * 0.075,
          }}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 80 / 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          children={
            <View
              style={{
                width: '97%',
                height: '93%',
                backgroundColor: Colors.white,
                borderRadius: 80 / 2,
              }}>
              <GradientText text={'Edit'} style={{marginTop: 8}} />
            </View>
          }
        />
        <LinearGradientView
          onPress={props.onSave}
          mainstyle={{
            width: '48%',
            height: height * 0.075,
          }}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 80 / 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          children={
            <Text style={[font_style.text_14_600, {color: Colors.white}]}>
              {'Save'}
            </Text>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

export default {OwnerModalView};
