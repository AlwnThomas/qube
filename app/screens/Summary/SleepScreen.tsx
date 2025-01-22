import React, { useState, useEffect } from 'react';
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

  // Replace with realtime data
  const sleepData = '7hr 04min';
  const timeInBedData = '8hr 35min';

  // Sleep Stat Cards
  const SleepStatsCards = () => {
    const stats = [
      {
        title: 'Regularity',
        value: (
          <Text>
            85<Text style={styles.statValueSmall}> %</Text>
          </Text>
        ),
      },
      {
        title: 'Asleep After',
        value: (
          <Text>
            45<Text style={styles.statValueSmall}> min</Text>
          </Text>
        ),
      },
      {
        title: 'Went to bed',
        value: (
          <Text>
            6:45<Text style={styles.statValueSmall}> PM</Text>
          </Text>
        ),
      },
      {
        title: 'Wake Up',
        value: (
          <Text>
            6:45<Text style={styles.statValueSmall}> AM</Text>
          </Text>
        ),
      },
    ];

    return (
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <Text style={styles.statTitle}>{stat.title}</Text>
            <Text style={styles.statValue}>{stat.value}</Text>
          </View>
        ))}
      </View>
    );
  };

  // Stages of sleep labeled
  const sleepStages = [
    { label: 'Awake', duration: '0h 53m', color: 'rgb(232, 225, 225)' },
    { label: 'Dream', duration: '0h 32m', color: 'rgb(254, 191, 32)' }, // Fixed extra parenthesis
    { label: 'Light', duration: '3h 07m', color: 'tomato' },
    { label: 'Deep', duration: '0h 35m', color: 'rgba(186, 8, 8, 0.8)' },
  ];

  // Helper function to convert duration to minutes
  const convertDurationToMinutes = (duration: string) => {
    const [hours, minutes] = duration.split(' ').map((part) => parseFloat(part));
    return hours * 60 + minutes;
  };

  // Calculate total duration of all sleep stages
  const totalDuration = sleepStages.reduce(
    (total, stage) => total + convertDurationToMinutes(stage.duration),
    0
  );

  // Sleep Phases Timeline
  const Timeline = () => {
    return (
      <View style={styles.timelineContainer}>
        <Text style={styles.cardTitle}>Sleep Phases</Text>
        <View style={styles.timelineBar}>
          {sleepStages.map((stage, index) => (
            <View
              key={index}
              style={[
                styles.timelineSegment,
                {
                  flex: convertDurationToMinutes(stage.duration) / totalDuration,
                  backgroundColor: stage.color,
                },
              ]}
            />
          ))}
        </View>
        <View style={styles.timelineLabels}>
          {sleepStages.map((stage, index) => (
            <View key={index} style={styles.timelineLabelItem}>
              <View
                style={[styles.timelineLabelColor, { backgroundColor: stage.color }]}
              />
              <Text style={styles.timelineLabelText}>
                {stage.label} ({stage.duration})
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const [selectedHour, setSelectedHour] = useState('12'); // State to store selected hour
  const [selectedMinute, setSelectedMinute] = useState('00');

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
        <View/>

        {/* Picker Row */}
        <View style={styles.pickerRow}>
          {/* Hour Picker */}
          <View style={[styles.whiteBox, { transform: [{ translateX: -50 }, {translateY: 33}] }]} />
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
          <View style={[styles.whiteBox, { transform: [{ translateX: 50 }, {translateY: 33}] }]} />
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
        <Text style={[styles.clockBoxTitle, { top: 60 }]}>
          {wakeUpTimeRange}
        </Text>
      </View>

      <View>
        <Text style={styles.day}>{currentDay}</Text>
      </View>

      {/* The Timeline Sleep Phases component */}
      <Timeline />

      {/* Render the SleepStatsCards component */}
      <SleepStatsCards />

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
    color: 'gray',
    fontSize: 16,
    fontWeight: '600',
    paddingBottom: 10,
  },
  cardValue: {
    fontSize: 16,
    marginTop: 5,
    color: '#333',
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
    marginTop: 10,
    height: 150, // Height to accommodate the pickers
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Needed for absolute positioning of the white box
    
  },
  whiteBox: {
    width: '31%',
    height: 50, // Height of the box around the selected value
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 10,
    borderColor: 'rgba(255, 99, 71, 0.66)',
    borderWidth: 1,
    position: 'absolute', // Position the box absolutely
    shadowColor: '#000', // Optional shadow for better visuals
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  clockBoxTitle: {
    fontSize: 14,
    color: 'gray',
    fontWeight: '500',
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
  day: {
    marginTop: 80,
    marginBottom: 10,
    fontSize: 26,
    color: 'tomato',
    fontWeight: '700',
  },
  timelineContainer: {
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  timelineBar: {
    flexDirection: 'row',
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  timelineSegment: {
    height: '100%',
  },
  timelineLabels: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  timelineLabelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 5,
  },
  timelineLabelColor: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  timelineLabelText: {
    fontSize: 12,
    color: 'gray',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  statCard: {
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
  statTitle: {
    fontSize: 12,
    color: 'gray',
    fontWeight: '500',
    textAlign: 'left',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
    color: 'tomato',
    marginTop: 5,
    textAlign: 'left',
  },
  statValueSmall: {
    fontSize: 14,
    fontWeight: '600',
    color: 'tomato',
    textAlign: 'left',
  },
});