import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabsNavigator from '../app/TabsNavigator';
import MovementScreen from './screens/Summary/MovementScreen';
import SummaryScreen from './screens/SummaryScreen';
import EnergyScreen from './screens/Summary/EnergyScreen';
import SleepScreen from './screens/Summary/SleepScreen';
import WorkoutsScreen from './screens/Summary/WorkoutsScreen';

const Stack = createStackNavigator();

export default function Index() {
  return (
      <Stack.Navigator>
        {/* Navigator for Home Page */}
        <Stack.Screen
          name=" "
          component={TabsNavigator}
          options={{ headerShown: false }} // Hide header for the TabsNavigator
        />

        {/* Navigator for Summary Page */}
        <Stack.Screen
          name="Summary"
          component={SummaryScreen}
        />

        {/* Navigator for Movement Screen */}
        <Stack.Screen
          name="MovementScreen"
          component={MovementScreen}
          options={{
            headerStyle: {backgroundColor: 'transparent',},
            headerShadowVisible: false,
            headerTitle: 'Movement',
            headerTitleAlign: 'center',
          }}
        />

        {/* Navigator for Energy Screen */}
        <Stack.Screen
          name="EnergyScreen"
          component={EnergyScreen}
          options={{
            headerStyle: {backgroundColor: 'transparent',},
            headerShadowVisible: false,
            headerTitle: 'Energy',
            headerTitleAlign: 'center',
          }}
        />

        {/* Navigator for Sleep Screen */}
        <Stack.Screen
          name="SleepScreen"
          component={SleepScreen}
          options={{
            headerStyle: {backgroundColor: 'transparent',},
            headerShadowVisible: false,
            headerTitle: 'Sleep',
            headerTitleAlign: 'center',
          }}
        />
        {/* Navigator for Workouts Screen */}
        <Stack.Screen
          name="WorkoutsScreen"
          component={WorkoutsScreen}
          options={{
            headerStyle: {backgroundColor: 'transparent',},
            headerShadowVisible: false,
            headerTitle: 'Workouts',
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
  );
}