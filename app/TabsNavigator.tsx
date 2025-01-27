import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/AntDesign';
import HomeScreen from './screens/HomeScreen';
import RecoveryScreen from './screens/RecoveryScreen';
import SummaryScreen from './screens/SummaryScreen';
import SettingsScreen from './screens/SettingsScreen';
import SummaryStack from './SummaryStack';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen
        name="RecoveryScreen"
        component={RecoveryScreen}
        options={{
          headerShown: false,
          headerTitle: 'Recovery',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: 'white' },
          headerTintColor: 'rgb(0, 120, 120)',
        }}
      />
    </HomeStack.Navigator>
  );
}

export default function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'rgb(0, 120, 120)',
        tabBarInactiveTintColor: 'rgb(110, 119, 131)',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator} // Use HomeStackNavigator here
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Summary"
        component={SummaryStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="barschart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="setting" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
