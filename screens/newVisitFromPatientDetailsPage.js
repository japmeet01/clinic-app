import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect ,useCallback} from "react";
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DropDownPicker from "react-native-dropdown-picker";
import * as firebase from "firebase";
import dosagee from "../dosage"
import treatmentt from "../treatment"
import historyy from "../history"
import COO from "../CO"
import diagnosiss from "../diagnosis"
import DateTimePicker from "@react-native-community/datetimepicker";

const addPatientPage = ({ navigation, route }) => {
  const win = Dimensions.get("window");
  const {
    patientgender,
    address,
    age,
    patientId,
    name,
    phoneNumber,
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
    doctorSuggestion,
  } = route.params;
  const [Name, setName] = useState(name);
  const [Id, setId] = useState(patientId);
  const [userPhone, setUserPhone] = useState(phoneNumber);
  const [userAddress, setUserAddress] = useState(address);
  const [userAge, setUserAge] = useState(age);
//   const [patientvisitDate, setVisitDate] = useState(visitDate);
  const [userGender, setUserGender] = useState(patientgender);
  const [patientEmail, setEmail] = useState(email);
  const [History, setHistory] = useState(history);
  const [co, setCO] = useState(CO);
  const [Diagnosis, setDiagnosis] = useState(diagnosis);
  const [Treatment1, setTreatment1] = useState(treatment1);
  const [Dosage1, setDosage1] = useState(dosage1);
  const [Treatment2, setTreatment2] = useState(treatment2);
  const [Dosage2, setDosage2] = useState(dosage2);
  const [Treatment3, setTreatment3] = useState(treatment3);
  const [Dosage3, setDosage3] = useState(dosage3);
  const [Suggestion, setSuggestion] = useState(doctorSuggestion);

  //date time picker
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [patientvisitDate, setVisitDate] = useState("");

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
      setVisitDate(fDate);

  } else {
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

  function editData() {
    const patientInfo = firebase.database().ref("patientInfo");
    patientInfo.child(Id).update({
      patientName: Name,
      id: Id,
      phoneNumber: userPhone,
      address: userAddress,
      age: userAge,
      Gender: userGender,
      Email: patientEmail,
      // history:History,
      // CO: co,
      // Diagnosis: Diagnosis,
      // treatment1: Treatment1,
      // dosage1: Dosage1,
      // treatment2: Treatment2,
      // dosage2: Dosage2,
      // treatment3: Treatment3,
      // dosage3: Dosage3,
    });

    patientInfo.child(Id).child(patientvisitDate).update({
      Suggestion:Suggestion,
    });

    patientInfo.child(Id).child("dateArray").push(patientvisitDate);

    patientInfo.child(Id).child(patientvisitDate).update({
      patientName: Name,
      id: Id,
      phoneNumber: userPhone,
      address: userAddress,
      age: userAge,
      visitDate: patientvisitDate,
      Gender: userGender,
      Email: patientEmail,
    });

    if (value !== []) {
      const patientInfo = firebase.database().ref("patientInfo");
      patientInfo.child(Id).child(patientvisitDate).update({
        history: value,
      });
    }
      if(value.length==0){
      const patientInfo = firebase.database().ref("patientInfo");
      patientInfo.child(Id).child(patientvisitDate).update({
        history: History,
      });
    }

    if (valueCO !== []) {
      const patientInfo = firebase.database().ref("patientInfo");
      patientInfo.child(Id).child(patientvisitDate).update({
        CO: valueCO,
      });
    }
    if(valueCO.length==0){
      const patientInfo = firebase.database().ref("patientInfo");
      patientInfo.child(Id).child(patientvisitDate).update({
        CO: co,
      });
    }

    if (valueDiagnosis !== []) {
      const patientInfo = firebase.database().ref("patientInfo");
      patientInfo.child(Id).child(patientvisitDate).update({
        Diagnosis: valueDiagnosis,
      });
    }
    if(valueDiagnosis.length==0){
      const patientInfo = firebase.database().ref("patientInfo");
      patientInfo.child(Id).child(patientvisitDate).update({
        Diagnosis: Diagnosis,
      });
    }
    
    if (valueTreatment1 !== []) {
      const patientInfo = firebase.database().ref("patientInfo");
      patientInfo.child(Id).child(patientvisitDate).update({
        treatment1: valueTreatment1,
      });
    }
    if(valueTreatment1.length==0){
      const patientInfo = firebase.database().ref("patientInfo");
      patientInfo.child(Id).child(patientvisitDate).update({
        treatment1: Treatment1,
      });
    }

    if (valueDosage1 !== []) {
      const patientInfo = firebase.database().ref("patientInfo");
      patientInfo.child(Id).child(patientvisitDate).update({
        dosage1: valueDosage1,
      });
    }
    if(valueDosage1.length==0){
      const patientInfo = firebase.database().ref("patientInfo");
      patientInfo.child(Id).child(patientvisitDate).update({
        dosage1: Dosage1,
      });
    }

    if (valueTreatment2 !== []) {
      const patientInfo = firebase.database().ref("patientInfo");
      patientInfo.child(Id).child(patientvisitDate).update({
        treatment2: valueTreatment2,
      });
    }
    if(valueTreatment2.length==0){
      const patientInfo = firebase.database().ref("patientInfo");
      patientInfo.child(Id).child(patientvisitDate).update({
        treatment2: Treatment2,
      });
    }

    if (valueDosage2 !== []) {
      const patientInfo = firebase.database().ref("patientInfo");
      patientInfo.child(Id).child(patientvisitDate).update({
        dosage2: valueDosage2,
      });
    }
    if(valueDosage2.length==0){
      const patientInfo = firebase.database().ref("patientInfo");
      patientInfo.child(Id).child(patientvisitDate).update({
        dosage2: Dosage2,
      });
    }

    if (valueTreatment3 !== []) {
      const patientInfo = firebase.database().ref("patientInfo");
      patientInfo.child(Id).child(patientvisitDate).update({
        treatment3: valueTreatment3,
      });
    }
    if(valueTreatment3.length==0){
      const patientInfo = firebase.database().ref("patientInfo");
      patientInfo.child(Id).child(patientvisitDate).update({
        treatment3: Treatment3,
      });
    }

    if (valueDosage3 !== []) {
      const patientInfo = firebase.database().ref("patientInfo");
      patientInfo.child(Id).child(patientvisitDate).update({
        dosage3: valueDosage3,
      });
    }
    if(valueDosage3.length==0){
      const patientInfo = firebase.database().ref("patientInfo");
      patientInfo.child(Id).child(patientvisitDate).update({
        dosage3: Dosage3,
      });
    }

    Alert.alert("Success", "Details Updated Succesfully", [{ text: "OK" }]);
    navigation.navigate("Home");
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
        <TouchableOpacity onPress={() => navigation.navigate("patientDetails")}>
          <Icon
            name="arrow-left"
            type="font-awesome-5"
            color="white"
            style={styles.back}
            size={30}
          />
        </TouchableOpacity>

        <Text style={styles.heading}>Repeat Visit</Text>
        <TouchableOpacity onPress={() => editData()}>
          <Text style={styles.save}>Add</Text>
        </TouchableOpacity>
      </View>

      <Card style={styles.card}>
        <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={200}>
          <Text style={styles.detailsText}>Personal Details</Text>
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
            mode="outlined"
            style={styles.input}
            editable={false}
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
            multiline={true}
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
              value={patientvisitDate}
              mode="outlined"
              style={styles.input}
              editable={false}
              onChange={onChange}
              left={
                <TextInput.Icon name="calendar-month-outline" color="grey" />
              }
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
            value={patientEmail}
            onChangeText={(text) => setEmail(text)}
            mode="outlined"
            style={styles.input}
          />
          <Text style={styles.detailsText}>Medical Details</Text>
          <Text style={styles.subheading}>Patient History</Text>
          <TextInput
          placeholder="Patient History"
            value={History}
            onChangeText={(text) => setHistory(text)}
            mode="outlined"
            style={styles.input1}
            multiline={true}
            editable={false}
          />
          
          <DropDownPicker
            multiple={true}
            open={open}
            onOpen={onOpen}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Edit Patient History"
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
          <TextInput
          placeholder="C/O"
            value={co}
            onChangeText={(text) => setCO(text)}
            mode="outlined"
            style={styles.input1}
            multiline={true}
            editable={false}
          />
          <DropDownPicker
            multiple={true}
            open={openCO}
            onOpen={onOpenCO}
            value={valueCO}
            items={itemsCO}
            setOpen={setOpenCO}
            setValue={setValueCO}
            setItems={setItemsCO}
            placeholder="Edit C/O"
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
          <TextInput
          placeholder="Diagnosis"
            value={Diagnosis}
            onChangeText={(text) => setDiagnosis(text)}
            mode="outlined"
            style={styles.input1}
            multiline={true}
            editable={false}
          />
          
          <DropDownPicker
            multiple={true}
            open={openDiagnosis}
            onOpen={onOpenDiagnosis}
            value={valueDiagnosis}
            items={itemsDiagnosis}
            setOpen={setOpenDiagnosis}
            setValue={setValueDiagnosis}
            setItems={setItemsDiagnosis}
            placeholder="Edit Diagnosis"
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
          <TextInput
          placeholder="Treatment-1"
            value={Treatment1}
            onChangeText={(text) => setTreatment1(text)}
            mode="outlined"
            style={styles.input1}
            multiline={true}
            editable={false}
          />
          
          <DropDownPicker
            multiple={true}
            open={openTreatment1}
            onOpen={onOpenTreatment1}
            value={valueTreatment1}
            items={itemsTreatment1}
            setOpen={setOpenTreatment1}
            setValue={setValueTreatment1}
            setItems={setItemsTreatment1}
            placeholder="Edit Treatment-1"
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
          <Text style={styles.subheading}>Dosage-1</Text>
          <TextInput
          placeholder="Dosage-1"
            value={Dosage1}
            onChangeText={(text) => setDosage1(text)}
            mode="outlined"
            style={styles.input1}
            multiline={true}
            editable={false}
          />
          
          <DropDownPicker
            multiple={true}
            open={openDosage1}
            onOpen={onOpenDosage1}
            value={valueDosage1}
            items={itemsDosage1}
            setOpen={setOpenDosage1}
            setValue={setValueDosage1}
            setItems={setItemsDosage1}
            placeholder="Edit Dosage-1"
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
          <TextInput
          placeholder="Treatment-2"
            value={Treatment2}
            onChangeText={(text) => setTreatment2(text)}
            mode="outlined"
            style={styles.input1}
            multiline={true}
            editable={false}
          />
           
          <DropDownPicker
            multiple={true}
            open={openTreatment2}
            onOpen={onOpenTreatment2}
            value={valueTreatment2}
            items={itemsTreatment2}
            setOpen={setOpenTreatment2}
            setValue={setValueTreatment2}
            setItems={setItemsTreatment2}
            placeholder="Edit Treatment-2"
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
           <Text style={styles.subheading}>Dosage-2</Text>
          <TextInput
          placeholder="Dosage-2"
            value={Dosage2}
            onChangeText={(text) => setDosage2(text)}
            mode="outlined"
            style={styles.input1}
            multiline={true}
            editable={false}
          />
          
          <DropDownPicker
            multiple={true}
            open={openDosage2}
            onOpen={onOpenDosage2}
            value={valueDosage2}
            items={itemsDosage2}
            setOpen={setOpenDosage2}
            setValue={setValueDosage2}
            setItems={setItemsDosage2}
            placeholder="Edit Dosage-2"
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
          <TextInput
          placeholder="Treatment-3"
            value={Treatment3}
            onChangeText={(text) => setTreatment3(text)}
            mode="outlined"
            style={styles.input1}
            multiline={true}
            editable={false}
          />

          <DropDownPicker
            multiple={true}
            open={openTreatment3}
            onOpen={onOpenTreatment3}
            value={valueTreatment3}
            items={itemsTreatment3}
            setOpen={setOpenTreatment3}
            setValue={setValueTreatment3}
            setItems={setItemsTreatment3}
            placeholder="Edit Treatment-3"
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
          <Text style={styles.subheading}>Dosage-3</Text>
          <TextInput
            placeholder="Dosage-3"
            value={Dosage3}
            onChangeText={(text) => setDosage3(text)}
            mode="outlined"
            style={styles.input1}
            multiline={true}
            editable={false}
          />
           
          <DropDownPicker
            multiple={true}
            open={openDosage3}
            onOpen={onOpenDosage3}
            value={valueDosage3}
            items={itemsDosage3}
            setOpen={setOpenDosage3}
            setValue={setValueDosage3}
            setItems={setItemsDosage3}
            placeholder="Edit Dosage-3"
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
            value={Suggestion}
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
    top: 160,
    padding: 15,
    paddingBottom: 25,
    height: 460,
  },
  input: {
    marginTop: 20,
  },
  input1: {
    marginTop: 4,
  },
  detailsText: {
    fontFamily: "Salsa-Regular",
    fontSize: 25,
    lineHeight: 31,
    color: "red",
    marginTop: "7%",
    marginBottom: "2%",
  },
  subheading: {
    color: "red",
    fontSize: 17,
    marginTop:15,
  },
  dropdown: {
    marginTop: 15,
    backgroundColor: "#f0f0f0",
    height: 60,
    borderColor: "#878787",
    marginBottom: 15,
  },

});

export default addPatientPage;
