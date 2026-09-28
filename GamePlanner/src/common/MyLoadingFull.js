import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, View, Animated, Easing, Text} from 'react-native';
import {font_style} from './MyStyle';

const MyLoadingFull = () => {
  const randomColors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853']; // Google colors
  const [color, setColor] = useState(randomColors[0]);
  const rotateValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current; // For in-out animation
  const [dots, setDots] = useState('');

  // Color changing effect
  useEffect(() => {
    const colorInterval = setInterval(() => {
      setColor(randomColors[Math.floor(Math.random() * randomColors.length)]);
    }, 700);
    return () => clearInterval(colorInterval);
  }, []);

  // Continuous rotation effect
  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 1000, // 1-second full rotation
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [rotateValue]);

  // Dots animation effect
  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots(prevDots => (prevDots.length < 3 ? prevDots + '.' : '')); // Add up to 3 dots
    }, 500); // Change dot every 500ms
    return () => clearInterval(dotInterval);
  }, []);

  // In-Out (Pulse) animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.2, // Scale up
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1, // Scale back to normal
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [scaleValue]);

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.loader,
          {
            borderColor: color,
            transform: [{rotate}, {scale: scaleValue}],
          },
        ]}
      />
      <Text style={[font_style.text_14_600, {color: color}]}>
        Loading{dots}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '40%',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 50% transparent black
  },
  loader: {
    width: 48,
    height: 48,
    borderWidth: 2,
    borderColor: '#4285F4', // Default color
    borderTopColor: 'transparent', // For the spinning effect
    borderRadius: 100,
    marginBottom: 20, // Add some spacing for the text
  },
  loadingText: {
    fontSize: 18,
    color: '#FFFFFF', // White text for contrast
    fontWeight: 'bold',
  },
});

export default MyLoadingFull;
