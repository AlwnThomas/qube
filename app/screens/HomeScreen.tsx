import React, { useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Svg, { Circle } from 'react-native-svg';

export default function HomeScreen({navigation}) {

  const [selectedTab, setSelectedTab] = useState('Stats'); 

  const movementData = {
    stepGoal: 10000,
    steps: 14000,
    stepLength: 0.762, // in meters
    time: 45, // in minutes
  };

  const recoveryData = 69;
  const stressPercentData = 20;

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' }); // e.g., 'Jan'
    const year = date.getFullYear();

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

  const currentDate = formatDate(new Date());

  const stepPercentage = Math.min((movementData.steps / movementData.stepGoal) * 100, 100);
  const recoveryPercentage = Math.min((recoveryData / 100) * 100, 100);
  const stressPercentage = Math.min((stressPercentData / 100) * 100, 100);

  const radius = 75;
  const strokeWidth = 15;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (stepPercentage / 100) * circumference;
  const size = (radius + strokeWidth) * 2;

  const innerRadius = radius - 20;
  const innerStrokeWidth = 15;
  const innerCircumference = 2 * Math.PI * innerRadius;
  const innerOffset = innerCircumference - (recoveryPercentage / 100) * innerCircumference;
  const innerSize = (innerRadius + innerStrokeWidth) * 2;

  const stressRadius = radius - 40;
  const stressStrokeWidth = 15;
  const stressCircumference = 2 * Math.PI * stressRadius;
  const stressOffset = stressCircumference - (stressPercentage / 100) * stressCircumference;
  const stressSize = (stressRadius + stressStrokeWidth) * 2;

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
  const getDay = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    return days[today.getDay()];
  };

  useEffect(() => {
    setCurrentDay(getDay());
    const now = new Date();
    const msUntilMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - now.getTime();

    const timer = setTimeout(() => {
      setCurrentDay(getDay());
    }, msUntilMidnight);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>

     {/* Tab Bar at the top */}
     <View style={styles.tabContainer}>
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
          <Text style={styles.tabText}>Sleep</Text>
          {selectedTab === 'Sleep' && <View style={styles.activeTabLine} />}
        </TouchableOpacity>
      </View>

      <View style={{ paddingHorizontal: 20, marginVertical: 10 }}>
        <View>
          <Text style={styles.day}>{currentDay}</Text>
          <Text style={styles.date}>{currentDate}</Text>
        </View>

        {/* Ring Graph for Movement */}
        <View style={styles.ringContainer}>
          <Svg height={size} width={size}>
            <Circle cx={radius + strokeWidth} cy={radius + strokeWidth} r={radius} stroke="#e6e6e6" strokeWidth={strokeWidth} fill="none" />
            <Circle cx={radius + strokeWidth} cy={radius + strokeWidth} r={radius} stroke="rgb(0, 235, 106)" strokeWidth={strokeWidth} fill="none" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="butt" transform={`rotate(-90 ${radius + strokeWidth} ${radius + strokeWidth})`} />
          </Svg>

          {/* Ring Graph for Recovery */}
          <Svg height={innerSize} width={innerSize} style={{ position: 'absolute' }}>
            <Circle cx={innerRadius + innerStrokeWidth} cy={innerRadius + innerStrokeWidth} r={innerRadius} stroke="#e6e6e6" strokeWidth={innerStrokeWidth} fill="none" />
            <Circle cx={innerRadius + innerStrokeWidth} cy={innerRadius + innerStrokeWidth} r={innerRadius} stroke="rgb(0, 128, 128)" strokeWidth={innerStrokeWidth} fill="none" strokeDasharray={innerCircumference} strokeDashoffset={innerOffset} strokeLinecap="butt" transform={`rotate(-90 ${innerRadius + innerStrokeWidth} ${innerRadius + innerStrokeWidth})`} />
          </Svg>

          {/* Ring Graph for Stress */}
          <Svg height={stressSize} width={stressSize} style={{ position: 'absolute' }}>
            <Circle cx={stressRadius + stressStrokeWidth} cy={stressRadius + stressStrokeWidth} r={stressRadius} stroke="#e6e6e6" strokeWidth={stressStrokeWidth} fill="none" />
            <Circle cx={stressRadius + stressStrokeWidth} cy={stressRadius + stressStrokeWidth} r={stressRadius} stroke="rgb(194, 51, 51)" strokeWidth={stressStrokeWidth} fill="none" strokeDasharray={stressCircumference} strokeDashoffset={stressOffset} strokeLinecap="butt" transform={`rotate(-90 ${stressRadius + stressStrokeWidth} ${stressRadius + stressStrokeWidth})`} />
          </Svg>
        </View>

        <Text style={styles.cardTitle}>Today's Metrics</Text>
        <View style={styles.card}>
          <Text style={styles.keyCardTitle}>Walking</Text>
          <Text style={styles.keyCardValue}>12000</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.keyCardTitle}>Sleep</Text>
          <Text style={styles.keyCardValue}>7Hr 24min</Text>
        </View>

        <Text style={styles.cardTitle}>Core Metrics</Text>
        <View style={styles.keyCardContainer}>
          <View style={styles.keyCard}>
            <Text style={styles.keyCardTitle}>Calories</Text>
            <Text style={styles.keyCardValue}>1950</Text>
          </View>

          <View style={styles.keyCard}>
            <Text style={styles.keyCardTitle}>Sleep</Text>
            <Text style={styles.keyCardValue}>98%</Text>
          </View>

          <View style={styles.keyCard}>
            <Text style={styles.keyCardTitle}>HRV</Text>
            <Text style={styles.keyCardValue}>105</Text>
          </View>

          <View style={styles.keyCard}>
            <Text style={styles.keyCardTitle}>RHR</Text>
            <Text style={styles.keyCardValue}>68</Text>
          </View>
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
              color: (opacity = 1) => `rgba(0, 128, 128, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 128, 128, ${opacity})`,
            }}
            bezier
            style={{ marginVertical: 0, borderRadius: 15, paddingRight: 30, paddingLeft: 0 }}
          />
        </View>

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
  day: {
    fontSize: 26,
    color: 'rgb(0, 80, 80)',
    fontWeight: '700',
    fontFamily: 'Helvetica',
  },
  date: {
    marginBottom: 20,
    paddingLeft: 4,
    fontSize: 16,
    color: 'rgb(110, 119, 131)',
    fontWeight: '500',
    fontFamily: 'Helvetica',
  },
});
