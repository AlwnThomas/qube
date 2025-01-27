import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Svg, { Rect, Text as SvgText } from 'react-native-svg';

export default function EnergyScreen() {

const originalActiveData = [0,340,0,1560,0];

//Example data for active energy, replace with realtime
const activeData = {
  labels: ["12am", "6am", "12pm", "6pm", "12am"],
  datasets: [
    {
      data: originalActiveData,
      color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

//Calories Burned as cumulative from activedata
const caloriesBurned = originalActiveData.reduce((acc, value) => acc + value, 0);
const restingEnergy = 1500;
const totalEnergy = caloriesBurned + restingEnergy;
const energyFraction = totalEnergy / 4;

//Example data for total energy per hours
const newActiveData = {
  labels: activeData.labels, // Keep the same labels
  datasets: [
    {
      data: activeData.datasets[0].data.map(value => value + energyFraction), // Add energyFraction to each value
      color: (opacity = 1) => `rgba(99, 132, 255, ${opacity})`, // Different color if needed
      strokeWidth: 2,
    },
  ],
};

//Example data for resting energy, replace with realtime
const restingData = {
  labels: ["12am", "6am", "12pm", "6pm", "12am"],
  datasets: [
    {
      data: [250, 250, 250, 250, 250].reduce((acc: number[], curr: number) =>{ //Replace with realtime data
        const lastValue = acc[acc.length - 1] || 0;
        acc.push(curr + lastValue);
        return acc;
      }, []), //Cumulative data
      color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

//Total Energy Calculation
const totalEnergyData = activeData.datasets[0].data.map((activeValue, index) => {
  return activeValue + restingData.datasets[0].data[index];
});

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
  
  return `${day}${suffix} ${month} ${year}`; };
  
const currentDate = formatDate(new Date()); // current date in format '1st Jan 2025'

  return (  
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View>
        <Text style={styles.caloriesMain}>Active Calories Burned</Text>
        <Text style={styles.caloriesData}>{caloriesBurned}</Text>
        <Text style={[styles.caloriesMain, { fontSize: 15 }]}>{currentDate}</Text>
      </View>

      //Bar Chart for Average Visualisation
      <View style={styles.barChart}>
        <Svg height={220} width="100%">
          {activeData.datasets[0].data.map((item, index) => {
            const maxValue = Math.max(...totalEnergyData);
            const barHeight = (item / maxValue) * 250; // Set the bar height to total energy
            return (
              <React.Fragment key={index}>
                {/* Bar */}
                <Rect
                  x={index * 50 + 75} // Adjust spacing between bars
                  y={200 - barHeight} // Start position for the bar
                  width={25} // Bar width
                  height={barHeight} // Bar height
                  fill="rgb(0, 128, 128)"
                />

                {/* Time Labels on Horizontal Axis */}
              <SvgText
                x={index * 50 + 88} 
                y={210} // Positioning the label below each bar
                fontSize="10"
                fill="black"
                textAnchor="middle"
              >
                {activeData.labels[index]}
              </SvgText>

              </React.Fragment>
            );
          })}
        </Svg>
      </View>

      <View style={styles.card}>
        <Text style={styles.chartTitle}>Total Energy Expenditure</Text>
        <Text style={[styles.caloriesData, { fontSize: 40, fontWeight: 500 }]}>{totalEnergy}</Text>
        <LineChart
          data={newActiveData}
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
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`, // Line color
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Axis label color
          }}

          bezier
          style={{marginVertical: 0, borderRadius: 15, paddingRight: 30, paddingLeft: 0}}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.chartTitle}>Resting Energy</Text>
        <Text style={[styles.caloriesData, { fontSize: 40, fontWeight: 500 }]}>{restingEnergy}</Text>
        <LineChart
          data={restingData}
          width={Dimensions.get("window").width - 40}
          height={220}
          yAxisSuffix=""
          yAxisInterval={1}
          withHorizontalLabels={false}
          withInnerLines={false}
          withOuterLines={false}
          withShadow={false}
          chartConfig={{
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`, // Line color
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Axis label color
          }}

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
    paddingBottom: 20,
  },
  ring: {
    alignItems: 'center',
    margin: 20,
    position: 'relative',
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
  barChart: {
    width: '100%',
    paddingVertical: 20,
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
  caloriesMain: {
    fontSize: 18,
    color: 'rgb(110, 119, 131)',
    fontWeight: 500,
  },
  caloriesData: {
    fontSize: 40,
    color: 'rgb(0, 128, 128)',
    fontWeight: 700,
  },
  chartTitle: {
    fontSize: 12,
    color: 'rgb(110, 119, 131)',
    fontWeight: 500,
  }
});