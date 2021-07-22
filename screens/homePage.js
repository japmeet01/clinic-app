import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { Card, TextInput, Button } from "react-native-paper";

const home = ({navigation}) => {
  const win = Dimensions.get("window");
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={{
          width: win.width,
          resizeMode: "contain",
          position: "absolute",
          top: -10,
        }}
        source={require("../assets/images/topbackground.png")}
      />
      <Text style={styles.heading}>Anil Eye Care Center </Text>
      <TouchableOpacity
      onPress={() => navigation.navigate("addPatientPage")}>
        <View style={styles.container1}>
            <Text style={styles.subheading}>Add new Patient</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("searchPage")}>
        <View style={styles.container2}>
        <Text style={styles.subheading}>Search existing Patient</Text>
        </View>
      </TouchableOpacity>

      <Image
        style={styles.background}
        source={require("../assets/images/background.png")}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
    alignItems: "center",
  },
  text: {
    fontSize: 50,
  },
  background: {
    position: "absolute",
    bottom: -40,
    left: 0,
    right: 0,
    height: "45%",
    width: "100%",
  },
  heading: {
    fontSize: 32,
    color: "white",
    position: "absolute",
    top: 60,
    
  },
  container1: {
    height: 100,
    width: 300,
    backgroundColor: "white",
    marginTop: 170,
    borderRadius:30,
    alignItems: "center",
    elevation:5,
  },
  container2: {
    height: 100,
    width: 300,
    backgroundColor: "white",
    marginTop: 30,
    borderRadius:30,
    alignItems: "center",
    elevation:5,
  },
  subheading: {
    fontSize:25,
    marginTop:30,
    color:"red",
    

  }
});

export default home;
