import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useState, useEffect } from 'react';

export default function HomeScreen() {

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


    <Text style={styles.cardTitle}>Today's Movement</Text>
    <View style={styles.keyCard}>
      <Text style={styles.keyCardTitle}>Walking</Text>
      <Text style={styles.keyCardValue}>12000</Text>
    </View>

    <View style={styles.keyCard}>
      <Text style={styles.keyCardTitle}>Sleep</Text>
      <Text style={styles.keyCardValue}>7Hr 24min</Text>
    </View>

    <Text style={[styles.cardTitle, {marginTop: 20}]}>Core Metrics</Text>
    <View style={styles.keyCard}>
      <Text style={styles.keyCardTitle}>Calories</Text>
      <Text style={styles.keyCardValue}>1950</Text>
    </View>

    <View style={styles.keyCard}>
      <Text style={styles.keyCardTitle}>HRV</Text>
      <Text style={styles.keyCardValue}>105</Text>
    </View>

    <View style={styles.keyCard}>
      <Text style={styles.keyCardTitle}>Sleep Perfomance</Text>
      <Text style={styles.keyCardValue}>98%</Text>
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
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`, // Line color
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Axis label color
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
    color: 'gray',
  },
  keyCard: {
    width: '100%',
    height: '10%',
    backgroundColor: 'white',
    padding: 20,
    marginTop: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  keyCardTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'gray',
  },
  keyCardValue: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 4,
    color: 'tomato',
  },
  day: {
    fontSize: 26,
    color: 'tomato',
    fontWeight: '700',
  },
  date: {
    marginBottom: 20,
    paddingLeft: 4,
    fontSize: 16,
    color: 'gray',
    fontWeight: '500',
  },
});