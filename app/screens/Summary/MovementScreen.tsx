import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';
import { ScrollView } from 'react-native';

export default function MovementDetails() {
  // Sample data, replace with real movement data
  const movementData = {
    stepGoal: 10000,
    steps: 600,
    stepLength: 0.762, // in meters
    time: 45, // in minutes
  };

  // Sample data, to be replaced with live data
  const last7DaysData = [
    { day: 'Mon', steps: 7500 },
    { day: 'Tue', steps: 8200 },
    { day: 'Wed', steps: 6000 },
    { day: 'Thu', steps: 7000 },
    { day: 'Fri', steps: 9100 },
    { day: 'Sat', steps: 8500 },
    { day: 'Sun', steps: 19200 },
  ];

  // Live Date updates
  const formatDate = (date) => {
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

  // Calculating average steps from last 7 days
  const averageSteps = Math.round(
    last7DaysData.reduce((sum, item) => sum + item.steps, 0) / last7DaysData.length
  );

  // Calculate distance (KM) and walking speed (KM/h)
  const distance = (movementData.steps * movementData.stepLength) / 1000; // convert meters to KM
  const walkingSpeed = distance / (movementData.time / 60); // speed in KM/h

  // Calculate the percentage of the goal achieved
  const percentage = (movementData.steps / movementData.stepGoal) * 100;
  const overflowPercentage = percentage > 100 ? percentage - 100 : 0;
  const DoubleOverflowPercentage = percentage > 200 ? percentage - 200 : 0;
  const TripleOverflowPercentage = percentage > 300 ? percentage - 300 : 0;

  // Ring configuration
  const radius = 80; // Radius of the circle
  const strokeWidth = 20; // Stroke width for the ring
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const offset = circumference - (percentage / 100) * circumference; // Offset for the stroke
  const overflowOffset = circumference - (overflowPercentage / 100) * circumference;
  const DoubleOverflowOffset = circumference - (DoubleOverflowPercentage / 100) * circumference;
  const TripleOverflowOffset = circumference - (TripleOverflowPercentage / 100) * circumference;
  const size = (radius + strokeWidth) * 2;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View>
        <Text style={styles.StepMain}>Steps</Text>
        <Text style={styles.StepData}>{movementData.steps}</Text>
        <Text style={[styles.StepMain, { fontSize: 15 }]}>{currentDate}</Text>
      </View>

      <View style={styles.ring}>
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
            stroke="#00ff4c"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="butt" // Makes the stroke have a straight edge
            transform="rotate(-90 100 100)" // Start the stroke from 90 degrees
          />

          {/* Overflow Circle (Green part above 100%) */}
          {overflowPercentage > 0 && (
            <Circle
              cx={radius + strokeWidth} // Adjusted for center
              cy={radius + strokeWidth} // Adjusted for center
              r={radius}
              stroke="#00cf3e"
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={overflowOffset}
              strokeLinecap="butt"
              transform="rotate(-90 100 100)"
            />
          )}

          {/* Overflow Circle (Deep Green part above 200%) */}
          {overflowPercentage > 0 && (
            <Circle
              cx={radius + strokeWidth} // Adjusted for center
              cy={radius + strokeWidth} // Adjusted for center
              r={radius}
              stroke="#00a331"
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={DoubleOverflowOffset}
              strokeLinecap="butt"
              transform="rotate(-90 100 100)"
            />
          )}

          {/* Overflow Circle (Deeper Green part above 300%) */}
          {overflowPercentage > 0 && (
            <Circle
              cx={radius + strokeWidth} // Adjusted for center
              cy={radius + strokeWidth} // Adjusted for center
              r={radius}
              stroke="#006e21"
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={TripleOverflowOffset}
              strokeLinecap="butt"
              transform="rotate(-90 100 100)"
            />
          )}
        </Svg>

        {/* Percentage Text */}
        <Text style={styles.percentageText}>{Math.round(percentage)}%</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.averageSteps}>Average</Text>
        <Text style={[styles.StepData, { fontSize: 30, paddingTop: 10 }]}>{averageSteps}</Text>
        <Svg height={200} width="100%">
          {last7DaysData.map((item, index) => {
            const barHeight = (item.steps / movementData.stepGoal) * 100; // Normalize bar height
            return (
              <React.Fragment key={index}>
                {/* Bar */}
                <Rect
                  x={index * 40 + 20} // Adjust spacing between bars
                  y={200 - barHeight} // Start position for the bar
                  width={20} // Bar width
                  height={barHeight} // Bar height
                  fill="tomato"
                />
              </React.Fragment>
            );
          })}
        </Svg>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Distance Walked (KM)</Text>
        <Text style={styles.cardValue}>{distance.toFixed(2)} km</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Walking Speed (KM/h)</Text>
        <Text style={styles.cardValue}>{walkingSpeed.toFixed(2)} km/h</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Step Length</Text>
        <Text style={styles.cardValue}>{movementData.stepLength} meters</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  ring: {
    alignItems: 'center',
    margin: 20,
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
    fontWeight: '600',
  },
  cardValue: {
    fontSize: 16,
    marginTop: 5,
    color: '#333',
  },
  StepMain: {
    fontSize: 20,
    color: 'gray',
    fontWeight: 500,
  },
  StepData: {
    fontSize: 40,
    color: 'tomato',
    fontWeight: 800,
  },
  averageSteps: {
    position: 'absolute',
    top: 10,
    left: 15,
    fontSize: 14,
    fontWeight: '600',
    color: 'gray',
  },
  percentageText: {
    fontSize: 18,
    fontWeight: '600',
    position: 'absolute',
    top: '45%',
    left: '45%',
    color: '#333',
  },
});

