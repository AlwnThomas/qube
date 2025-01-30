import React, { useState, useEffect} from 'react';
import { View, Text, Modal, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Svg, { Circle } from 'react-native-svg';
import Icon from 'react-native-vector-icons/AntDesign'
import * as Location from 'expo-location';
import { Pedometer, Accelerometer } from 'expo-sensors';
import SleepScreen from './Summary/SleepScreen';
import ActivityScreen from './Summary/ActivityScreen';

export default function HomeScreen({navigation}) {

  {/* Permissions for stepCounting using pedometer and accelometer */}
  const [stepCount, setStepCount] = useState(0);
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    const requestPermission = async () => {
      const isPedometerAvailable = await Pedometer.isAvailableAsync(); // Check if pedometer is available
      if (isPedometerAvailable) {
        setPermissionGranted(true);
      } else {
        setPermissionGranted(false);
        alert("Pedometer is not available on this device.");
      }
    };
  
    requestPermission();
  }, []);  

  // Request permission
  useEffect(() => {
    if (!permissionGranted) return;
    
    let pedometerSubscription = Pedometer.watchStepCount((result) => {
      setStepCount(result.steps);
    });
    
    let accelerometerSubscription = Accelerometer.addListener(accelerometerData => {
      setAcceleration(accelerometerData);
    });
    
    return () => {
      pedometerSubscription?.remove();
      accelerometerSubscription?.remove();
    };
  }, [permissionGranted]);    

  // Function to filter steps using accelerometer data
  const handleStepUpdate = (result) => {
    const magnitude = Math.sqrt(acceleration.x ** 2 + acceleration.y ** 2 + acceleration.z ** 2);
    const threshold = 10;
  
    if (magnitude > threshold) {
      setStepCount(result.steps);
    }
  };
  
  useEffect(() => {
    if (!permissionGranted) return;
    
    let pedometerSubscription = Pedometer.watchStepCount(handleStepUpdate);
  
    return () => pedometerSubscription?.remove();
  }, [permissionGranted, acceleration]);  

  const [selectedTab, setSelectedTab] = useState('Stats'); 

  const movementData = {
    stepGoal: 10000,
    steps: stepCount,
    stepLength: 0.762, // in meters
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

  const radius = 65;
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

  const [modalVisible, setModalVisible] = useState(false);

  // Toggle the modal visibility
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

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
          style={[styles.tab, selectedTab === 'Recover' && styles.activeTab]}
          onPress={() => {
            setSelectedTab('Recover');
            navigation.navigate('RecoveryScreen'); // Navigates to the Recovery screen
          }}
        >
          <Text style={styles.tabText}>Recover</Text>
          {selectedTab === 'Recover' && <View style={styles.activeTabLine} />}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} nestedScrollEnabled={true}>

      <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
        <View>
          <Text style={styles.day}>{currentDay}</Text>
          <Text style={styles.date}>{currentDate}</Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 30}}>
        <View style={styles.coreInfo}>
          <Text style={[styles.coreTitle, {paddingTop: 0}]}>STEPS</Text>
          <Text style={[styles.coreStat, {color: 'rgb(0, 200, 100)',}]}>{movementData.steps}</Text>

          <Text style={styles.coreTitle}>RECOVERY</Text>
          <Text style={[styles.coreStat, {color: 'rgb(0, 120, 160)',}]}>{recoveryPercentage}%</Text>

          <Text style={styles.coreTitle}>STRESS</Text>
          <Text style={[styles.coreStat, {color: 'rgb(200, 70, 50)',}]}>{stressPercentData}%</Text>
        </View>

        {/* Ring Graph for Movement */}
        <View style={styles.ringContainer}>
          <Svg height={size} width={size}>
            <Circle cx={radius + strokeWidth} cy={radius + strokeWidth} r={radius} stroke="rgba(0, 200, 100, 0.15)" strokeWidth={strokeWidth} fill="none" />
            <Circle cx={radius + strokeWidth} cy={radius + strokeWidth} r={radius} stroke="rgb(0, 200, 100)" strokeWidth={strokeWidth} fill="none" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="butt" transform={`rotate(-90 ${radius + strokeWidth} ${radius + strokeWidth})`} />
          </Svg>

          {/* Ring Graph for Recovery */}
          <Svg height={innerSize} width={innerSize} style={{ position: 'absolute', right: 20}}>
            <Circle cx={innerRadius + innerStrokeWidth} cy={innerRadius + innerStrokeWidth} r={innerRadius} stroke="rgba(0, 120, 160, 0.15)" strokeWidth={innerStrokeWidth} fill="none" />
            <Circle cx={innerRadius + innerStrokeWidth} cy={innerRadius + innerStrokeWidth} r={innerRadius} stroke="rgb(0, 120, 160)" strokeWidth={innerStrokeWidth} fill="none" strokeDasharray={innerCircumference} strokeDashoffset={innerOffset} strokeLinecap="butt" transform={`rotate(-90 ${innerRadius + innerStrokeWidth} ${innerRadius + innerStrokeWidth})`} />
          </Svg>

          {/* Ring Graph for Stress */}
          <Svg height={stressSize} width={stressSize} style={{ position: 'absolute', right: 40 }}>
            <Circle cx={stressRadius + stressStrokeWidth} cy={stressRadius + stressStrokeWidth} r={stressRadius} stroke="rgba(200, 70, 50, 0.15)" strokeWidth={stressStrokeWidth} fill="none" />
            <Circle cx={stressRadius + stressStrokeWidth} cy={stressRadius + stressStrokeWidth} r={stressRadius} stroke="rgb(200, 70, 50)" strokeWidth={stressStrokeWidth} fill="none" strokeDasharray={stressCircumference} strokeDashoffset={stressOffset} strokeLinecap="butt" transform={`rotate(-90 ${stressRadius + stressStrokeWidth} ${stressRadius + stressStrokeWidth})`} />
          </Svg>
        </View>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.cardTitle}>Start Tracking</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Summary')}>
        <Text style={[styles.keyCardTitle, {top: 10}]}>see all <Icon name="rightcircleo" size={12} color="rgb(0, 80, 80)" /></Text>
        </TouchableOpacity>
        </View>

        </View>

       <ScrollView 
        horizontal 
        pagingEnabled 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
        flexDirection: 'row', 
        marginTop: 20, 
        alignItems: 'center', 
        justifyContent: 'center',}}
        >
          {/* First image - Start Activity */}
          <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
          style={[styles.megaCard, { marginLeft: 35 }]}
          onPress={() => navigation.navigate('Summary', { screen: 'ActivityScreen' })}
          >
            <Image
            source={require("../../assets/images/homeActivityPlaceholder.png")}
            style={{ width: 320, height: 180, right: 10, bottom: 0, resizeMode: 'cover' }}
            />
          </TouchableOpacity>
          <Text style={styles.trackingText}>Activity Tracking</Text>
          </View>

          {/* Second image - Start Tracking Sleep */}
          <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
          style={[styles.megaCard, { marginLeft: 10 }]}
          onPress={() => navigation.navigate('Summary', { screen: 'SleepScreen' })}
         >
           <Image
            source={require("../../assets/images/homeSleepPlaceholder.png")}
            style={{ width: 320, height: 180, right: 10, bottom: 20, resizeMode: 'cover' }}
           />
          </TouchableOpacity>
          <Text style={styles.trackingText}>Sleep Tracking</Text>
          </View>
        
        </ScrollView>

        <View style={{ paddingHorizontal: 20, marginTop: 0 }}>
        <View style={styles.modalHeader}>
          <Text style={[styles.cardTitle, {marginTop:40}]}>Body Balance</Text>
          {/* Touchable Button with Icon */}
          <TouchableOpacity onPress={openModal} style={{position: 'absolute', left: 120, top: 45}}>
            <Icon name="questioncircleo" size={14} color="#008080" />
          </TouchableOpacity>
        </View>
      
       {/* Modal for the pop-up */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Close button */}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Icon name="closecircleo" size={20} color="rgb(0, 80, 80)" />
            </TouchableOpacity>

            {/* Modal Content */}
            <Text style={styles.modalTitle}>Body Balance</Text>
            <Text style={styles.modalParagraph}>
            "Body Balance" conveys the idea of maintaining equilibrium within your body’s physical systems and functions.
            It suggests that all the key elements of health such as calorie intake, recovery, stress levels, and overall well-being 
            are in harmony and working optimally.
            </Text>
          </View>
          </View>
        </Modal>

        <View style={styles.keyCardContainer}>
          <View style={styles.keyCard}>
            <Image
            source={require("../../assets/images/kcalsLogo.png")}
            style={styles.miniLogo}
            />
            <Text style={styles.keyCardValue}>1950</Text>
            <Text style={[styles.keyCardTitle, {fontSize: 12}]}>Kcals</Text>
          </View>

          <View style={styles.keyCard}>
            <Image
            source={require("../../assets/images/moonLogo.png")}
            style={[styles.miniLogo, { width: 36, height: 36}]}
            />
            <Text style={styles.keyCardValue}>98%</Text>
            <Text style={[styles.keyCardTitle, {fontSize: 12}]}>Sleep</Text>
          </View>

          <View style={styles.keyCard}>
            <Image
            source={require("../../assets/images/hrvLogo.png")}
            style={styles.miniLogo}
            />
            <Text style={styles.keyCardValue}>105</Text>
            <Text style={[styles.keyCardTitle, {fontSize: 12}]}>HRV</Text>            
          </View>

          <View style={styles.keyCard}>
            <Image
            source={require("../../assets/images/rhrLogo.png")}
            style={[styles.miniLogo,{ width: 38, height: 38}]}
            />
            <Text style={styles.keyCardValue}>68</Text>
            <Text style={[styles.keyCardTitle, {fontSize: 12}]}>RHR</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.keyCardTitle}>Stress Levels</Text>
          <LineChart
            data={stressData}
            width={Dimensions.get("window").width - 30}
            height={220}
            yAxisSuffix=" "
            yAxisInterval={1}
            withHorizontalLabels={false}
            withInnerLines={false}
            withOuterLines={false}
            withShadow={false}
            chartConfig={{
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
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
  day: {
    fontSize: 34,
    color: 'rgb(0, 80, 80)',
    fontWeight: '800',
    fontFamily: 'Avenir',
    marginTop: 15,
  },
  date: {
    fontSize: 14,
    color: 'rgb(110, 119, 131)',
    fontWeight: '500',
    fontFamily: 'Futura',
  },
  coreInfo:{
    justifyContent: 'flex-start',
  },
  coreTitle:{
    fontFamily: 'Avenir',
    fontSize: 12,
    fontWeight: '900',
    color: 'rgb(0, 80, 80)',
    paddingTop: 15,
  },
  coreStat:{
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Futura',
  },
  ringContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    position: 'relative',
    transform: [{translateY: -10}],
  },
  ring: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    fontFamily: 'Futura',
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2, // For Android
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
  },
  keyCard: {
    fontFamily: 'Futura',
    width: '22.5%',
    height: 110,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 10,
    padding: 5,
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    paddingTop: 5,
    color: 'rgb(0, 128, 128)',
  },
  megaCard: {
    width: 300,
    height: 160,
    backgroundColor: 'white',
    marginRight: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    overflow: 'hidden',
  },
  trackingText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: 'rgb(110, 119, 131)',
    textAlign: 'center',
  },  

  // Modal styling
  modalHeader: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent background
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalTitle: {
    fontFamily: 'Avenir',
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
    color: '#008080',
    marginBottom: 10,
  },
  modalParagraph: {
    fontSize: 14,
    fontFamily: 'Avenir',
    fontWeight: 500,
    color: '#444',
    justifyContent: 'center',
    textAlign: 'center',
  },
  miniLogo: {
    width: 35, 
    height: 35, 
    overflow: 'visible',
    shadowColor: 'rgb(83, 83, 83)',
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  }
});
