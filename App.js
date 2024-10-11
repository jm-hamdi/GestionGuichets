import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GuichetList from './components/GuichetList';
import AddGuichet from './components/AddGuichet';
import * as FileSystem from 'expo-file-system';

const Stack = createStackNavigator();

export default function App() {
  const [guichets, setGuichets] = useState([]);

  // Load guichets from guichet.json
  useEffect(() => {
    const loadGuichets = async () => {
      const fileUri = FileSystem.documentDirectory + 'guichet.json';
      const fileExists = await FileSystem.getInfoAsync(fileUri);

      if (fileExists.exists) {
        const fileContent = await FileSystem.readAsStringAsync(fileUri);
        const loadedGuichets = JSON.parse(fileContent);
        setGuichets(loadedGuichets);
      }
    };
    loadGuichets();
  }, []);

  // Save guichets to guichet.json
  const saveGuichets = async (newGuichets) => {
    const fileUri = FileSystem.documentDirectory + 'guichet.json';
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(newGuichets));
  };

  // Toggle favorite
  const toggleFavorite = (id) => {
    const updatedGuichets = guichets.map((guichet) =>
      guichet.id === id ? { ...guichet, favorite: !guichet.favorite } : guichet
    );
    setGuichets(updatedGuichets);
    saveGuichets(updatedGuichets);
  };

  // Delete guichet
  const deleteGuichet = (id) => {
    const updatedGuichets = guichets.filter((guichet) => guichet.id !== id);
    setGuichets(updatedGuichets);
    saveGuichets(updatedGuichets);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{ title: 'Guichets' }}>
          {({ navigation }) => (
            <View style={styles.container}>
              <Text>Guichets: {guichets.length}</Text>
              <Button title="Mes Favoris" onPress={() => navigation.navigate('Favorites')} />
              <Button title="Nouveau Guichet" onPress={() => navigation.navigate('AddGuichet')} />
              <GuichetList guichets={guichets} toggleFavorite={toggleFavorite} deleteGuichet={deleteGuichet} />
            </View>
          )}
        </Stack.Screen>
        
        <Stack.Screen name="Favorites" options={{ title: 'Mes Favoris' }}>
          {() => (
            <View style={styles.container}>
              <Text>Mes Guichets Favoris</Text>
              <GuichetList guichets={guichets.filter((g) => g.favorite)} toggleFavorite={toggleFavorite} deleteGuichet={deleteGuichet} />
            </View>
          )}
        </Stack.Screen>

        <Stack.Screen name="AddGuichet" options={{ title: 'Ajouter un Guichet' }}>
          {({ navigation }) => (
            <AddGuichet guichets={guichets} setGuichets={setGuichets} saveGuichets={saveGuichets} navigation={navigation} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
