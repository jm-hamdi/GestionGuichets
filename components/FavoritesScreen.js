import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FavoritesScreen = ({ favorites, toggleFavorite }) => {
  const [menuVisible, setMenuVisible] = useState(null); // State to track which menu is open

  const handleRemoveFavorite = (id) => {
    Alert.alert(
      'Retirer des favoris',
      'Êtes-vous sûr de vouloir retirer cet élément de vos favoris ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Retirer', onPress: () => toggleFavorite(id) },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Mes Favoris</Text> */}
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            {/* Favorite Item */}
            <View style={styles.favoriteItem}>
              {/* Favorite Star Button */}
              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() => handleRemoveFavorite(item.id)} // Remove item from favorites
              >
                <Text style={[styles.favorite, styles.favActive]}>★</Text>
              </TouchableOpacity>
              
              {/* Centered Image and Role Text */}
              <View style={styles.centerContainer}>
                <Image source={{ uri: item.icon }} style={styles.icon} />
                <Text style={styles.roleText}>{item.role}</Text>
              </View>

              {/* Dropdown Menu */}
              <TouchableOpacity
                onPress={() => setMenuVisible(menuVisible === item.id ? null : item.id)} // Toggle the menu
                style={styles.menuButton}
              >
                <Icon name="more-vert" size={24} color="#000" />
              </TouchableOpacity>

              {menuVisible === item.id && (
                <View style={styles.dropdownMenu}>
                  <TouchableOpacity onPress={() => handleRemoveFavorite(item.id)} style={styles.menuItem}>
                    <Text>Retirer</Text>
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
    textAlign: 'center', // Center the title
  },
  favoriteItem: {
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
  favoriteButton: {
    position: 'absolute',
    top: 10,
    left: 10, // Position the star button to the left
  },
  favorite: {
    fontSize: 26,
  },
  favActive: {
    color: 'yellow', // Yellow color for active favorite
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
    marginVertical: 10, // Add vertical margin for spacing
  },
  icon: {
    width: 80,
    height: 80,
    borderRadius: 40, // Make the image circular
  },
  roleText: {
    marginTop: 5, // Add space between image and text
    color: 'gray',
  },
  menuButton: {
    position: 'absolute',
    right: 10, // Position the menu button to the right corner
    top: 10,
  },
  dropdownMenu: {
    position: 'absolute',
    right: 0,
    top: '100%', // Position the dropdown below the favorite item
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

export default FavoritesScreen;
