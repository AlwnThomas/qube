import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import SummaryScreen from './screens/SummaryScreen';
import SettingsScreen from './screens/SettingsScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
  return (
    <View style={{flex:1, marginTop: 30}}>
    <Tab.Navigator 
      screenOptions={{
        tabBarActiveTintColor: 'rgb(0, 128, 128)',
        tabBarInactiveTintColor: 'rgb(110, 119, 131)',
      }}
    >
      <Tab.Screen
        name="Overview"
        component={HomeScreen}
        options={{
          headerShown: false, // Hides the header on the Home screen
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Summary"
        component={SummaryScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="notepad" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
    </View>
  );
}

