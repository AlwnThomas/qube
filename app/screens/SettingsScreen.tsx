import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default function ProfileScreen() {
  const username = "John Doe";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* Cube Profile Picture Container */}
      <View style={styles.cubeContainer}>
        <Image 
          source={require('../../assets/images/profilePic.png')} 
          style={styles.profileImage} 
        />
      </View>

      <Text style={styles.header}>{username}</Text>

      <View style={styles.cardContainer}>

      {/* Personal Details Setting */}
      <View style={{flexDirection: 'row'}}>
      <View style={styles.settingCube}><Icon name="profile" size={25} color="rgba(0, 80, 80, 0.65)" style={{top: 6}}/></View>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
      <Text style={styles.settingHeader}>Personal Details</Text>
      <Icon name="right" size={15} color="rgba(0, 80, 80, 0.65)" style={{top: 28}}/>
      </View>
      </View>

      {/* Personal Details Setting */}
      <View style={{flexDirection: 'row'}}>
      <View style={styles.settingCube}><Icon name="staro" size={25} color="rgba(0, 80, 80, 0.65)" style={{top: 6}}/></View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={styles.settingHeader}>Goals</Text>
      <Icon name="right" size={15} color="rgba(0, 80, 80, 0.65)" style={{top: 28}}/>
      </View>
      </View>

      {/* Personal Details Setting */}
      <View style={{flexDirection: 'row'}}>
      <View style={styles.settingCube}><Icon name="notification" size={25} color="rgba(0, 80, 80, 0.65)" style={{top: 6}}/></View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={styles.settingHeader}>Notifications</Text>
      <Icon name="right" size={15} color="rgba(0, 80, 80, 0.65)" style={{top: 28}}/>
      </View>
      </View>

      {/* Personal Details Setting */}
      <View style={{flexDirection: 'row'}}>
      <View style={styles.settingCube}><Icon name="infocircleo" size={25} color="rgba(0, 80, 80, 0.65)" style={{top: 6}}/></View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={styles.settingHeader}>Help & Support</Text>
      <Icon name="right" size={15} color="rgba(0, 80, 80, 0.65)" style={{top: 28}}/>
      </View>
      </View>

      {/* Personal Details Setting */}
      <View style={{flexDirection: 'row'}}>
      <View style={styles.settingCube}><Icon name="book" size={25} color="rgba(0, 80, 80, 0.65)" style={{top: 6}}/></View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={styles.settingHeader}>Terms & Policies</Text>
      <Icon name="right" size={15} color="rgba(0, 80, 80, 0.65)" style={{top: 28}}/>
      </View>
      </View>

      <View style={styles.signoutCard}>
        <Text style={[styles.header, {fontSize: 24, marginTop: 15, marginBottom: 15}]}>Signout</Text>
      </View>

      <Text style={[styles.header, {fontSize: 20}]}>Qube Fitness</Text>
      <Text style={[styles.header, {marginTop: 5, fontSize: 12}]}>Fitness in Every Dimension</Text>
      
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(247, 249, 252)',
    alignItems: 'center',
    paddingTop: 100,
  },
  cubeContainer: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '45deg' }], // Rotates the cube
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    overflow: 'hidden',
  },
  cardContainer: {
    width: '99%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    marginTop: 30,
    paddingBottom: 40,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2, // For Android
  },
  profileImage: {
    width: 135,
    height: 135,
    borderRadius: 10,
    transform: [{ rotate: '-45deg' }],
    resizeMode: 'cover',
  },
  header: {
    fontSize: 34,
    color: 'rgb(0, 80, 80)',
    fontWeight: '800',
    fontFamily: 'Avenir',
    marginTop: 30,
    alignSelf: 'center',
  },
  settingCube: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(222, 225, 230, 0.35)',
    borderRadius: 8,
    marginRight: 20,
    alignItems: 'center',
    marginVertical: 20,
    overflow: 'hidden'
  },
  settingHeader: {
    fontFamily: 'Avenir',
    fontWeight: '600',
    fontSize: 18,
    color: 'rgb(110, 119, 131)',
    alignSelf: 'flex-start',
    paddingVertical: 25,
  },
  signoutCard: {
    width: '100%',
    backgroundColor: 'rgba(0, 140, 140, 0.5)',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 30,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: -3, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2, // For Android
  },
});
