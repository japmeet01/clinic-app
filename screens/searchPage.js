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

const searchPatient = ({ navigation }) => {
  const win = Dimensions.get("window");
  const [Id, setId] = useState("");
  const [patientgender, setpatientgender] = useState("");
  const [address, setaddress] = useState("");
  const [age, setage] = useState("");
  const [patientId, setpatientId] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [modal, setModal] = useState(false);

  async function getData() {
    const dbRef = await firebase.database().ref("patientInfo");
    dbRef
      .child(Id)
      .get()
      .then(async (snapshot) => {
        if (snapshot.exists()) {
          await dbRef
            .child(Id)
            .child("Gender")
            .get()
            .then((snapshot) => {
              const patientGender = snapshot.val();
              const patientgender = patientGender.toString();
              setpatientgender(patientgender);
            });
          dbRef
            .child(Id)
            .child("address")
            .get()
            .then(async (snapshot) => {
              const address = await snapshot.val();
              const Address = address.toString();
              setaddress(Address);
            });
          dbRef
            .child(Id)
            .child("age")
            .get()
            .then(async (snapshot) => {
              const age = await snapshot.val();
              const patientAge = age.toString();
              setage(patientAge);
            });
          dbRef
            .child(Id)
            .child("id")
            .get()
            .then(async (snapshot) => {
              const patientId = await snapshot.val();
              const PatientId = patientId.toString();
              setpatientId(PatientId);
            });
          dbRef
            .child(Id)
            .child("patientName")
            .get()
            .then(async (snapshot) => {
              const patientName = await snapshot.val();
              const PatientName = patientName.toString();
              setName(PatientName);
            });
          dbRef
            .child(Id)
            .child("phoneNumber")
            .get()
            .then(async (snapshot) => {
              const phoneNumber = await snapshot.val();
              const PhoneNumber = phoneNumber.toString();
              setPhoneNumber(PhoneNumber);
            });
          dbRef
            .child(Id)
            .child("visitDate")
            .get()
            .then(async (snapshot) => {
              const visitDate = await snapshot.val();
              const VisitDate = visitDate.toString();
              setVisitDate(VisitDate);
            });
          setModal(true);
        } else {
          Alert.alert("Alert", "No data exists.", [{ text: "OK" }]);
        }
      });
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
        <Text style={styles.heading}>Search Patient</Text>
      </View>
      <Card style={styles.card}>
        <TextInput
          label="Search using Patient Id"
          keyboardType="number-pad"
          value={Id}
          onChangeText={(text) => setId(text)}
          mode="outlined"
          style={styles.input}
        />
        <Button
          onPress={() => {
            getData();
          }}
          icon="account-search"
          mode="contained"
          style={styles.button}
        >
          Search
        </Button>
      </Card>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(false);
        }}
      >
        <View style={styles.modal}>
          <Button
            icon="camera"
            mode="contained"
            onPress={() => {
              setModal(false);
              navigation.navigate("patientDetails", {
                patientgender,
                address,
                age,
                patientId,
                name,
                phoneNumber,
                visitDate,
              });
            }}
          >
            View Details
          </Button>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
    alignItems: "center",
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
  input: {
    margin: 15,
    elevation: 5,
  },
  card: {
    width: "90%",
    borderRadius: 20,
    position: "absolute",
    top: 200,
    padding: 15,
  },
  button: {
    width: 120,
    marginLeft: 90,
    padding: 5,
    marginTop: 20,
    marginBottom: 30,
  },
  modal: {
    position: "absolute",
    bottom: "15%",
    left: 150,
    width: 200,
    alignItems: "center",
  },
});

export default searchPatient;
