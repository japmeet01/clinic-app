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
import { Icon, SocialIcon, ListItem, Avatar } from "react-native-elements";
import * as firebase from "firebase";

const addPatientPage = ({ navigation }) => {
  const win = Dimensions.get("window");
  const [Name, setName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userAge, setUserAge] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [userGender, setUserGender] = useState("");

  function addPatient() {
    const patientInfo = firebase.database().ref("patientInfo");
    patientInfo.child(Id).set({
      patientName: Name,
      id: Id,
      phoneNumber: userPhone,
      address: userAddress,
      age: userAge,
      visitDate: visitDate,
      Gender: userGender,
    });
    Alert.alert("Success", "Patient Added Successfully.", [{ text: "OK" }]);
  }

  const [Id, setId] = useState("");

  function check() {
    if (Id !== "") {
      var ref = firebase.database().ref("patientInfo");
      ref.once("value").then(function (snapshot) {
        var b = snapshot.child(Id).exists();
        if (b) {
          Alert.alert("Alert", "Patient Id already exists.", [{ text: "OK" }]);
        }
      });
    }
  }


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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Icon
            name="arrow-left"
            type="font-awesome-5"
            color="white"
            style={styles.back}
            size={30}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>Add Patient</Text>
        <TouchableOpacity onPress={() => addPatient()} onPressIn={() => navigation.navigate("Home")} >
          <Text style={styles.save}>Add</Text>
        </TouchableOpacity>
      </View>

      <Card style={styles.card}>
        <ScrollView>
          <TextInput
            label="Name"
            value={Name}
            onChangeText={(text) => setName(text)}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Patient Id"
            keyboardType="number-pad"
            value={Id}
            onChangeText={(text) => setId(text)}
            onSubmitEditing={() => check()}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Phone Number"
            value={userPhone}
            onChangeText={(text) => setUserPhone(text)}
            mode="outlined"
            style={styles.input}
            keyboardType="number-pad"
          />
          <TextInput
            label="Address"
            value={userAddress}
            onChangeText={(text) => setUserAddress(text)}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Age"
            value={userAge}
            onChangeText={(text) => setUserAge(text)}
            mode="outlined"
            style={styles.input}
            keyboardType="number-pad"
          />
          <TextInput
            label="Date of Visit (DD/MM/YYYY)"
            value={visitDate}
            onChangeText={(text) => setVisitDate(text)}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Gender"
            value={userGender}
            onChangeText={(text) => setUserGender(text)}
            mode="outlined"
            style={styles.input}
          />
        </ScrollView>
      </Card>

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

  header: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    top: 50,
    alignItems: "center",
  },
  heading: {
    fontSize: 32,
    color: "white",
    marginLeft: 40,
    marginRight: 30,
  },
  save: {
    color: "white",
    fontSize: 20,
  },
  card: {
    width: "90%",
    borderRadius: 20,
    position: "absolute",
    top: 200,
    padding: 15,
    height: 480,
  },
  input: {
    margin: 15,
    marginTop: 10,
  },
});

export default addPatientPage;
