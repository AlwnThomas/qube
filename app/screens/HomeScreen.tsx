import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { LineChart } from 'react-native-chart-kit';
import { useState, useEffect } from 'react';

export default function HomeScreen() {

  // Sample data, replace with real movement data
  const movementData = {
    stepGoal: 10000,
    steps: 14000,
    stepLength: 0.762, // in meters
    time: 45, // in minutes
  };

  const recoveryData = 69;
  const stressPercentData = 20;

  // Live Date updates
  const formatDate = (date: Date) => {
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' }); // e.g., 'Jan'
  const year = date.getFullYear();
  
  // Determine the ordinal suffix
      const suffix =
        day % 10 === 1 && day !== 11
          ? 'st'
          : day % 10 === 2 && day !== 12
          ? 'nd'
          : day % 10 === 3 && day !== 13
          ? 'rd'
          : 'th';
  
      return `${day}${suffix} ${month} ${year}`;
    };
  
  const currentDate = formatDate(new Date()); // current date in format '1st Jan 2025'

  // Calculate the percentage of the goal achieved
  const stepPercentage = Math.min((movementData.steps / movementData.stepGoal) * 100, 100);

  // Calculate the percentage of the goal achieved
  const recoveryPercentage = Math.min((recoveryData / 100) * 100, 100);

  // Calculate the percentage of the goal achieved
  const stressPercentage = Math.min((stressPercentData / 100) * 100, 100);

  // Movement Ring configuration
  const radius = 75; // Radius of the circle
  const strokeWidth = 15; // Stroke width for the ring
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const offset = circumference - (stepPercentage / 100) * circumference; // Offset for the stroke
  const size = (radius + strokeWidth) * 2;

  // Sleep Ring configuration
  const innerRadius = radius - 20; // Radius of the circle
  const innerStrokeWidth = 15; // Stroke width for the ring
  const innerCircumference = 2 * Math.PI * innerRadius; // Circumference of the circle
  const innerOffset = innerCircumference - (recoveryPercentage / 100) * innerCircumference; // Offset for the stroke
  const innerSize = (innerRadius + innerStrokeWidth) * 2;

  // Stress Ring configuration
  const stressRadius = radius - 40; // Radius of the circle
  const stressStrokeWidth = 15; // Stroke width for the ring
  const stressCircumference = 2 * Math.PI * stressRadius; // Circumference of the circle
  const stressOffset = stressCircumference - (stressPercentage / 100) * stressCircumference; // Offset for the stroke
  const stressSize = (stressRadius + stressStrokeWidth) * 2;

  //Stress Data const, replace with realtime
  const stressData = {
    labels: ["12am", "6am", "12pm", "6pm", "12am"],
    datasets: [
      {
        data: [10, 20, 40, 10, 0],
        color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
        strokeWidth: 1.5,
      },
    ],
  };

    const [currentDay, setCurrentDay] = useState('');
    //Function to get day
    const getDay = () => {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const today = new Date();
      return days[today.getDay()];
    };
  
    useEffect(() => {
      // Set the initial day
      setCurrentDay(getDay());
  
      // Update the day at midnight
      const now = new Date();
      const msUntilMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - now.getTime();
  
      const timer = setTimeout(() => {
        setCurrentDay(getDay());
      }, msUntilMidnight);
  
      // Cleanup the timer
      return () => clearTimeout(timer);
    }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>

    <View>
      <Text style={styles.day}>{currentDay}</Text>
      <Text style={styles.date}>{currentDate}</Text>
    </View>

    //Ring Graph for Movement
    <View style={styles.ringContainer}>
      {/* Circle Ring Graph */}
      <Svg height={size} width={size}>
        {/* Background Circle */}
        <Circle
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
          stroke="#e6e6e6"
          strokeWidth={strokeWidth}
          fill="none"
        />
    
        {/* Progress Circle */}
        <Circle
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
          stroke="rgb(0, 235, 106)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="butt" // Makes the stroke have a straight edge
          transform={`rotate(-90 ${radius + strokeWidth} ${radius + strokeWidth})`} // Start the stroke from 90 degrees
        />
      </Svg>

      //Ring Graph for Recovery
      {/* Circle Ring Graph */}
      <Svg height={innerSize} width={innerSize}
       style={{
       position: 'absolute', // Overlay on the outer ring
       }}>
        
        {/* Background Circle */}
        <Circle
          cx={innerRadius + innerStrokeWidth}
          cy={innerRadius + innerStrokeWidth}
          r={innerRadius}
          stroke="#e6e6e6"
          strokeWidth={innerStrokeWidth}
          fill="none"
        />
    
        {/* Progress Circle */}
        <Circle
          cx={innerRadius + innerStrokeWidth}
          cy={innerRadius + innerStrokeWidth}
          r={innerRadius}
          stroke="rgb(0, 128, 128)"
          strokeWidth={innerStrokeWidth}
          fill="none"
          strokeDasharray={innerCircumference}
          strokeDashoffset={innerOffset}
          strokeLinecap="butt" // Makes the stroke have a straight edge
          transform={`rotate(-90 ${innerRadius + innerStrokeWidth} ${innerRadius + innerStrokeWidth})`} // Start the stroke from 90 degrees
        />
      </Svg>

      //Ring Graph for Stress
      {/* Circle Ring Graph */}
      <Svg height={stressSize} width={stressSize}
       style={{
       position: 'absolute', // Overlay on the outer ring
       }}>
        
        {/* Background Circle */}
        <Circle
          cx={stressRadius + stressStrokeWidth}
          cy={stressRadius + stressStrokeWidth}
          r={stressRadius}
          stroke="#e6e6e6"
          strokeWidth={stressStrokeWidth}
          fill="none"
        />
    
        {/* Progress Circle */}
        <Circle
          cx={stressRadius + stressStrokeWidth}
          cy={stressRadius + stressStrokeWidth}
          r={stressRadius}
          stroke="rgb(194, 51, 51)"
          strokeWidth={stressStrokeWidth}
          fill="none"
          strokeDasharray={stressCircumference}
          strokeDashoffset={stressOffset}
          strokeLinecap="butt" // Makes the stroke have a straight edge
          transform={`rotate(-90 ${stressRadius + stressStrokeWidth} ${stressRadius + stressStrokeWidth})`} // Start the stroke from 90 degrees
        />
      </Svg>

    </View>

    <Text style={styles.cardTitle}>Today's Metrics</Text>
    <View style={styles.card}>
      <Text style={styles.keyCardTitle}>Walking</Text>
      <Text style={styles.keyCardValue}>12000</Text>
    </View>

    <View style={styles.card}>
      <Text style={styles.keyCardTitle}>Sleep</Text>
      <Text style={styles.keyCardValue}>7Hr 24min</Text>
    </View>

    <Text style={styles.cardTitle}>Core Metrics</Text>
    <View style={styles.keyCardContainer}>
    <View style={styles.keyCard}>
      <Text style={styles.keyCardTitle}>Calories</Text>
      <Text style={styles.keyCardValue}>1950</Text>
    </View>

    <View style={styles.keyCard}>
      <Text style={styles.keyCardTitle}>Sleep</Text>
      <Text style={styles.keyCardValue}>98%</Text>
    </View>

    <View style={styles.keyCard}>
      <Text style={styles.keyCardTitle}>HRV</Text>
      <Text style={styles.keyCardValue}>105</Text>
    </View>

    <View style={styles.keyCard}>
      <Text style={styles.keyCardTitle}>RHR</Text>
      <Text style={styles.keyCardValue}>68</Text>
    </View>

    </View>

    <View style={styles.card}>
      <Text style={styles.keyCardTitle}>Stress Levels</Text>
      <LineChart
        data={stressData}
        width={Dimensions.get("window").width - 40}
        height={220}
        yAxisSuffix=""
        yAxisInterval={1}
        withHorizontalLabels={false}
        withInnerLines={false}
        withOuterLines={false}
        withShadow={false}
        chartConfig={{
          backgroundGradientFrom: "",
          backgroundGradientTo: "",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 128, 128, ${opacity})`, // Line color
          labelColor: (opacity = 1) => `rgba(0, 128, 128, ${opacity})`, // Axis label color
        }}

        bezier
        style={{marginVertical: 0, borderRadius: 15, paddingRight: 30, paddingLeft: 0}}
      />
    </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    padding: 20,
    marginBottom: 20,
  },
  ringContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative', // Allows the inner ring to overlay
    marginVertical: 20,
  },
  ring: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'rgb(110, 119, 131)',
    marginTop: 20,
  },
  keyCardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  keyCard: {
    width: '48%', // Approximately 40% of the screen width
    height: 80, // Fixed height
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  keyCardTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgb(110, 119, 131)',
  },
  keyCardValue: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 4,
    color: 'rgb(0, 128, 128)',
  },
  day: {
    fontSize: 26,
    color: 'rgb(0, 128, 128)',
    fontWeight: '700',
  },
  date: {
    marginBottom: 20,
    paddingLeft: 4,
    fontSize: 16,
    color: 'rgb(110, 119, 131)',
    fontWeight: '500',
  },
});