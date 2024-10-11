import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, FlatList, TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system'; // to handle the file system

const GuichetList = ({ navigation, guichets, setGuichets }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Charger les guichets depuis le fichier JSON
  useEffect(() => {
    const loadGuichets = async () => {
      try {
        const fileUri = `${FileSystem.documentDirectory}guichet.json`;
        const fileInfo = await FileSystem.getInfoAsync(fileUri);

        if (fileInfo.exists) {
          const fileContent = await FileSystem.readAsStringAsync(fileUri);
          setGuichets(JSON.parse(fileContent));
        }
      } catch (error) {
        console.error('Erreur lors du chargement des guichets', error);
      }
    };

    loadGuichets();
  }, []);

  // Filtrer les guichets en fonction de la recherche
  const filteredGuichets = guichets.filter(guichet =>
    guichet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18 }}>Guichets : {guichets.length}</Text>

      {/* Affichage des favoris */}
      <Text style={{ fontSize: 18, marginTop: 10 }}>Mes favoris :</Text>
      <FlatList
        data={guichets.filter(guichet => guichet.favorite)}
        renderItem={({ item }) => (
          <Text style={{ color: 'gold', paddingVertical: 5 }}>{item.name}</Text>
        )}
        keyExtractor={item => item.id}
      />

      <Button title="Nouveau Guichet" onPress={() => navigation.navigate('AddGuichet')} />

      {/* Barre de recherche */}
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginTop: 20,
          marginBottom: 10,
          paddingHorizontal: 10,
        }}
        placeholder="Rechercher un guichet"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Liste des guichets */}
      <FlatList
        data={filteredGuichets}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <Text style={{ paddingVertical: 10 }}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default GuichetList;
