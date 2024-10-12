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
        <View style={styles.guichetItem}>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => toggleFavorite(item.id)}
          >
            <Text style={[styles.favorite, item.favorite ? styles.favActive : styles.favInactive]}>★</Text>
          </TouchableOpacity>
          <Image source={{ uri: item.icon }} style={styles.icon} />
          <View style={styles.details}>
            <Text style={styles.roleText}>{item.role}</Text>
            <Text>{item.status}</Text>
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
      )}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25, // Make the image circular
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  roleText: {
    fontWeight: 'bold',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    left: 10, // Changed from right to left
  },
  favorite: {
    fontSize: 24,
  },
  favActive: {
    color: 'yellow',
  },
  favInactive: {
    color: 'gray',
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
    marginLeft: 10, // Add space between the details and the menu button
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
});

export default GuichetList;
