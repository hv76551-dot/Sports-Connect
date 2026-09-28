import React from 'react';
import {Image, Dimensions, View, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const CircleHeader = props => {
  const navigation = useNavigation();

  return (
    <View style={{width: '100%', height: '8%', justifyContent: 'center'}}>
      <Pressable
        onPress={() => {
          if (props.onPress) {
            props.onPress();
          } else {
            navigation.goBack();
          }
        }}
        style={{
          width: '20%',
          height: '90%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={props.image}
          style={{height: '80%', width: '80%', resizeMode: 'contain'}}
        />
      </Pressable>
    </View>
  );
};

export default CircleHeader;

export const {width, height} = Dimensions.get('window');
