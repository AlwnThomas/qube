// RecoveryScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import HomeScreen from './HomeScreen';

export default function RecoveryScreen({ navigation }) {
  const [selectedTab, setSelectedTab] = useState('Sleep');
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Tab Bar at the top */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Stats' && styles.activeTab]}
          onPress={() => {
            setSelectedTab('Stats');
            navigation.navigate('HomeScreen'); // Navigate to HomeScreen
          }}
        >
          <Text style={styles.tabText}>Stats</Text>
          {selectedTab === 'Stats' && <View style={styles.activeTabLine} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Sleep' && styles.activeTab]}
          onPress={() => {
            setSelectedTab('Sleep');
            navigation.navigate('RecoveryScreen'); // Navigate to RecoveryScreen
          }}
        >
          <Text style={styles.tabText}>Sleep</Text>
          {selectedTab === 'Sleep' && <View style={styles.activeTabLine} />}
        </TouchableOpacity>
      </View>

      {/* Content based on active tab */}
      <View style={styles.screen}>
        {selectedTab === 'Stats' && (
          <Text style={styles.cardTitle}>Stats Content</Text>
          // Add content related to Stats here
        )}

        {selectedTab === 'Sleep' && (
          <Text style={styles.cardTitle}>Sleep Content</Text>
          // Add content related to Sleep here
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: 'rgb(247, 249, 252)',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 60,
    marginBottom: 0,
  },
  tab: {
    alignItems: 'center',
    paddingVertical: 0,
    flex: 1,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: 'rgb(0, 128, 128)',
  },
  tabText: {
    fontSize: 18,
    fontFamily: 'Helvetica',
    fontWeight: '600',
    color: 'rgb(0, 128, 128)',
  },
  activeTabLine: {
    height: 5,
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
    fontFamily: 'Helvetica',
    color: 'rgb(0, 128, 128)',
  },
  ringContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginVertical: 20,
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
