import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const AddGuichet = ({ navigation }) => {
  const [guichetName, setGuichetName] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [imageUri, setImageUri] = useState(null);

  // Handle Image Picking
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.uri);
    }
  };

  const handleSaveGuichet = () => {
    // Add logic to save guichet
    console.log('Guichet Added:', { guichetName, role, status, imageUri });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créez un nouveau guichet</Text>
      <Text style={styles.subtitle}>
        Veuillez saisir les informations de votre organisation pour la créer
      </Text>

      <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.imageText}>Importer une image</Text>
          </View>
        )}
      </TouchableOpacity>

      <Text style={styles.infoText}>Formats autorisés: .png et .svg</Text>
      <Text style={styles.infoText}>Taille maximale autorisée: 2 Mo</Text>
      <Text style={styles.infoText}>Dimensions idéales de l’image: 100px * 100px</Text>

      <TextInput
        style={styles.input}
        placeholder="Nom de guichet"
        value={guichetName}
        onChangeText={setGuichetName}
      />

      <TextInput
        style={styles.input}
        placeholder="Role"
        value={role}
        onChangeText={setRole}
      />

      <TextInput
        style={styles.input}
        placeholder="Statut"
        value={status}
        onChangeText={setStatus}
      />

      <TouchableOpacity style={styles.button} onPress={handleSaveGuichet}>
        <Text style={styles.buttonText}>Valider</Text>
      </TouchableOpacity>
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
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  placeholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  imageText: {
    color: '#999',
  },
  infoText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddGuichet;
