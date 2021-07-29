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
  const [email, setEmail] = useState("");
  const [history, setHistory] = useState("");
  const [CO, setCO] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment1, setTreatment1] = useState("");
  const [dosage1, setDosage1] = useState("");
  const [treatment2, setTreatment2] = useState("");
  const [dosage2, setDosage2] = useState("");
  const [treatment3, setTreatment3] = useState("");
  const [dosage3, setDosage3] = useState("");
  const [doctorSuggestion, setDoctorSuggestion] = useState("");
  const [modal, setModal] = useState(false);

  async function getData() {
    if(Id!==""){
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
              if (snapshot.exists()) {
              const patientGender = snapshot.val();
              const patientgender = patientGender.toString();
              setpatientgender(patientgender);
              }
            });
          dbRef
            .child(Id)
            .child("address")
            .get()
            .then(async (snapshot) => {
              if (snapshot.exists()) {
              const address = await snapshot.val();
              const Address = address.toString();
              setaddress(Address);
              }
            });
          dbRef
            .child(Id)
            .child("age")
            .get()
            .then(async (snapshot) => {
              if (snapshot.exists()) {
              const age = await snapshot.val();
              const patientAge = age.toString();
              setage(patientAge);
              }
            });
          dbRef
            .child(Id)
            .child("id")
            .get()
            .then(async (snapshot) => {
              if (snapshot.exists()) {
              const patientId = await snapshot.val();
              const PatientId = patientId.toString();
              setpatientId(PatientId);
              }
            });
          dbRef
            .child(Id)
            .child("patientName")
            .get()
            .then(async (snapshot) => {
              if (snapshot.exists()) {
              const patientName = await snapshot.val();
              const PatientName = patientName.toString();
              setName(PatientName);
              }
            });
          dbRef
            .child(Id)
            .child("phoneNumber")
            .get()
            .then(async (snapshot) => {
              if (snapshot.exists()) {
              const phoneNumber = await snapshot.val();
              const PhoneNumber = phoneNumber.toString();
              setPhoneNumber(PhoneNumber);
              }
            });
            dbRef
            .child(Id)
            .child("Suggestion")
            .get()
            .then(async (snapshot) => {
              if (snapshot.exists()) {
              const sugg = await snapshot.val();
              const Sugg = sugg.toString();
              setDoctorSuggestion(Sugg);
              }
            });
          dbRef
            .child(Id)
            .child("visitDate")
            .get()
            .then(async (snapshot) => {
              if (snapshot.exists()) {
              const visitDate = await snapshot.val();
              const VisitDate = visitDate.toString();
              setVisitDate(VisitDate);
              }
            });
          dbRef
            .child(Id)
            .child("Email")
            .get()
            .then(async (snapshot) => {
              if (snapshot.exists()) {
              const patientEmail = await snapshot.val();
              const patientemail = patientEmail.toString();
              setEmail(patientemail);
              }
            });
          dbRef
            .child(Id)
            .child("history")
            .get()
            .then(async (snapshot) => {
              if (snapshot.exists()) {
              const patientHistory = await snapshot.val();
              const patienthistory = patientHistory.toString();
              setHistory(patienthistory);
              }
            });
          dbRef
            .child(Id)
            .child("CO")
            .get()
            .then(async (snapshot) => {
              if (snapshot.exists()) {
              const co = await snapshot.val();
              const patientCO = co.toString();
              setCO(patientCO);
              }
            });
          dbRef
            .child(Id)
            .child("Diagnosis")
            .get()
            .then(async (snapshot) => {
              if (snapshot.exists()) {
              const diag = await snapshot.val();
              const patientDiagnosis = diag.toString();
              setDiagnosis(patientDiagnosis);
              }
            });
          dbRef
            .child(Id)
            .child("treatment1")
            .get()
            .then(async (snapshot) => {
              if (snapshot.exists()) {
              const treat1 = await snapshot.val();
              const Treat1 = treat1.toString();
              setTreatment1(Treat1);
              }
            });
          dbRef
            .child(Id)
            .child("dosage1")
            .get()
            .then(async (snapshot) => {
              if (snapshot.exists()) {
              const dose1 = await snapshot.val();
              const Dose1 = dose1.toString();
              setDosage1(Dose1);
              }
            });
          dbRef
            .child(Id)
            .child("treatment2")
            .get()
            .then(async (snapshot) => {
              if (snapshot.exists()) {
              const treat2 = await snapshot.val();
              const Treat2 = treat2.toString();
              setTreatment2(Treat2);
              }
            });
          dbRef
            .child(Id)
            .child("dosage2")
            .get()
            .then(async (snapshot) => {
              if (snapshot.exists()) {
              const dose2 = await snapshot.val();
              const Dose2 = dose2.toString();
              setDosage2(Dose2);
              }
            });
            dbRef
            .child(Id)
            .child("treatment3")
            .get()
            .then(async (snapshot) => {
              if (snapshot.exists()) {
              const treat3 = await snapshot.val();
              const Treat3 = treat3.toString();
              setTreatment3(Treat3);
              }
            });
            dbRef
            .child(Id)
            .child("dosage3")
            .get()
            .then(async (snapshot) => {
              if (snapshot.exists()) {
              const dose3 = await snapshot.val();
              const Dose3 = dose3.toString();
              setDosage3(Dose3);
              }
            });
          setModal(true);
        } else {
          Alert.alert("Alert", "No data exists.", [{ text: "OK" }]);
        }
      });
    }
    else{
      Alert.alert("Alert", "Id cannot be blank.", [{ text: "OK" }]);
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
                email,
                history,
                CO,
                diagnosis,
                treatment1,
                dosage1,
                treatment2,
                dosage2,
                treatment3,
                dosage3,
                doctorSuggestion
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
    marginLeft: 86,
    padding: 5,
    marginTop: 20,
    marginBottom: 30,
  },
  modal: {
    position: "absolute",
    bottom: "35%",
    left: 96,
    width: 170,
    alignItems: "center",
  },
});

export default searchPatient;
