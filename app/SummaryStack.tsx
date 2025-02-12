import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SummaryScreen from './screens/SummaryScreen';
import MovementScreen from './screens/Summary/MovementScreen';
import EnergyScreen from './screens/Summary/EnergyScreen';
import SleepScreen from './screens/Summary/SleepScreen';
import WorkoutsScreen from './screens/Summary/WorkoutsScreen';
import ActivityScreen from './screens/Summary/ActivityScreen'

const Stack = createStackNavigator();

export default function SummaryStack() {
  return (
    <Stack.Navigator>
      {/* Summary Screen (with tabs visible) */}
      <Stack.Screen
        name="Summary"
        component={SummaryScreen}
        options={{
          headerShown: false,
        }}
      />

      {/* Inner Screens (tabs hidden, back arrow visible) */}
      <Stack.Screen
        name="MovementScreen"
        component={MovementScreen}
        options={{
          headerTitle: 'Movement',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: 'rgb(247, 249, 252)' }, // Customize header style
          headerShadowVisible: false,
          headerTintColor: 'rgb(0, 120, 120)', // Customize back arrow color
        }}
      />
      <Stack.Screen
        name="EnergyScreen"
        component={EnergyScreen}
        options={{
          headerTitle: 'Energy',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: 'rgb(247, 249, 252)' },
          headerShadowVisible: false,
          headerTintColor: 'rgb(0, 120, 120)',
        }}
      />
      <Stack.Screen
        name="SleepScreen"
        component={SleepScreen}
        options={{
          headerTitle: 'Sleep',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: 'rgb(247, 249, 252)' },
          headerShadowVisible: false,
          headerTintColor: 'rgb(0, 120, 120)',
        }}
      />
      <Stack.Screen
        name="ActivityScreen"
        component={ActivityScreen}
        options={{
          headerTitle: 'Activities',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: 'rgb(247, 249, 252)' },
          headerShadowVisible: false,
          headerTintColor: 'rgb(0, 120, 120)',
        }}
      />
      <Stack.Screen
        name="WorkoutsScreen"
        component={WorkoutsScreen}
        options={{
          headerTitle: 'Workouts',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: 'rgb(247, 249, 252)' },
          headerShadowVisible: false,
          headerTintColor: 'rgb(0, 120, 120)',
        }}
      />
    </Stack.Navigator>
  );
}
