import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";

// Sample hourly activity data
const hourlyActivity = [
  { time: "12am", steps: 0, running: 0, swimming: 0, hiit: 0, cycling: 0, hiking: 0, functional: 0, strength: 0 },
  { time: "6am", steps: 500, running: 5, swimming: 0, hiit: 0, cycling: 0, hiking: 0, functional: 0, strength: 5 },
  { time: "9am", steps: 1200, running: 10, swimming: 0, hiit: 10, cycling: 0, hiking: 5, functional: 0, strength: 0 },
  { time: "12pm", steps: 4000, running: 20, swimming: 10, hiit: 0, cycling: 15, hiking: 0, functional: 10, strength: 5 },
  { time: "3pm", steps: 2500, running: 5, swimming: 5, hiit: 15, cycling: 10, hiking: 0, functional: 5, strength: 10 },
  { time: "6pm", steps: 3500, running: 15, swimming: 10, hiit: 0, cycling: 20, hiking: 10, functional: 10, strength: 15 },
  { time: "9pm", steps: 1000, running: 0, swimming: 5, hiit: 5, cycling: 0, hiking: 5, functional: 0, strength: 5 },
  { time: "12am", steps: 200, running: 0, swimming: 0, hiit: 0, cycling: 0, hiking: 0, functional: 0, strength: 0 },
];

// Activity score multipliers
const activityScores = {
  steps: 1 / 100,  // 1 per 100 steps
  running: 2,      // 2 per minute
  swimming: 2.5,   // 2.5 per minute
  hiit: 3,         // 3 per minute
  cycling: 1.5,    // 1.5 per minute
  hiking: 2.2,     // 2.2 per minute
  functional: 2.8, // 2.8 per minute
  strength: 2,     // 2 per minute
};

// Function to calculate activity load per time slot
const calculateActivityLoad = (data: any[]) => {
  return data.map((entry) => {
    return Object.keys(activityScores).reduce((total, key) => {
      return total + entry[key] * activityScores[key];
    }, 0);
  });
};

// Function to calculate total activity load for the day
const calculateTotalLoad = (data: any[]) => {
  return calculateActivityLoad(data).reduce((sum, value) => sum + value, 0)/10;
};

// Function to compare today’s load vs. past 7-day average
const getLoadComparison = (todayLoad: number, past7DayAverage: number) => {
  const difference = todayLoad - past7DayAverage;
  const percentage = ((difference / past7DayAverage) * 100).toFixed(1);

  if (difference > 15) return <Text style={styles.summary}>High Activity! You did {percentage}% more than usual.</Text>;
  if (difference < -15) return <Text style={styles.summary}>Low Activity. You're {percentage}% below your usual level.</Text>;
  return <Text style={styles.summary}>Balanced Activity! You're in line with your usual trend.</Text>;
};

const ActivityLoad = () => {
  const activityLoadData = calculateActivityLoad(hourlyActivity);
  const totalActivityLoad = calculateTotalLoad(hourlyActivity);

  // Mock past 7-day average (replace with real data later)
  const past7DayAverage = 20; // Example past average activity load
  const summaryText = getLoadComparison(totalActivityLoad, past7DayAverage);

  // Chart Data
  const chartData = {
    labels: hourlyActivity.map((entry) => entry.time), // Time intervals
    datasets: [
      {
        data: activityLoadData,
      },
    ],
  };

  return (
    <View style={{ padding: 0 }}>

      <View style={{right: 50}}> 
      <LineChart
        data={chartData}
        width={Dimensions.get("window").width - 30}
        height={220}
        yAxisLabel=""
        yLabelsOffset={9999}
        chartConfig={{
          backgroundColor: "rgb(247, 249, 252)",
          backgroundGradientFrom: "rgb(247, 249, 252)",
          backgroundGradientTo: "rgb(247, 249, 252)",
          color: (opacity = 1) => `rgba(0, 128, 128, ${opacity})`,
          strokeWidth: 3,
          propsForBackgroundLines: {
            strokeWidth: 0
          }
        }}
        bezier
      />
      </View> 

      {/* Daily Summary */}
      <View style={{ marginTop: 0, padding: 0}}>
        <Text style={[styles.exertion, { fontSize: 14, marginTop: 5 }]}>Exertion is at {totalActivityLoad.toFixed(1)}%</Text>
        <Text style={[styles.summary, { fontSize: 14, marginTop: 5 }]}>{summaryText}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    summary: {
        fontFamily: 'Avenir',
        fontSize: 14,
        fontWeight: '700',
        color: 'rgb(110, 119, 131)', 
    },
    exertion: {
        fontFamily: 'Avenir',
        fontSize: 18,
        fontWeight: '900',
        color: 'rgb(0, 80, 80)',
        marginVertical: 0,
      },
});

export default ActivityLoad;
