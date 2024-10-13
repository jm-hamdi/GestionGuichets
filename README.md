# GestionGuichets

## Description du projet

**GestionGuichets** est une application mobile développée avec **Expo** et **React Native**, permettant de gérer des guichets. L'application offre les fonctionnalités suivantes :
- Afficher une liste de guichets.
- Ajouter de nouveaux guichets.
- Marquer des guichets comme favoris.
- Supprimer des guichets.

Les informations des guichets, telles que l'icône, le nom, le rôle et le statut, sont stockées dans un fichier `guichet.json`. Cela permet à l'application de charger et de manipuler les données facilement.

## Fonctionnalités

- **Afficher des guichets** : L'application charge et affiche une liste de guichets à partir du fichier `guichet.json`.
- **Ajouter un guichet** : Les utilisateurs peuvent ajouter de nouveaux guichets avec des informations telles que l'icône, le nom, le rôle et le statut.
- **Marquer comme favori** : En cliquant sur l'icône étoile, les utilisateurs peuvent marquer un guichet comme favori, ce qui change la couleur de l'icône en jaune.
- **Supprimer un guichet** : Les utilisateurs peuvent supprimer un guichet de la liste, et le fichier `guichet.json` est mis à jour en conséquence.

## Installation et exécution

### Prérequis

Avant de commencer, assurez-vous d'avoir les outils suivants installés sur votre machine :

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Android Studio](https://developer.android.com/studio) (pour l'émulateur Android)

### Étapes pour exécuter l'application

1. **Clonez le dépôt GitHub** :
   ```bash
   git clone https://github.com/jm-hamdi/GestionGuichets
   cd GestionGuichets
   ```

2. **Installez les dépendances** :
   ```bash
   npm install
   ```

3. **Démarrez le serveur Expo** :
   ```bash
   npx expo start
   ```

4. **Ouvrez l'application sur votre appareil** :
   - Scannez le code QR affiché dans le terminal ou sur la page d'accueil d'Expo avec l'application Expo Go sur votre appareil mobile.

### Génération de l'APK

Pour générer un fichier APK exécutable, suivez ces étapes :

1. Ouvrez le terminal et naviguez dans le répertoire de votre projet :
   ```bash
   cd android
   ```

2. Exécutez la commande suivante :
   ```bash
   ./gradlew assembleRelease
   ```

3. Le fichier APK sera généré dans le répertoire `android/app/build/outputs/apk/release/`. 

4. Installez l'APK sur votre appareil Android :
   ```bash
   adb install app-release.apk
   ```

## Captures d'écran

des captures d'écran de l'application :

<!--  <img src="https://github.com/jm-hamdi/GestionGuichets/blob/main/assets/list1.png" alt="Liste 1" width="300" height="600"> -->
<img src="https://github.com/jm-hamdi/GestionGuichets/blob/main/assets/list2.png" alt="Liste 2" width="300" height="600"> <img src="https://github.com/jm-hamdi/GestionGuichets/blob/main/assets/listFavor.png" alt="Liste Favoris" width="300" height="600"> <img src="https://github.com/jm-hamdi/GestionGuichets/blob/main/assets/Add.png" alt="Ajouter" width="300" height="600">


