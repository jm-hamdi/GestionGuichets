import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import * as FileSystem from 'expo-file-system';

const AddGuichet = ({ navigation, guichets, setGuichets }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');

  const handleAdd = async () => {
    const newGuichet = {
      id: (guichets.length + 1).toString(),
      name,
      role,
      status,
      favorite: false,
    };

    const updatedGuichets = [...guichets, newGuichet];
    setGuichets(updatedGuichets);

    // Sauvegarder dans le fichier JSON
    try {
      const fileUri = `${FileSystem.documentDirectory}guichet.json`;
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(updatedGuichets));
      console.log('Guichet ajouté et sauvegardé avec succès');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du guichet', error);
    }

    navigation.goBack();
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18 }}>Ajouter un nouveau guichet</Text>

      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 10, paddingHorizontal: 10 }}
        placeholder="Nom du guichet"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 10, paddingHorizontal: 10 }}
        placeholder="Rôle du guichet"
        value={role}
        onChangeText={setRole}
      />

      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 10, paddingHorizontal: 10 }}
        placeholder="Statut"
        value={status}
        onChangeText={setStatus}
      />

      <Button title="Ajouter" onPress={handleAdd} />
    </View>
  );
};

export default AddGuichet;
