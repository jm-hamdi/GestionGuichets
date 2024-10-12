import React, { useState } from 'react';
import { View, Text, FlatList, Button, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const GuichetList = ({ guichets, toggleFavorite, deleteGuichet }) => {
  const [menuVisible, setMenuVisible] = useState(null); // State to track which menu is open

  const handleDelete = (id) => {
    Alert.alert(
      'Supprimer',
      'Êtes-vous sûr de vouloir supprimer ce guichet ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Supprimer', onPress: () => deleteGuichet(id) },
      ],
      { cancelable: true }
    );
  };

  return (
    <FlatList
      data={guichets}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View>
          <View style={styles.guichetItem}>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => toggleFavorite(item.id)}
            >
              <Text style={[styles.favorite, item.favorite ? styles.favActive : styles.favInactive]}>★</Text>
            </TouchableOpacity>
            
            {/* Centered Image and Role Text */}
            <View style={styles.centerContainer}>
              <Image source={{ uri: item.icon }} style={styles.icon} />
              <Text style={styles.roleText}>{item.role}</Text>
            </View>

            <TouchableOpacity
              onPress={() => setMenuVisible(menuVisible === item.id ? null : item.id)} // Toggle the menu
              style={styles.menuButton}
            >
              <Icon name="more-vert" size={24} color="#000" />
            </TouchableOpacity>

            {/* Dropdown Menu */}
            {menuVisible === item.id && (
              <View style={styles.dropdownMenu}>
                <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.menuItem}>
                  <Text>Supprimer</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Name and Status below the card */}
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{item.name}</Text>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 80,
    height: 80,
    borderRadius: 40, // Make the image circular
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
    marginVertical: 10, // Add vertical margin for spacing
  },
  details: {
    flex: 1,
  },
  roleText: {
    // fontWeight: 'bold',
    marginTop: 5, // Add space between image and text
    color: 'gray',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    left: 10, // Changed from right to left
  },
  favorite: {
    fontSize: 26,
  },
  favActive: {
    color: 'yellow',
  },
  favInactive: {
    color: '#F1F3F1',
    shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2, // For Android shadow
    

  },
  guichetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    padding: 20, // Adjusted padding for layout balance
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12, // Rounded corners
    backgroundColor: '#f8f8f8', // Light background for items
    shadowColor: '#000', // Shadow for elevation
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2, // For Android shadow
  },
  menuButton: {
    position: 'absolute',
    right: 10, // Position the menu button to the right corner
    top: 10,
  },
  dropdownMenu: {
    position: 'absolute',
    right: 0,
    top: '100%', // Position the dropdown below the guichet item
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    elevation: 5, // Shadow for the dropdown
    zIndex: 1, // Ensure the dropdown is above other elements
  },
  menuItem: {
    padding: 10,
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Distribute space between text elements
    paddingHorizontal: 20, // Add horizontal padding
    marginBottom: 10, // Margin below the text
  },
  nameText: {
    fontWeight: 'bold',
  },
  statusText: {
    color: 'gray', // Style for the status text
  },
});

export default GuichetList;
