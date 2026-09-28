import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Colors from './Colors';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

const MainContainer = props => {
  const defaultStyle = {
    flex: 1,
    backgroundColor: props.bgcolor || Colors.bgcolor,
    alignItems: 'center',
  };

  const mergedStyle = [defaultStyle, props.style];

  // Use View instead of ScrollView when hasFlatList prop is true to avoid VirtualizedList nesting
  const ContainerComponent = props.hasFlatList ? View : ScrollView;
  const containerProps = props.hasFlatList 
    ? { style: defaultStyle }
    : { contentContainerStyle: defaultStyle, keyboardShouldPersistTaps: "handled" };

  return (
    <SafeAreaProvider
      style={[
        styles.safeArea,
        {backgroundColor: props.bgcolor || Colors.bgcolor},
      ]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={props.bgcolor || Colors.white}
        translucent={false}
      />
      <SafeAreaView
        style={[
          styles.safeArea,
          {backgroundColor: props.bgcolor || Colors.bgcolor},
        ]}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={[
            styles.container,
            {backgroundColor: props.bgcolor || Colors.bgcolor},
          ]}>
          <ContainerComponent {...containerProps}>
            {props.children}
          </ContainerComponent>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bgcolor,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.bgcolor,
  },
});

export default MainContainer;

// import React from 'react';
// import {
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
// } from 'react-native';
// import Colors from './Colors';
// import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

// const MainContainer = props => {
//   const defaultStyle = {
//     flex: 1,
//     backgroundColor: Colors.bgcolor,
//     alignItems: 'center',
//   };

//   const mergedStyle = [defaultStyle, props.style];

//   return (
//     <SafeAreaProvider style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor={Colors.white} />
//       <SafeAreaView style={styles.safeArea}>
//         <KeyboardAvoidingView
//           behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
//           style={styles.container}>
//           <ScrollView
//             contentContainerStyle={mergedStyle}
//             keyboardShouldPersistTaps="handled">
//             {props.children}
//           </ScrollView>
//         </KeyboardAvoidingView>
//       </SafeAreaView>
//     </SafeAreaProvider>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: Colors.bgcolor,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: Colors.bgcolor,
//   },
// });

// export default MainContainer;
