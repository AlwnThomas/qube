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
          <Text style={styles.tabText}>Sleep</Text>
          {selectedTab === 'Sleep' && <View style={styles.activeTabLine} />}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>

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

        <Text style={styles.cardTitle}>Daily Overview</Text>
        <View style={styles.card}>
          <Text style={styles.keyCardTitle}>Walking</Text>
          <Text style={styles.keyCardValue}>12000</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.keyCardTitle}>Sleep</Text>
          <Text style={styles.keyCardValue}>7Hr 24min</Text>
        </View>

        <Text style={styles.cardTitle}>Body Balance</Text>
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
    fontFamily: 'Futura',
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2, // For Android
  },
  cardTitle: {
    fontFamily: 'Avenir',
    fontSize: 18,
    fontWeight: '900',
    color: 'rgb(0, 80, 80)',
    marginTop: 20,
  },
  keyCardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  keyCard: {
    fontFamily: 'Futura',
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
    fontFamily: 'Futura',
    fontSize: 16,
    fontWeight: '500',
    color: 'rgb(110, 119, 131)',
  },
  keyCardValue: {
    fontFamily: 'Futura',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 4,
    color: 'rgb(0, 128, 128)',
  },
  day: {
    fontSize: 26,
    color: 'rgb(0, 80, 80)',
    fontWeight: '700',
    fontFamily: 'Futura',
  },
  date: {
    marginBottom: 20,
    paddingLeft: 4,
    fontSize: 16,
    color: 'rgb(110, 119, 131)',
    fontWeight: '500',
    fontFamily: 'Futura',
  },
});
