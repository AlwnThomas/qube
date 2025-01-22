import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
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

  const [selectedHour, setSelectedHour] = useState('12'); // State to store selected hour
  const [selectedMinute, setSelectedMinute] = useState("00");

  // Function to calculate the time 30 minutes later
  const calculateWakeUpTime = (hour: string, minute: string) => {
    // Create a Date object with the selected time
    const date = new Date();
    date.setHours(parseInt(hour, 10));
    date.setMinutes(parseInt(minute, 10));

    // Add 30 minutes
    date.setMinutes(date.getMinutes() + 30);

    // Format the new time as HH:MM
    const newHour = date.getHours().toString().padStart(2, '0');
    const newMinute = date.getMinutes().toString().padStart(2, '0');

    return `${newHour}:${newMinute}`;
  };

  // Calculate the wake-up time range
  const wakeUpTimeRange = `Wake up between ${selectedHour}:${selectedMinute} and ${calculateWakeUpTime(selectedHour, selectedMinute)}`;

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
        <Text style={[styles.sleepMain, { fontSize: 15, paddingTop: 5 }]}>{currentDate}</Text>
      </View>

      {/* Container for the pickers and the white box */}
      <View style={styles.pickerContainer}>
        {/* Small Box for the Clock */}
        <View style={[styles.whiteBox]} />

        {/* Picker Row */}
        <View style={styles.pickerRow}>
          {/* Hour Picker */}
          <Picker
            selectedValue={selectedHour}
            onValueChange={(itemValue) => setSelectedHour(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            {[...Array(24).keys()].map((hour) => (
              <Picker.Item
                key={hour}
                label={`${hour < 10 ? '0' : ''}${hour}`}
                value={`${hour < 10 ? '0' : ''}${hour}`}
              />
            ))}
          </Picker>

          {/* Minute Picker */}
          <Picker
            selectedValue={selectedMinute}
            onValueChange={(itemValue) => setSelectedMinute(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            {[...Array(60).keys()].map((minute) => (
              <Picker.Item
                key={minute}
                label={`${minute < 10 ? '0' : ''}${minute}`}
                value={`${minute < 10 ? '0' : ''}${minute}`}
              />
            ))}
          </Picker>
        </View>
      </View>

      <View>
        <Text style={[styles.clockBoxTitle, { top: 140 }]}>
          {wakeUpTimeRange}
        </Text>
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
  },
  column: {
    flex: 0, // Ensure the column takes equal space
  },
  alignLeft: {
    alignItems: 'flex-start', // Align the text to the left side
    justifyContent: 'flex-start',
    marginLeft: 0, // Ensure no extra margin
    paddingLeft: 0, // Ensure no extra padding
  },
  sleepMain: {
    fontSize: 15,
    color: 'gray',
    fontWeight: '500',
  },
  sleepData: {
    fontSize: 26,
    color: 'tomato',
    fontWeight: '800',
  },
  pickerContainer: {
    width: '80%',
    alignSelf: 'center',
    marginTop: 20,
    height: 150, // Height to accommodate the pickers
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Needed for absolute positioning of the white box
  },
  whiteBox: {
    width: '68.5%',
    height: 50, // Height of the box around the selected value
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: 'tomato',
    borderWidth: 1,
    position: 'absolute', // Position the box absolutely
    top: '50%', // Center vertically
    left: '50%', // Center horizontally
    transform: [{ translateX: -92 }, { translateY: 8 }], // Adjust to center the box
    shadowColor: '#000', // Optional shadow for better visuals
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  clockBoxTitle: {
    fontSize: 18,
    color: 'gray',
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  pickerRow: {
    flexDirection: 'row', // Align child Views horizontally
    justifyContent: 'center', // Center the pickers horizontally
    alignItems: 'center', // Center the pickers vertically
  },
  picker: {
    width: 100, // Set a fixed width for the pickers
    height: 150, // Increase height to ensure the picker is fully visible
  },
  pickerItem: {
    color: 'tomato',
  },
});