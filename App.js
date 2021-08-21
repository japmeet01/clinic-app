import React, { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import * as firebase from "firebase";
import Login from "./screens/login";
import Home from "./screens/homePage";
import editDetails from "./screens/editDetails";
import searchPage from "./screens/searchPage";
import AddPatient from "./screens/addPatientPage";
import patientHistory from "./screens/patientHistoryPage.js";
import patientDetails from "./screens/patientDetails";
import newVisit from "./screens/newVisit";
import newVisit1 from "./screens/newVisitFromPatientDetailsPage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import { firebaseConfig } from "./config";

firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="addPatientPage" component={AddPatient} />
      <Stack.Screen name="searchPage" component={searchPage} />
      <Stack.Screen name="patientHistory" component={patientHistory} />
      <Stack.Screen name="newVisit" component={newVisit} />
      <Stack.Screen name="patientDetails" component={patientDetails} />
      <Stack.Screen name="newVisit1" component={newVisit1} />
      <Stack.Screen name="editDetails" component={editDetails} />
    </Stack.Navigator>
  );
}

export default () => {
  let [fontsLoaded] = useFonts({
    "Nunito-Regular": require("./assets/fonts/Nunito/Nunito-Regular.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
    "Segoe-UI": require("./assets/fonts/Segoe-UI/Segoe-UI.ttf"),
    "Salsa-Regular": require("./assets/fonts/Salsa/Salsa-Regular.ttf"),
    "Calibri-Regular": require("./assets/fonts/Calibri/Calibri-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <App />
      </NavigationContainer>
    );
  }
};
