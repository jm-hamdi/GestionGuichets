import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import GuichetList from './GuichetList';
import { Ionicons } from '@expo/vector-icons'; // For search icon and clear (X) icon

const MainScreen = ({ guichets = [], navigation, toggleFavorite, deleteGuichet }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGuichets = guichets.filter(guichet =>
    guichet?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const clearSearch = () => setSearchQuery('');

  return (
    <View style={styles.container}>
      {/* Row containing Guichet count, Mes Favoris, and Nouveau Guichet */}
      <View style={styles.rowContainer}>
        {/* Text for "Guichets" and separate box for the number */}
        <View style={styles.guichetTextContainer}>
          <Text style={styles.guichetLabelText}>Guichets</Text>
          <View style={styles.guichetCountBox}>
            <Text style={styles.guichetCountText}>{guichets.length}</Text>
          </View>
        </View>

        {/* Circular button for Mes Favoris */}
        <TouchableOpacity style={styles.favoriteButton} onPress={() => navigation.navigate('Favorites')}>
          <Text style={styles.favoriteButtonText}>★ Mes Favoris</Text>
        </TouchableOpacity>

        {/* Blue button for Nouveau Guichet */}
        <TouchableOpacity style={styles.newButton} onPress={() => navigation.navigate('AddGuichet')}>
          <Text style={styles.newButtonText}>Nouveau Guichet</Text>
        </TouchableOpacity>
      </View>

      {/* Search Input with clear button and search icon */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#ccc" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Recherche..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color="gray" />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* List of Guichets */}
      <GuichetList 
        guichets={filteredGuichets} 
        toggleFavorite={toggleFavorite} // Pass down the toggleFavorite function
        deleteGuichet={deleteGuichet} // Pass down the deleteGuichet function
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
      },
  rowContainer: {
    flexDirection: 'row', // Aligns items in the same row
    justifyContent: 'space-between', // Evenly space them in the row
    alignItems: 'center', // Center them vertically in the row
    marginBottom: 20,
  },
  guichetTextContainer: {
    flexDirection: 'row', // To align the label and the number in the same line
    alignItems: 'center', // Center them vertically
    marginRight: 5, // Add some space between the guichet count and the buttons
  },
  guichetLabelText: {
    fontSize: 15,
  },
  guichetCountBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 4, // Space between label and number box
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2, // Shadow on Android
    borderColor: '#70BAE9',
    backgroundColor: '#DEEFFA',
  },
  guichetCountText: {
    fontSize: 15,
    color: 'blue', // Blue text for the count
  },
  favoriteButton: {
    borderWidth: 2,
    borderColor: 'green', // Green border for the circular button
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 50, // Make it circular
    backgroundColor: '#fff', // White background for the favorite button
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Shadow on Android
    marginHorizontal: 5, // Add margin between the buttons
  },
  favoriteButtonText: {
    color: 'green', // Green text inside the button
    fontSize: 13,
  },
  newButton: {
    backgroundColor: '#4a90e2', // Blue background
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8, // Slightly rounded corners
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Shadow on Android
    marginLeft: 5, // Add margin to separate from the favorite button
  },
  newButtonText: {
    color: '#fff', // White text inside the blue button
    fontSize: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1, // Takes the remaining space
    height: 40,
  },
  clearButton: {
    marginLeft: 10,
  },
});

export default MainScreen;
