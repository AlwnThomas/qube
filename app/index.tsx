import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, StatusBar, Button } from 'react-native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import TabsNavigator from './TabsNavigator'; // Bottom tabs navigator

const Stack = createStackNavigator();

export default function Index() {
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate a 2-second loading time

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="teal" />
      </View>
    );
  }

  return (
    <>
      {/* Global status bar style */}
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={isDark ? '#000' : '#fff'}
      />

      {/* Navigation and Toggle Theme Button */}
      <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
        <Stack.Navigator
          initialRouteName="Tabs"
          screenOptions={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS, // Smooth transitions for all screens
          }}
        >
          <Stack.Screen name="Tabs" component={TabsNavigator} />
        </Stack.Navigator>

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Match your app theme
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
