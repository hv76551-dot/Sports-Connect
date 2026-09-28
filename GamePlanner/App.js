import React, {useEffect} from 'react';
import {StyleSheet, useColorScheme, Alert} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {enableFreeze, enableScreens} from 'react-native-screens';
import {Provider} from 'react-redux';
// import store from './redux/store';
import store from './src/redux/store';
import { ThemeProvider ,darkTheme, lightTheme} from './src/theme';
import { Router } from './src/routes/Routes';

enableFreeze(true);
enableScreens(false);

const App = () => {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <ThemeProvider theme={colorScheme === 'light' ? lightTheme : darkTheme}>
        <GestureHandlerRootView style={styles.container}>
          <Router />
        </GestureHandlerRootView>
      </ThemeProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
