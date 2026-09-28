// import React from 'react';
// import {StyleSheet, Image, Text, Dimensions, View} from 'react-native';
// import Colors from '../common/Colors';

// const MyTabs = props => {
//   let focused = props.focused;
//   let ImageSource = props.source;
//   return (
//     <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
//       <View
//         style={[
//           styles.selectedTab,
//           {
//             backgroundColor: focused ? Colors.blue : Colors.white,
//             paddingVertical: 2,
//             height: 2,
//           },
//         ]}
//       />
//       <Image
//         source={ImageSource}
//         resizeMode="contain"
//         style={{
//           width: 22,
//           height: 22,
//           tintColor: focused ? Colors.black : Colors.white,
//         }}
//       />
//       {/* <Text
//         style={[
//           font_style.text_12_600,
//           {color: focused ? Colors.primaryColor : Colors.darkGray},
//         ]}>
//         {props.title}
//       </Text> */}
//     </View>
//   );
// };

// export const {width, height} = Dimensions.get('window');
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   selectedTab: {
//     borderBottomEndRadius: 8,
//     borderBottomStartRadius: 8,
//     backgroundColor: Colors.black,
//     position: 'absolute',
//     top: 0,
//   },
// });

// export default MyTabs;
import React from 'react';
import {StyleSheet, Image, Text, Dimensions, View} from 'react-native';
import Colors from '../common/Colors';
const MyTabs = props => {
  let focused = props.focused;
  let ImageSource = props.source;
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}>
      <View
        style={[
          styles.selectedTab,
          {
            backgroundColor: focused ? Colors.primary : Colors.white,
            paddingVertical: 10,
          },
        ]}
      />
      <Image
        source={ImageSource}
        resizeMode="contain"
        style={{
          width: 22,
          height: 22,
          tintColor: focused ? Colors.primary : Colors.grey,
        }}
      />
      {/* <Text
        style={[
          font.text_12_600,
          {color: focused ? Colors.prime : Colors.grey},
        ]}>
        {props.title}
      </Text> */}
      {/* <Text
        style={[{color: focused ? Colors.prime : Colors.grey, fontSize: 15}]}>
        {props.title}
      </Text> */}
    </View>
  );
};

export const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selectedTab: {
    paddingVertical: 12,
    // width: width/4-35,
    // height:6,
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
    backgroundColor: Colors.primary,
    position: 'absolute',
    top: 0,
  },
});

export default MyTabs;
