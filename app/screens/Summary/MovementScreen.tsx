import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, {Circle} from 'react-native-svg';

export default function MovementDetails() {
  // Sample data, replace with real movement data
  const movementData = {
    stepGoal: 10000,
    steps: 40000,
    stepLength: 0.762, // in meters
    time: 45, // in minutes
  };

  // Calculate distance (KM) and walking speed (KM/h)
  const distance = (movementData.steps * movementData.stepLength) / 1000; // convert meters to KM
  const walkingSpeed = distance / (movementData.time / 60); // speed in KM/h

  // Calculate the percentage of the goal achieved
  const percentage = (movementData.steps/ movementData.stepGoal) * 100;
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
    <View style={styles.container}>

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
      <Text style={styles.percentageText}>
        {Math.round(percentage)}%
      </Text>
    </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Steps</Text>
        <Text style={styles.cardValue}>{movementData.steps}</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  ring: {
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
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
  percentageText: {
    fontSize: 18,
    fontWeight: '600',
    position: 'absolute',
    top: '45%',
    left: '45%',
    color: '#333',
  },
});
