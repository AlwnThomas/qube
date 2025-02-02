import React from 'react';
import { Image, View, Text, StyleSheet, Linking, TouchableOpacity, ScrollView} from 'react-native';

export default function SummaryScreen({ navigation }) {

  const openYouTubeLink = (url) => {
    Linking.openURL(url).catch((err) => console.error('An error occurred', err));
  };

  return (
    <ScrollView>
    <View style={styles.container}>

      <Text style={styles.header}>Summary</Text>
      <Text style={styles.subheader}>Your fitness, at a glance</Text>
      
      <View style={{flexDirection: 'row', justifyContent:'space-between', marginTop: 30}}>
      {/* Movement Card */}
      <TouchableOpacity 
        style={styles.card}
        onPress={() => navigation.navigate('MovementScreen')}
        >
            <Text style={styles.cardTitle}>Movement</Text>
            <Image   source={require("../../assets/images/movementLogo.png")} 
          style={[styles.logo, { width: 60, height: 60, resizeMode: "contain", top: 5, left: 80}]} />
        </TouchableOpacity>

      {/* Energy Card */}
      <TouchableOpacity 
        style={styles.card}
        onPress={() => navigation.navigate('EnergyScreen')}
      >
          <Text style={styles.cardTitle}>Energy</Text>
          <Image   source={require("../../assets/images/energyLogo.png")} 
          style={[styles.logo, { width: 60, height: 60, resizeMode: "contain", top: 5, left: 80}]} />
      </TouchableOpacity>
      </View>

      <View style={{flexDirection: 'row', justifyContent:'space-between', marginTop: 15}}>
      {/* Sleep Card */}
      <TouchableOpacity 
        style={styles.miniCard}
        onPress={() => navigation.navigate('SleepScreen')}
      >
          <Text style={styles.cardTitle}>Sleep</Text>
          <Image   source={require("../../assets/images/sleepLogo.png")} 
          style={[styles.logo, { width: 50, height: 50, resizeMode: "contain", top: 10}]} />
      </TouchableOpacity>

      {/* Activity Card */}
      <TouchableOpacity 
        style={styles.miniCard}
        onPress={() => navigation.navigate('ActivityScreen')}
      >
          <Text style={styles.cardTitle}>Activities</Text>
          <Image   source={require("../../assets/images/activityLogo.png")} 
          style={[styles.logo, { width: 50, height: 50, resizeMode: "contain", top: 10}]} />
      </TouchableOpacity>

      {/* Workouts Card */}
      <TouchableOpacity 
        style={styles.miniCard}
        onPress={() => navigation.navigate('WorkoutsScreen')}
      >
          <Text style={styles.cardTitle}>Workout</Text>
          <Image   source={require("../../assets/images/workoutLogo.png")} 
          style={[styles.logo, { width: 50, height: 50, resizeMode: "contain", top: 10}]} />
      </TouchableOpacity>
      </View>

      <View style={styles.line}></View>

      </View>

      <Text style={[styles.header, {marginTop:-10, paddingHorizontal:20}]}>Health Help</Text>
      <Text style={[styles.subheader, {paddingHorizontal:20}]}>Aid your wellness</Text>

       <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexDirection: 'row', marginTop: 30, alignItems: 'center', justifyContent: 'center' }}
        >
         {/* First image - Sleep video */}
         <TouchableOpacity
          style={[styles.megaCard, { marginLeft: 35 }]}
          onPress={() => openYouTubeLink('https://www.youtube.com/watch?v=nm1TxQj9IsQ')}
         >
           <Image
            source={require("../../assets/images/sleepPlaceholder.png")}
            style={{ width: 320, height: 180, right: 10, resizeMode: "contain" }}
           />
          </TouchableOpacity>

         {/* Second image - Workout video */}
         <TouchableOpacity
          style={styles.megaCard}
          onPress={() => openYouTubeLink('https://www.youtube.com/watch?v=aJFiGC13xIw')}
         >
            <Image
            source={require("../../assets/images/workoutPlaceholder.png")}
            style={{ width: 320, height: 180, right:10, resizeMode: "contain" }}
            />
          </TouchableOpacity>

         {/* Third image - Stress video */}
         <TouchableOpacity
          style={styles.megaCard}
          onPress={() => openYouTubeLink('https://www.youtube.com/watch?v=o18I23HCQtE')}
         >
            <Image
            source={require("../../assets/images/stressPlaceholder.png")}
            style={{ width: 320, height: 180, right: 10, resizeMode: "contain" }}
            />
          </TouchableOpacity>
      
        </ScrollView>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 34,
    color: 'rgb(0, 80, 80)',
    fontWeight: '800',
    fontFamily: 'Avenir',
    marginTop: 60,
    alignSelf: 'flex-start',
  },
  subheader: {
    fontFamily: 'Futura',
    fontWeight: '500',
    fontSize: 14,
    color: 'rgb(110, 119, 131)',
    alignSelf: 'flex-start',
  },
  card: {
    width: '48%',
    height: 100,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  megaCard: {
    width: 300,
    height: 160,
    backgroundColor: 'white',
    marginRight: 30,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    overflow: 'hidden',
  },
  miniCard: {
    width: '32%',
    height: 100,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgb(110, 119, 131)',
  },
  logo: {
    shadowColor: 'rgb(0, 75, 75)',
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  line: {
    width: '120%',
    right: 20,
    marginVertical: 30,
    height: 3,
    backgroundColor: 'rgba(110, 119, 131, 0.24)',
  },

});
