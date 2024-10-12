import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import GuichetList from './GuichetList';

const MainScreen = ({ guichets = [], navigation }) => { // Default guichets to an empty array
  const [searchQuery, setSearchQuery] = useState('');

  // Filter guichets based on search query
  const filteredGuichets = guichets.filter(guichet =>
    guichet?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guichets: {guichets.length}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Nouveau Guichet" onPress={() => navigation.navigate('AddGuichet')} />
        <Button title="Mes Favoris" onPress={() => navigation.navigate('Favorites')} />
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Recherche..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <GuichetList guichets={filteredGuichets} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default MainScreen;
