// RecoveryScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import HomeScreen from './HomeScreen';

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
    marginVertical: 20,
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
    width: '48%',
    height: 80,
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
});
