import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useCallback } from "react";
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
import DateTimePicker from "@react-native-community/datetimepicker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Card, TextInput, Button } from "react-native-paper";
import { Icon, SocialIcon, ListItem, Avatar } from "react-native-elements";
import * as firebase from "firebase";
import MultiSelect from "react-native-multiple-select";
import DropDownPicker from "react-native-dropdown-picker";
import dosagee from "../dosage";
import treatmentt from "../treatment";
import historyy from "../history";
import COO from "../CO";
import diagnosiss from "../diagnosis";

const addPatientPage = ({ navigation, route }) => {
  const win = Dimensions.get("window");

  const { patientgender, address, age, patientId, name, phoneNumber, email } =
    route.params;

  const [Name, setName] = useState(name);
  const [Id, setId] = useState(patientId);
  const [userPhone, setUserPhone] = useState(phoneNumber);
  const [userAddress, setUserAddress] = useState(address);
  const [userAge, setUserAge] = useState(age);
  const [userGender, setUserGender] = useState(patientgender);
  const [emaill, setEmail] = useState(email);
  const [suggestion, setSuggestion] = useState("");

  //date time picker
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [visitDatee, setVisitDate] = useState("");
  const [visitTimee, setVisitTime] = useState("");

  const onChange = (event, selectedDate) => {
    setShow(false);
    const currentDate = selectedDate || date;
    setDate(currentDate);
    if(event.type == "set") {
      let tempDate = new Date(currentDate);
      let fDate =
        tempDate.getDate() +
        "-" +
        (tempDate.getMonth() + 1) +
        "-" +
        tempDate.getFullYear();
      let ftime = tempDate.getHours() + ":" + tempDate.getMinutes();
      setVisitDate(fDate);
      setVisitTime(ftime);
    }else {
        return;
    } 
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  // patient history dropdown
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState(historyy);

  // C/O
  const [openCO, setOpenCO] = useState(false);
  const [valueCO, setValueCO] = useState([]);
  const [itemsCO, setItemsCO] = useState(COO);

  // Diagnosis
  const [openDiagnosis, setOpenDiagnosis] = useState(false);
  const [valueDiagnosis, setValueDiagnosis] = useState([]);
  const [itemsDiagnosis, setItemsDiagnosis] = useState(diagnosiss);

  // treatment-1
  const [openTreatment1, setOpenTreatment1] = useState(false);
  const [valueTreatment1, setValueTreatment1] = useState([]);
  const [itemsTreatment1, setItemsTreatment1] = useState(treatmentt);

  // Dosage-1
  const [openDosage1, setOpenDosage1] = useState(false);
  const [valueDosage1, setValueDosage1] = useState([]);
  const [itemsDosage1, setItemsDosage1] = useState(dosagee);

  // treatment-2
  const [openTreatment2, setOpenTreatment2] = useState(false);
  const [valueTreatment2, setValueTreatment2] = useState([]);
  const [itemsTreatment2, setItemsTreatment2] = useState(treatmentt);

  // Dosage-2
  const [openDosage2, setOpenDosage2] = useState(false);
  const [valueDosage2, setValueDosage2] = useState([]);
  const [itemsDosage2, setItemsDosage2] = useState(dosagee);

  // treatment-3
  const [openTreatment3, setOpenTreatment3] = useState(false);
  const [valueTreatment3, setValueTreatment3] = useState([]);
  const [itemsTreatment3, setItemsTreatment3] = useState(treatmentt);

  // Dosage-3
  const [openDosage3, setOpenDosage3] = useState(false);
  const [valueDosage3, setValueDosage3] = useState([]);
  const [itemsDosage3, setItemsDosage3] = useState(dosagee);

  const onOpen = useCallback(() => {
    setOpenCO(false);
    setOpenDiagnosis(false);
    setOpenTreatment1(false);
    setOpenDosage1(false);
    setOpenTreatment2(false);
    setOpenDosage2(false);
    setOpenTreatment3(false);
    setOpenDosage3(false);
  }, []);

  const onOpenCO = useCallback(() => {
    setOpen(false);
    setOpenDiagnosis(false);
    setOpenTreatment1(false);
    setOpenDosage1(false);
    setOpenTreatment2(false);
    setOpenDosage2(false);
    setOpenTreatment3(false);
    setOpenDosage3(false);
  }, []);

  const onOpenDiagnosis = useCallback(() => {
    setOpen(false);
    setOpenCO(false);
    setOpenTreatment1(false);
    setOpenDosage1(false);
    setOpenTreatment2(false);
    setOpenDosage2(false);
    setOpenTreatment3(false);
    setOpenDosage3(false);
  }, []);
  const onOpenTreatment1 = useCallback(() => {
    setOpen(false);
    setOpenCO(false);
    setOpenDiagnosis(false);
    setOpenDosage1(false);
    setOpenTreatment2(false);
    setOpenDosage2(false);
    setOpenTreatment3(false);
    setOpenDosage3(false);
  }, []);
  const onOpenDosage1 = useCallback(() => {
    setOpen(false);
    setOpenCO(false);
    setOpenDiagnosis(false);
    setOpenTreatment1(false);
    setOpenTreatment2(false);
    setOpenDosage2(false);
    setOpenTreatment3(false);
    setOpenDosage3(false);
  }, []);
  const onOpenTreatment2 = useCallback(() => {
    setOpen(false);
    setOpenCO(false);
    setOpenDiagnosis(false);
    setOpenDosage1(false);
    setOpenTreatment1(false);
    setOpenDosage2(false);
    setOpenTreatment3(false);
    setOpenDosage3(false);
  }, []);
  const onOpenDosage2 = useCallback(() => {
    setOpen(false);
    setOpenCO(false);
    setOpenDiagnosis(false);
    setOpenTreatment1(false);
    setOpenTreatment2(false);
    setOpenDosage1(false);
    setOpenTreatment3(false);
    setOpenDosage3(false);
  }, []);
  const onOpenTreatment3 = useCallback(() => {
    setOpen(false);
    setOpenCO(false);
    setOpenDiagnosis(false);
    setOpenDosage1(false);
    setOpenTreatment1(false);
    setOpenDosage2(false);
    setOpenTreatment2(false);
    setOpenDosage3(false);
  }, []);
  const onOpenDosage3 = useCallback(() => {
    setOpen(false);
    setOpenCO(false);
    setOpenDiagnosis(false);
    setOpenTreatment1(false);
    setOpenTreatment2(false);
    setOpenDosage1(false);
    setOpenTreatment3(false);
    setOpenDosage2(false);
  }, []);

  function addPatient() {
    if (
      Id == "" ||
      Name == "" ||
      visitDatee == "" ||
      visitTimee == "" ||
      userPhone == "" ||
      userAddress == "" ||
      userAge == "" ||
      userGender == "" ||
      emaill == ""
    ) {
      Alert.alert("Error", "General details cannot be empty.", [
        { text: "OK" },
      ]);
    } else {
      const patientInfo = firebase.database().ref("patientInfo");
      patientInfo.child(Id).update({
        patientName: Name,
        phoneNumber: userPhone,
        address: userAddress,
        age: userAge,
        Gender: userGender,
        Email: emaill,
      });

      patientInfo.child(Id).child(visitDatee).child(visitTimee).set({
        patientName: Name,
        id: Id,
        phoneNumber: userPhone,
        address: userAddress,
        age: userAge,
        visitDate: visitDatee,
        visitTime: visitTimee,
        Gender: userGender,
        Email: emaill,
        Suggestion: suggestion,
        history: value,
        CO: valueCO,
        Diagnosis: valueDiagnosis,
        treatment1: valueTreatment1,
        dosage1: valueDosage1,
        treatment2: valueTreatment2,
        dosage2: valueDosage2,
        treatment3: valueTreatment3,
        dosage3: valueDosage3,
      });
      Alert.alert("Success", "Successfully added the visit.", [{ text: "OK" }]);
      navigation.navigate("Home");
    }
  }

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

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
        <TouchableOpacity onPress={() => navigation.navigate("searchPage")}>
          <Icon
            name="arrow-left"
            type="font-awesome-5"
            color="white"
            style={styles.back}
            size={30}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>New Visit</Text>
        <TouchableOpacity
          onPress={() => addPatient()}
          // onPressIn={() => navigation.navigate("Home")}
        >
          <Text style={styles.save}>Add</Text>
        </TouchableOpacity>
      </View>

      <Card style={styles.card}>
        <KeyboardAwareScrollView enableOnAndroid={true}>
          <Text style={styles.category}>General Details</Text>
          <TextInput
            label="Name"
            value={Name}
            onChangeText={(text) => setName(text)}
            mode="outlined"
            editable={false}
            style={styles.input}
            left={<TextInput.Icon name="shield-account-outline" color="grey" />}
          />
          <TextInput
            label="Patient Id"
            keyboardType="number-pad"
            value={Id}
            editable={false}
            mode="outlined"
            style={styles.input}
            left={
              <TextInput.Icon
                name="card-account-details-outline"
                color="grey"
              />
            }
          />

          <TextInput
            label="Phone Number"
            value={userPhone}
            onChangeText={(text) => setUserPhone(text)}
            mode="outlined"
            style={styles.input}
            keyboardType="number-pad"
            left={<TextInput.Icon name="cellphone-basic" color="grey" />}
          />
          <TextInput
            label="Address"
            value={userAddress}
            onChangeText={(text) => setUserAddress(text)}
            mode="outlined"
            style={styles.input}
            left={
              <TextInput.Icon name="map-marker-radius-outline" color="grey" />
            }
          />
          <TextInput
            label="Age"
            value={userAge}
            onChangeText={(text) => setUserAge(text)}
            mode="outlined"
            style={styles.input}
            keyboardType="number-pad"
          />
          <TouchableOpacity onPress={() => showMode("date")}>
            <TextInput
              label="Visit Date"
              value={visitDatee}
              mode="outlined"
              style={styles.input}
              editable={false}
              left={
                <TextInput.Icon name="calendar-month-outline" color="grey" />
              }
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => showMode("time")}>
            <TextInput
              label="Visit Time"
              value={visitTimee}
              mode="outlined"
              style={styles.input}
              editable={false}
            />
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}

          <TextInput
            label="Gender"
            value={userGender}
            onChangeText={(text) => setUserGender(text)}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Email"
            value={emaill}
            onChangeText={(text) => setEmail(text)}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon name="email-open-outline" color="grey" />}
          />
          <Text style={styles.category}>Medical Details</Text>
          <Text style={styles.subheading}>Patient History</Text>
          <DropDownPicker
            multiple={true}
            open={open}
            onOpen={onOpen}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Choose"
            placeholderStyle={{
              color: "#878787",
            }}
            dropDownContainerStyle={{
              borderColor: "#878787",
            }}
            searchContainerStyle={{
              borderBottomColor: "#878787",
            }}
            badgeColors={"white"}
            badgeDotColors={"red"}
            searchable={true}
            listMode="SCROLLVIEW"
            mode="BADGE"
            style={styles.dropdown}
            zIndex={3000}
          />

          <Text style={styles.subheading}>C/O</Text>
          <DropDownPicker
            multiple={true}
            open={openCO}
            onOpen={onOpenCO}
            value={valueCO}
            items={itemsCO}
            setOpen={setOpenCO}
            setValue={setValueCO}
            setItems={setItemsCO}
            placeholder="Choose"
            placeholderStyle={{
              color: "#878787",
            }}
            dropDownContainerStyle={{
              borderColor: "#878787",
            }}
            searchContainerStyle={{
              borderBottomColor: "#878787",
            }}
            badgeColors={"white"}
            badgeDotColors={"blue"}
            searchable={true}
            listMode="SCROLLVIEW"
            mode="BADGE"
            style={styles.dropdown}
            zIndex={2000}
          />
          <Text style={styles.subheading}>Diagnosis</Text>
          <DropDownPicker
            multiple={true}
            open={openDiagnosis}
            onOpen={onOpenDiagnosis}
            value={valueDiagnosis}
            items={itemsDiagnosis}
            setOpen={setOpenDiagnosis}
            setValue={setValueDiagnosis}
            setItems={setItemsDiagnosis}
            placeholder="Choose"
            placeholderStyle={{
              color: "#878787",
            }}
            dropDownContainerStyle={{
              borderColor: "#878787",
            }}
            searchContainerStyle={{
              borderBottomColor: "#878787",
            }}
            badgeColors={"white"}
            badgeDotColors={"green"}
            searchable={true}
            listMode="SCROLLVIEW"
            mode="BADGE"
            style={styles.dropdown}
            zIndex={1000}
          />
          <Text style={styles.subheading}>Treatment-1</Text>
          <DropDownPicker
            multiple={true}
            open={openTreatment1}
            onOpen={onOpenTreatment1}
            value={valueTreatment1}
            items={itemsTreatment1}
            setOpen={setOpenTreatment1}
            setValue={setValueTreatment1}
            setItems={setItemsTreatment1}
            placeholder="Choose"
            placeholderStyle={{
              color: "#878787",
            }}
            dropDownContainerStyle={{
              borderColor: "#878787",
            }}
            searchContainerStyle={{
              borderBottomColor: "#878787",
            }}
            badgeColors={"white"}
            badgeDotColors={"#ba5f04"}
            searchable={true}
            listMode="SCROLLVIEW"
            mode="BADGE"
            style={styles.dropdown}
            zIndex={900}
          />
          <Text style={styles.subheading2}>Dosage-1</Text>
          <DropDownPicker
            multiple={true}
            open={openDosage1}
            onOpen={onOpenDosage1}
            value={valueDosage1}
            items={itemsDosage1}
            setOpen={setOpenDosage1}
            setValue={setValueDosage1}
            setItems={setItemsDosage1}
            placeholder="Choose"
            placeholderStyle={{
              color: "#878787",
            }}
            dropDownContainerStyle={{
              borderColor: "#878787",
            }}
            searchContainerStyle={{
              borderBottomColor: "#878787",
            }}
            badgeColors={"white"}
            badgeDotColors={"#005c75"}
            searchable={true}
            listMode="SCROLLVIEW"
            mode="BADGE"
            style={styles.dropdown}
            zIndex={800}
          />
          <Text style={styles.subheading}>Treatment-2</Text>
          <DropDownPicker
            multiple={true}
            open={openTreatment2}
            onOpen={onOpenTreatment2}
            value={valueTreatment2}
            items={itemsTreatment2}
            setOpen={setOpenTreatment2}
            setValue={setValueTreatment2}
            setItems={setItemsTreatment2}
            placeholder="Choose"
            placeholderStyle={{
              color: "#878787",
            }}
            dropDownContainerStyle={{
              borderColor: "#878787",
            }}
            searchContainerStyle={{
              borderBottomColor: "#878787",
            }}
            badgeColors={"white"}
            badgeDotColors={"#ba5f04"}
            searchable={true}
            listMode="SCROLLVIEW"
            mode="BADGE"
            style={styles.dropdown}
            zIndex={700}
          />
          <Text style={styles.subheading2}>Dosage-2</Text>
          <DropDownPicker
            multiple={true}
            open={openDosage2}
            onOpen={onOpenDosage2}
            value={valueDosage2}
            items={itemsDosage2}
            setOpen={setOpenDosage2}
            setValue={setValueDosage2}
            setItems={setItemsDosage2}
            placeholder="Choose"
            placeholderStyle={{
              color: "#878787",
            }}
            dropDownContainerStyle={{
              borderColor: "#878787",
            }}
            searchContainerStyle={{
              borderBottomColor: "#878787",
            }}
            badgeColors={"white"}
            badgeDotColors={"#005c75"}
            searchable={true}
            listMode="SCROLLVIEW"
            mode="BADGE"
            style={styles.dropdown}
            zIndex={600}
          />
          <Text style={styles.subheading}>Treatment-3</Text>
          <DropDownPicker
            multiple={true}
            open={openTreatment3}
            onOpen={onOpenTreatment3}
            value={valueTreatment3}
            items={itemsTreatment3}
            setOpen={setOpenTreatment3}
            setValue={setValueTreatment3}
            setItems={setItemsTreatment3}
            placeholder="Choose"
            placeholderStyle={{
              color: "#878787",
            }}
            dropDownContainerStyle={{
              borderColor: "#878787",
            }}
            searchContainerStyle={{
              borderBottomColor: "#878787",
            }}
            badgeColors={"white"}
            badgeDotColors={"#ba5f04"}
            searchable={true}
            listMode="SCROLLVIEW"
            mode="BADGE"
            style={styles.dropdown}
            zIndex={500}
          />
          <Text style={styles.subheading2}>Dosage-3</Text>
          <DropDownPicker
            multiple={true}
            open={openDosage3}
            onOpen={onOpenDosage3}
            value={valueDosage3}
            items={itemsDosage3}
            setOpen={setOpenDosage3}
            setValue={setValueDosage3}
            setItems={setItemsDosage3}
            placeholder="Choose"
            placeholderStyle={{
              color: "#878787",
            }}
            dropDownContainerStyle={{
              borderColor: "#878787",
            }}
            searchContainerStyle={{
              borderBottomColor: "#878787",
            }}
            badgeColors={"white"}
            badgeDotColors={"#005c75"}
            searchable={true}
            listMode="SCROLLVIEW"
            mode="BADGE"
            style={styles.dropdown}
            zIndex={400}
          />
          <TextInput
            label="Suggestion"
            value={suggestion}
            onChangeText={(text) => setSuggestion(text)}
            mode="outlined"
            style={styles.input}
          />
        </KeyboardAwareScrollView>
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
    top: 170,
    padding: 15,
    height: 500,
  },
  input: {
    margin: 15,
    marginTop: 10,
    backgroundColor: "#f0f0f0",
  },
  dropdown: {
    margin: 15,
    marginTop: 10,
    width: 265,
    backgroundColor: "#f0f0f0",
    height: 60,
    borderColor: "#878787",
  },
  button: {
    width: 130,
    marginLeft: 80,
    // padding: 5,
    // marginTop: 20,
    // marginBottom: 30,
  },
  subheading: {
    marginLeft: 20,
    color: "red",
    fontSize: 17,
  },
  subheading2: {
    marginLeft: 20,
    fontSize: 17,
  },
  category: {
    marginLeft: 20,
    fontSize: 25,
    color: "#280080",
  },
});

export default addPatientPage;
