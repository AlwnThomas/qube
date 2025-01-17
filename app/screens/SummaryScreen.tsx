import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function SummaryScreen({ navigation }) {
  return (
    <View style={styles.container}>
      
      {/* Movement Card */}
      <TouchableOpacity 
        style={styles.card}
        onPress={() => navigation.navigate('MovementScreen')}
        >
            <Text style={styles.cardTitle}>Movement</Text>
        </TouchableOpacity>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    height: '20%',
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'tomato',
  },
});
