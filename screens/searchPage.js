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
  LogBox,
} from "react-native";
import { Card, TextInput, Button } from "react-native-paper";
import { Icon, SocialIcon, ListItem, Avatar } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as firebase from "firebase";
import DateTimePicker from "@react-native-community/datetimepicker";

const searchPatient = ({ navigation }) => {
  const win = Dimensions.get("window");
  const [Id, setId] = useState("");
  const [Id2, setId2] = useState("");
  const [patientgender, setpatientgender] = useState("");
  const [address, setaddress] = useState("");
  const [age, setage] = useState("");
  const [patientId, setpatientId] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [dateArray, setdateArray] = useState([]);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  


  /////////////////////////////////////////////////////////////////////////////////
  var empty = [];
  function snapshotToArray(snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var item = childSnapshot.val();

      item.key = childSnapshot.key;

      dateArray.push(item);
    });
    dateArray.reverse();
    return dateArray;
  }


  async function getData() {
    if (Id2 !== "") {
      const dbRef = await firebase.database().ref("patientInfo");

      dbRef
        .child(Id2)
        .get()
        .then(async (snapshot) => {
          if (snapshot.exists()) {
            dbRef
              .child(Id2)
              .child("dateArray")
              .on("value", function (snapshot) {
                snapshotToArray(snapshot);
              });

            dbRef
              .child(Id2)
              .child("id")
              .get()
              .then(async (snapshot) => {
                if (snapshot.exists()) {
                  const patientId = await snapshot.val();
                  const PatientId = patientId.toString();
                  setpatientId(PatientId);
                } else {
                  const PatientId = "";
                  setpatientId(PatientId);
                }
              });
            await dbRef
              .child(Id2)
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
              .child(Id2)
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
              .child(Id2)
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
              .child(Id2)
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
              .child(Id2)
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
              .child(Id2)
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
              .child(Id2)
              .child("Email")
              .get()
              .then(async (snapshot) => {
                if (snapshot.exists()) {
                  const patientEmail = await snapshot.val();
                  const patientemail = patientEmail.toString();
                  setEmail(patientemail);
                }
              });

            setModal2(true);
          } else {
            Alert.alert(
              "Alert",
              "No data exists. Please check the inputs carefully",
              [{ text: "OK" }]
            );
          }
        });
    } else {
      Alert.alert("Alert", "Inputs cannot be blank.", [{ text: "OK" }]);
    }
  }

  useEffect(() => {
    LogBox.ignoreLogs(["Reference.child failed"]);
  }, []);
  /////////////////////////////////////////////////////////////////////////////////
  
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
        <Text style={styles.heading}>Existing Patient</Text>
      </View>
      <Card style={styles.card}>
        <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={200}>
          <Text style={styles.detailsText}>Patient History</Text>
          <TextInput
            label="Enter Patient Id"
            keyboardType="number-pad"
            value={Id2}
            onChangeText={(text) => setId2(text)}
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
          <Modal
            animationType="show"
            transparent={true}
            visible={modal2}
            onRequestClose={() => {
              setModal2(false);
              setdateArray(empty);
            }}
          >
            <View style={styles.modal2}>
              <Button
                mode="contained"
                onPress={() => {
                  setModal2(false);
                  setdateArray(empty);
                  navigation.navigate("patientHistory", {
                    patientId,
                    dateArray,
                    patientgender,
                    address,
                    age,
                    patientId,
                    name,
                    phoneNumber,
                    email,
                  });
                }}
              >
                View Details
              </Button>
            </View>
          </Modal>
        </KeyboardAwareScrollView>
      </Card>
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
  detailsText: {
    fontFamily: "Salsa-Regular",
    fontSize: 25,
    lineHeight: 31,
    color: "red",
    marginLeft:15,
    marginTop: "7%",
    marginBottom: "3%",
  },
  input: {
    margin: 15,
    elevation: 5,
  },
  card: {
    width: "90%",
    borderRadius: 20,
    height: 350,
    position: "absolute",
    top: 170,
    padding: 15,
  },
  button: {
    width: 120,
    // marginLeft: 86,
    padding: 5,
    marginTop: 20,
    marginBottom: 30,
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },

  modal2: {
    position: "absolute",
    bottom: "38%",
    // left: 96,
    width: "100%",
    alignItems: "center",
  },
});

export default searchPatient;
