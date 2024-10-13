import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const verificationImage = require('../assets/image-verification.png'); // Adjust the path as needed

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
            <View style={styles.nameContainer}>
              <Text style={styles.nameText}>{item.name}</Text>
              {/* Add the verification image here */}
              <Image source={verificationImage} style={styles.verificationIcon} />
            </View>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 90, // Increased size for better visibility
    height: 90,
    borderRadius: 45, // Keep it circular
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
    marginVertical: 12, // Increased vertical margin for spacing
  },
  roleText: {
    marginTop: 6, // Increased space between image and text
    color: 'gray',
    fontSize: 16, // Increased font size for readability
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    left: 10, // Changed from right to left
  },
  favorite: {
    fontSize: 28, // Increased font size for visibility
  },
  favActive: {
    color: '#FFD700', // Gold color for active favorites
    shadowColor: '#FFD700', // Gold shadow for active favorites
    shadowOffset: {
      width: 0,
      height: 3, // Slightly increased shadow height
    },
    shadowOpacity: 0.3, // Increased opacity for better visibility
    shadowRadius: 4,
    elevation: 4, // Increased elevation for active favorites
  },
  favInactive: {
    color: '#B0BEC5', // Lighter gray for inactive favorites
    shadowColor: '#B0BEC5', // Lighter gray shadow for inactive favorites
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2, // For Android shadow
  },
  guichetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8, // Increased vertical margin for spacing
    marginHorizontal: 18,
    padding: 20, // Adjusted padding for layout balance
    borderWidth: 0.5,
    borderColor: '#9E9E9E', // Slightly darker border color
    borderRadius: 14, // Rounded corners
    backgroundColor: '#ffffff', // Changed to white for a clean look
    shadowColor: '#000', // Shadow for elevation
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4, // Increased elevation for overall card
  },
  menuButton: {
    position: 'absolute',
    right: 10, // Position the menu button to the right corner
    top: 10,
  },
  dropdownMenu: {
    position: 'absolute',
    right: 0,
    top: 40, // Position the dropdown below the guichet item
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    elevation: 6, // Increased shadow for the dropdown
    zIndex: 1, // Ensure the dropdown is above other elements
    shadowColor: '#000', // Shadow for elevation
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItem: {
    padding: 15,
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Distribute space between text elements
    paddingHorizontal: 20, // Add horizontal padding
    marginBottom: 12, // Margin below the text
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    color: 'gray',
    fontSize: 16, // Increased font size for the name
  },
  verificationIcon: {
    width: 15, // Adjusted size for better visibility
    height: 15,
    marginLeft: 5, // Space between name and icon
  },
  statusText: {
    color: 'gray', // Style for the status text
    fontSize: 14, // Increased font size for better readability
  },
});

export default GuichetList;
