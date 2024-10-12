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
              setFavorites={setFavorites} // Pass down the function to set favorites
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
              setFavorites={setFavorites} // Pass down the function to set favorites
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
              favorites={favorites} // Pass down the favorites
              setFavorites={setFavorites} // Optional: If you want to modify favorites here
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
