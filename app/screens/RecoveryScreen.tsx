// RecoveryScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './HomeScreen';
import ActivityLoad from "../ActivityLoad";

export default function RecoveryScreen({ navigation }) {
  const [selectedTab, setSelectedTab] = useState('Sleep');

  const sleepScore = 98;
  const recoveryData = 69;
  const recoveryPercentage = Math.min((recoveryData / 100) * 100, 100);

  const radius = 95;
  const strokeWidth = 15;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (sleepScore / 100) * circumference;
  const size = (radius + strokeWidth) * 2;

  const innerRadius = radius - 25;
  const innerStrokeWidth = 15;
  const innerCircumference = 2 * Math.PI * innerRadius;
  const innerOffset = innerCircumference - (recoveryPercentage / 100) * innerCircumference;
  const innerSize = (innerRadius + innerStrokeWidth) * 2;

  // Stages of sleep labeled
  const sleepStages = [
    { label: 'Awake', duration: '1h 53m', color: 'rgba(176, 187, 188, 0.46)' },
    { label: 'Dream', duration: '2h 32m', color: 'rgb(0, 255, 187)' }, // Fixed extra parenthesis
    { label: 'Light', duration: '1h 07m', color: 'rgb(0, 185, 195)' },
    { label: 'Deep', duration: '3h 35m', color: 'rgb(0, 103, 117)' },
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

  return (
    <View style={styles.container}>

     {/* Tab Bar at the top */}
     <View style={styles.fixedButtonsContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Stats' && styles.activeTab]}
          onPress={() => {
            setSelectedTab('Stats');
            navigation.navigate(HomeScreen); // Navigates to the Summary screen
          }}
        >
          <Text style={styles.tabText}>Stats</Text>
          {selectedTab === 'Stats' && <View style={styles.activeTabLine} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Sleep' && styles.activeTab]}
          onPress={() => {
            setSelectedTab('Sleep');
            navigation.navigate('RecoveryScreen'); // Navigates to the Recovery screen
          }}
        >
          <Text style={styles.tabText}>Recover</Text>
          {selectedTab === 'Sleep' && <View style={styles.activeTabLine} />}
        </TouchableOpacity>
      </View>

    {/* Start of scrollabale screen area */}
    <ScrollView style={styles.scrollView}>
    <View style={{ paddingHorizontal: 20, marginVertical: 10 }}>

      <View>
        <Text style={styles.heading}>Sleep & Recovery</Text>
      </View>

      <View style={styles.ringContainer}>
        {/* Ring Graph for Sleep */}
        <Svg height={size} width={size}>
          <Circle cx={radius + strokeWidth} cy={radius + strokeWidth} r={radius} stroke="rgba(0, 185, 195, 0.15)" strokeWidth={strokeWidth} fill="none" />
          <Circle cx={radius + strokeWidth} cy={radius + strokeWidth} r={radius} stroke="rgb(0, 185, 195)" strokeWidth={strokeWidth} fill="none" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="butt" transform={`rotate(-90 ${radius + strokeWidth} ${radius + strokeWidth})`} />
        </Svg>

        {/* Ring Graph for Recovery */}
        <Svg height={innerSize} width={innerSize} style={{ position: 'absolute', top: 25}}>
          <Circle cx={innerRadius + innerStrokeWidth} cy={innerRadius + innerStrokeWidth} r={innerRadius} stroke="rgba(0, 120, 160, 0.15)" strokeWidth={innerStrokeWidth} fill="none" />
          <Circle cx={innerRadius + innerStrokeWidth} cy={innerRadius + innerStrokeWidth} r={innerRadius} stroke="rgb(0, 120, 160)" strokeWidth={innerStrokeWidth} fill="none" strokeDasharray={innerCircumference} strokeDashoffset={innerOffset} strokeLinecap="butt" transform={`rotate(-90 ${innerRadius + innerStrokeWidth} ${innerRadius + innerStrokeWidth})`} />
        </Svg>

      </View>

      {/* Ring Graph metrics Sleep Quality & Recovery % */}
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20}}>
      <View style={styles.keyCard}>
        <Text style={styles.keyCardTitle}>Sleep Quality</Text>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
         <Icon name="circle" size={14} color="rgb(0, 185, 195)" style={{marginRight: 5, marginTop: 5}}/>
         <Text style={styles.keyCardValue}>{sleepScore} %</Text>
        </View>

      </View>

      <View style={styles.keyCard}>
        <Text style={styles.keyCardTitle}>Recovery Stat</Text>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
         <Icon name="circle" size={14} color="rgb(0, 120, 160)" style={{marginRight: 5, marginTop: 5}}/>
         <Text style={styles.keyCardValue}>{recoveryPercentage} %</Text>
        </View>

      </View>
      </View>

      {/* Sleep Activity, Sleep Timeline Tabs */}
      <View style={styles.card}>
      <Text style={[styles.cardTitle, {marginTop: 0}]}>Sleep Activities</Text>
    
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
      <View>
        <Text style={styles.keyCardTitle}>Time Slept</Text>
        <Text style={styles.keyCardValue}>7hr 24min </Text>
      </View>

      <View>
        <Text style={styles.keyCardTitle}>Time in bed</Text>
        <Text style={styles.keyCardValue}>8hr 48min</Text>
      </View>
      </View>

      {/* The Timeline Sleep Phases component */}
      <Text style={styles.cardTitle}>Sleep Phases</Text>
      <View style={styles.timelineContainer}>
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
      </View>

      {/* Recovery and Recovery Timeline */}
      <View style={styles.card}>
        <Text style={[styles.cardTitle, {marginTop: 0}]}>Recovery</Text>
    
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <View>
           <Text style={[styles.keyCardTitle, {fontSize: 12}]}>Heart Rate Variability</Text>
           <Text style={styles.keyCardValue}>105</Text>
          </View>

          <View>
            <Text style={[styles.keyCardTitle, {fontSize: 12}]}>Resting Heart Rate</Text>
            <Text style={styles.keyCardValue}>80</Text>
          </View>
        </View>

        <Text style={styles.cardTitle}>Activity Load</Text>
        <View style={styles.timelineContainer}>
          <ActivityLoad />
        </View>


      </View>

    </View>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'rgb(247, 249, 252)',
  },
  scrollView: {
    marginTop: 100, // Pushes the scrollable content below the fixed buttons
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fixedButtonsContainer: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgb(247, 249, 252)', // Add a background color to avoid overlap issues
    zIndex: 10, // Ensures it stays above the scrollable content
    paddingVertical: 10,
    shadowColor: 'rgb(247, 249, 252)',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5, // For Android
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  tab: {
    top: 10,
    alignItems: 'center',
    paddingVertical: 0,
    flex: 1,
    borderBottomWidth: 6,
    borderBottomColor: 'rgba(110, 119, 131, 0.1)',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: 'rgb(0, 128, 128)',
  },
  tabText: {
    fontSize: 20,
    fontFamily: 'Futura',
    fontWeight: '600',
    color: 'rgb(0, 128, 128)',
  },
  activeTabLine: {
    height: 3,
    width: '100%',
    backgroundColor: 'rgb(0, 128, 128)',
    marginTop: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 6,
  },
  tabLabel: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Futura',
    color: 'rgb(0, 128, 128)',
  },
  heading: {
    fontSize: 28,
    color: 'rgb(0, 80, 80)',
    fontWeight: '800',
    fontFamily: 'Avenir',
    textAlign: 'center',
    marginTop: 20,
  },
  ringContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: 30,
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
  miniCard: {
    fontFamily: 'Futura',
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 5,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2, // For Android
  },
  cardTitle: {
    fontFamily: 'Avenir',
    fontSize: 18,
    fontWeight: '900',
    color: 'rgb(0, 80, 80)',
    marginVertical: 10,
  },
  keyCardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  keyCard: {
    width: '45%',
    height: 80,
    backgroundColor: 'rgb(247, 249, 252)',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  keyCardTitle: {
    fontFamily: 'Avenir',
    fontSize: 14,
    fontWeight: '700',
    color: 'rgb(110, 119, 131)',
  },
  keyCardValue: {
    fontFamily: 'Avenir',
    fontSize: 20,
    fontWeight: '700',
    marginTop:0,
    color: 'rgb(0, 128, 128)',
  },
  timelineContainer: {
    width: '100%',
    backgroundColor: 'rgb(247, 249, 252)',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  timelineBar: {
    flexDirection: 'row',
    height: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  timelineSegment: {
    height: '100%',
  },
  timelineLabels: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginTop: 15,
  },
  timelineLabelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
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
    color: 'rgb(110, 119, 131)',
  },
});
