import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function SleepScreen() {

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

  const sleepData = "7hr 04min";
  const timeInBedData = "8hr 35min";

  const [selectedHour, setSelectedHour] = useState('12');  // State to store selected hour

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>

      <View style={styles.row}>
        {/* Left side for "Avg Time Asleep" */}
       <View style={styles.column}>
         <Text style={styles.sleepMain}>Avg Time Asleep</Text>
         <Text style={styles.sleepData}>{sleepData}</Text>
       </View>

       {/* Right side for "Avg Time in Bed" aligned to the left */}
        <View style={[styles.column, styles.alignLeft]}>
          <Text style={[styles.sleepMain, { fontSize: 15 }]}>Avg Time in Bed</Text>
         <Text style={styles.sleepData}>{timeInBedData}</Text>
        </View>
      </View>
      
      <View>
      <Text style={[styles.sleepMain, { fontSize: 15, paddingTop: 5}]}>{currentDate}</Text>
      </View>

      {/* Small Box for the Clock */}
      <View style={styles.clockBox}>
        <Picker
          selectedValue={selectedHour}
          onValueChange={(itemValue) => setSelectedHour(itemValue)}
          style={styles.picker}
          itemStyle={styles.pickerItem}>
          {/* Generate 24-hour clock */}
          {[...Array(24).keys()].map((hour) => (
            <Picker.Item
              key={hour}
              label={`${hour < 10 ? '0' : ''}${hour}:00`}
              value={`${hour < 10 ? '0' : ''}${hour}`}
            />
          ))}
        </Picker>
      </View>
      
      <View>
        <Text style={[styles.clockBoxTitle, {top: 140}]}>Wake up between</Text>
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
  row: {
    flexDirection: 'row', // Align child Views horizontally
    justifyContent: 'space-between', // Spread the two Views evenly
    marginTop: 10,
  },
  column: {
    flex: 1, // Ensure the column takes equal space
  },
  alignLeft: {
    alignItems: 'flex-start', // Align the text to the left side
    justifyContent: 'flex-start',
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
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  cardValue: {
    fontSize: 16,
    marginTop: 5,
    color: '#333',
  },
  sleepMain: {
    fontSize: 15,
    color: 'gray',
    fontWeight: 500,
  },
  sleepData: {
    fontSize: 26,
    color: 'tomato',
    fontWeight: 800,
  },
  clockBox: {
    width: '60%',
    alignSelf: 'center',
  },
  clockBoxTitle: {
    fontSize: 18,
    color: 'gray',
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  picker: {
    height: '10%',
    width: '100%',
    alignSelf: 'center',
  },
  pickerItem: {
    color: 'tomato',
  },
});