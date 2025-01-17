import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabsNavigator from '../app/TabsNavigator';
import MovementScreen from './screens/Summary/MovementScreen';
import SummaryScreen from './screens/SummaryScreen';

const Stack = createStackNavigator();

export default function Index() {
  return (
      <Stack.Navigator>
        {/* Navigator for Home Page */}
        <Stack.Screen
          name="HomeTabs"
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
          options={{ title: 'Movement' }} // Customize header title for this screen
        />
      </Stack.Navigator>
  );
}