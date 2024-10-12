import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './components/MainScreen';
import AddGuichet from './components/AddGuichet';
import FavoritesScreen from './components/FavoritesScreen';
import guichetsData from './guichet.json'; // Import the JSON file directly

const Stack = createStackNavigator();

export default function App() {
  const [guichets, setGuichets] = useState(guichetsData); // Initialize with imported data
  const [favorites, setFavorites] = useState([]); // Initialize favorites

  // Function to toggle favorites
  const toggleFavorite = (id) => {
    setGuichets((prevGuichets) =>
      prevGuichets.map((guichet) => {
        if (guichet.id === id) {
          const isFavorited = favorites.some((fav) => fav.id === id);
          if (isFavorited) {
            // Remove from favorites
            setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== id));
          } else {
            // Add to favorites
            setFavorites((prevFavorites) => [...prevFavorites, guichet]);
          }
          return { ...guichet, favorite: !isFavorited }; // Toggle favorite status
        }
        return guichet;
      })
    );
  };

  // Function to delete guichet
  const deleteGuichet = (id) => {
    setGuichets((prevGuichets) => prevGuichets.filter((guichet) => guichet.id !== id));
    // Also remove from favorites if it's deleted
    setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== id));
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainScreen">
        <Stack.Screen
          name="MainScreen"
          options={{ title: 'Gestion des Guichets' }}
        >
          {props => (
            <MainScreen 
              {...props} 
              guichets={guichets} 
              favorites={favorites} 
              setFavorites={setFavorites} 
              toggleFavorite={toggleFavorite} // Pass toggleFavorite function
              deleteGuichet={deleteGuichet} // Pass deleteGuichet function
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="AddGuichet"
          options={{ title: 'Ajouter un Guichet' }}
        >
          {props => (
            <AddGuichet 
              {...props} 
              setGuichets={setGuichets} 
              setFavorites={setFavorites} 
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Favorites"
          options={{ title: 'Mes Favoris' }}
        >
          {props => (
            <FavoritesScreen 
              {...props} 
              favorites={favorites} 
              setFavorites={setFavorites} 
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
