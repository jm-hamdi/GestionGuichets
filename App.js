import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GuichetList from './components/GuichetList';
import AddGuichet from './components/AddGuichet';

const Stack = createStackNavigator();

const App = () => {
  const [guichets, setGuichets] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{ title: 'Liste des Guichets' }}>
          {props => <GuichetList {...props} guichets={guichets} setGuichets={setGuichets} />}
        </Stack.Screen>
        <Stack.Screen name="AddGuichet" options={{ title: 'Ajouter un Guichet' }}>
          {props => <AddGuichet {...props} guichets={guichets} setGuichets={setGuichets} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
