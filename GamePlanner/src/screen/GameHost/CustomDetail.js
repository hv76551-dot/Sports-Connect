import React from 'react';
import {Text, View, Dimensions} from 'react-native';
import ComponentView from '../../common';

const {width} = Dimensions.get('window');

const CustomDetail = ({title, value, isLast}) => (
  <View style={{width: width, paddingVertical: 10}}>
    <View
      style={[
        styles.detailContainer,
        !isLast && {
          borderBottomWidth: 1,
          borderBottomColor: ComponentView.Colors.greyborder,
        },
      ]}>
      <Text style={[ComponentView.font_style.text_14_400, styles.text]}>
        {title}
      </Text>
      <Text style={[ComponentView.font_style.text_14_500, styles.text]}>
        {value}
      </Text>
    </View>
  </View>
);

export default CustomDetail;

const styles = {
  detailContainer: {
    width: '90%',
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  text: {
    color: ComponentView.Colors.black,
  },
};
