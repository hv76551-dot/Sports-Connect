import React from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../common/Colors';
import {font_style} from '../common/MyStyle';
import {width} from './OtpInput';

const GradientText = props => {
  return (
    <Pressable {...props}>
      <MaskedView
        maskElement={
          <Text
            style={[
              font_style.text_14_600,
              {textAlign: 'center', marginTop: 12},
              props?.style,
            ]}>
            {props?.text}
          </Text>
        }>
        <LinearGradient
          colors={[Colors.primary, Colors.primary, Colors.secondry]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={[styles.gradient, {width: props?.text?.length * 16}]}
        />
      </MaskedView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  gradient: {
    height: 36,
    alignSelf: 'center',
  },
});

export default GradientText;
