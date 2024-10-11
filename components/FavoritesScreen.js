import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';

const FavoritesScreen = ({ guichets, toggleFavorite, deleteGuichet }) => {
  const favoriteGuichets = guichets.filter(guichet => guichet.favorite);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Mes guichets favoris</Text>

      <FlatList
        data={favoriteGuichets}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
            <Image
              source={{ uri: item.icon }}
              style={{ width: 50, height: 50, marginRight: 10 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16 }}>{item.name}</Text>
              <Text style={{ color: 'gray' }}>Rôle : {item.role}</Text>
              <Text style={{ color: 'gray' }}>Statut : {item.status}</Text>
            </View>

            <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
              <Text style={{ fontSize: 24, color: item.favorite ? 'yellow' : 'gray' }}>★</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => deleteGuichet(item.id)}>
              <Text style={{ color: 'red', marginLeft: 10 }}>Supprimer</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default FavoritesScreen;
