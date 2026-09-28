import React from 'react';
import {Pressable, StyleSheet, Image, Text} from 'react-native';
import {CheckBox} from 'react-native-elements';
import ImageAssets from '../common/ImageAssets';
import Colors from '../common/Colors';
const MyCheckbox = props => {
  return (
    <Pressable style={styles.main} onPress={props.onPress}>
      <CheckBox
        checkedIcon={<Image source={ImageAssets.check} style={styles.img} />}
        uncheckedIcon={
          <Image source={ImageAssets.uncheck} style={styles.next} />
        }
        checked={props.checked}
        onPress={props.onPress}
      />
      <Text
             style={[font_style.text_14_400, {left: 10, color: Colors.blacktxt}]}>
             {props.title}
           </Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  main: {
    width: 20,
    // paddingHorizontal: 5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    borderColor: Colors.primary,
  },
  next: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
    // bottom:13,
  },
  img: {
    height: 19,
    width: 19,
  },
});
export default MyCheckbox;
