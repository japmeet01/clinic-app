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

const patientDetails = ({ navigation, route }) => {
  const win = Dimensions.get("window");
  const {
    patientgender,
    address,
    age,
    patientId,
    name,
    phoneNumber,
    visitDate,
  } = route.params;

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
        <Text style={styles.heading}>Patient Details</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("editDetails", {
              patientgender,
              address,
              age,
              patientId,
              name,
              phoneNumber,
              visitDate,
            })
          }
        >
          <Text style={styles.save}>edit</Text>
        </TouchableOpacity>
      </View>
      <Card style={styles.cardContainer}>
        <ScrollView>
          <Card style={styles.personalDetails}>
            <View style={styles.personalDetails}>
              <Text style={styles.detailsText}>Personal Details</Text>
              <Text style={styles.textField}>Name</Text>
              <Image
                style={styles.genderIcon}
                source={require("../assets/images/gender.png")}
              />
              <Text style={styles.textValueField}>{name}</Text>
              <View style={styles.ruler}></View>
              <Text style={styles.textField}>Patient Id</Text>
              <Image
                style={styles.genderIcon}
                source={require("../assets/images/id.png")}
              />
              <Text style={styles.textValueField}>{patientId}</Text>
              <View style={styles.ruler}></View>
              <Text style={styles.textField}>Date of Visit</Text>
              <Text style={styles.ageText}>Age</Text>
              <Image
                style={styles.dobIcon}
                source={require("../assets/images/dob.png")}
              />
              <Text style={styles.textValueField}>{visitDate}</Text>
              <Text style={styles.ageValueText}>{age}</Text>
              <View style={styles.ruler}></View>
              <Text style={styles.textField}>Gender</Text>
              <Image
                style={styles.genderIcon}
                source={require("../assets/images/gender.png")}
              />
              <Text style={styles.textValueField}>{patientgender}</Text>
              <View style={styles.ruler}></View>
              <Text style={styles.textField}>Phone No</Text>
              <Image
                style={styles.phoneIcon}
                source={require("../assets/images/phone.png")}
              />
              <Text style={styles.textValueField}>{phoneNumber}</Text>
              <View style={styles.ruler}></View>
              <Text style={styles.textField}>E-mail id</Text>
              <Image
                style={styles.emailIcon}
                source={require("../assets/images/email.png")}
              />
              <Text style={styles.textValueField}>
                japmeet01@gmail.commmmmmmmm
              </Text>
              <View style={styles.ruler}></View>
              <Text style={styles.textField}>Address</Text>
              <Image
                style={styles.addressIcon}
                source={require("../assets/images/address.png")}
              />
              <Text style={styles.textValueField}>{address}</Text>
            </View>
          </Card>
          <Card style={styles.medicalDetails}>
            <View style={styles.medicalDetails}>
              <Text style={styles.detailsText}>Medical Details</Text>
              <Text style={styles.textField}>Patient History</Text>
              <Image
                style={styles.heightIcon}
                source={require("../assets/images/history.png")}
              />
              <Text style={styles.textValueField}>Hypertension</Text>
              <View style={styles.ruler}></View>
              <Text style={styles.textField}>C/O</Text>
              <Image
                style={styles.weightIcon}
                source={require("../assets/images/weight.png")}
              />
              <Text style={styles.textValueField}>Itching</Text>
              <View style={styles.ruler}></View>
              <Text style={styles.textField}>Diagnosis</Text>
              <Image
                style={styles.bloodGroupIcon}
                source={require("../assets/images/dosage.png")}
              />
              <Text style={styles.textValueField}>Myopia</Text>
              <View style={styles.ruler}></View>
              <Text style={styles.treatment}>Treatment-1</Text>
              <Image
                style={styles.bloodGroupIcon}
                source={require("../assets/images/treatment.png")}
              />
              <Text style={styles.textValueField}>Oflus</Text>
              <View style={styles.ruler}></View>
              <Text style={styles.textField}>Dosage-1</Text>
              <Image
                style={styles.bloodGroupIcon}
                source={require("../assets/images/dosage.png")}
              />
              <Text style={styles.textValueField}>1 Time in a Day(OD)</Text>
              <View style={styles.ruler}></View>
              <Text style={styles.treatment}>Treatment-2</Text>
              <Image
                style={styles.bloodGroupIcon}
                source={require("../assets/images/treatment.png")}
              />
              <Text style={styles.textValueField}>Tinic</Text>
              <View style={styles.ruler}></View>
              <Text style={styles.textField}>Dosage-2</Text>
              <Image
                style={styles.bloodGroupIcon}
                source={require("../assets/images/dosage.png")}
              />
              <Text style={styles.textValueField}>1 Time in a Day(OD)</Text>
              <View style={styles.ruler}></View>
              <Text style={styles.treatment}>Treatment-3</Text>
              <Image
                style={styles.bloodGroupIcon}
                source={require("../assets/images/treatment.png")}
              />
              <Text style={styles.textValueField}>Zyflur</Text>
              <View style={styles.ruler}></View>
              <Text style={styles.textField}>Dosage-3</Text>
              <Image
                style={styles.bloodGroupIcon}
                source={require("../assets/images/dosage.png")}
              />
              <Text style={styles.textValueField}>Twice</Text>
            </View>
          </Card>
        </ScrollView>
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
    marginLeft: 20,
    marginRight: 20,
  },
  save: {
    color: "white",
    fontSize: 20,
  },
  cardContainer: {
    marginTop: 160,
    marginBottom: 50,
    backgroundColor: "#E5E5E5",
    elevation: 0,
  },
  personalDetails: {
    position: "relative",
    width: "90%",
    marginBottom: "8%",
    marginLeft: "5%",
    backgroundColor: "#FFFFFF",
    borderRadius: 37,
    marginTop: 30,
  },
  medicalDetails: {
    width: "90%",
    marginTop: 20,
    marginLeft: "5%",
    marginBottom: 28,
    backgroundColor: "#FFFFFF",
    borderRadius: 37,
  },
  ruler: {
    position: "relative",
    width: "90%",
    height: 0,
    marginLeft: "5%",
    borderWidth: 0.5,
    borderColor: "#C0C0C0",
    marginBottom: "3%",
    marginTop: "3%",
  },
  detailsText: {
    fontFamily: "Salsa-Regular",
    fontSize: 25,
    lineHeight: 31,
    color: "red",
    marginLeft: "8%",
    marginTop: "7%",
    marginBottom: "3%",
  },
  textField: {
    fontFamily: "Calibri-Regular",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 23,
    lineHeight: 28,
    color: "#8B8B8B",
    marginLeft: "8%",
    marginBottom: "3%",
  },
  textValueField: {
    position: "relative",
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 20,
    lineHeight: 23,
    color: "#000000",
    marginLeft: "20%",
    marginTop: "-8%",
  },
  dobIcon: {
    width: 20,
    height: 20,
    position: "relative",
    marginLeft: "9%",
    marginTop: "6%",
  },
  genderIcon: {
    width: 20,
    height: 20,
    position: "relative",
    marginLeft: "9%",
    marginBottom: ".8%",
  },
  ageText: {
    position: "relative",
    fontFamily: "Calibri-Regular",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 23,
    lineHeight: 28,
    color: "#8B8B8B",
    marginLeft: "70%",
    marginTop: "-14%",
  },
  ageValueText: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 20,
    lineHeight: 23,
    color: "#000000",
    marginLeft: "70%",
    marginTop: "-9%",
  },
  phoneIcon: {
    width: 20,
    height: 20,
    position: "relative",
    marginLeft: "9%",
    marginBottom: ".6%",
  },
  emailIcon: {
    width: 24,
    height: 24,
    position: "relative",
    marginLeft: "9%",
    marginBottom: "-.6%",
  },
  addressIcon: {
    width: 19,
    height: 25,
    position: "relative",
    marginLeft: "9%",
    marginBottom: ".6%",
    top: 10,
  },
  heightIcon: {
    width: 23,
    height: 23,
    position: "relative",
    marginLeft: "9%",
    marginBottom: ".5%",
  },
  weightIcon: {
    width: 22,
    height: 22,
    position: "relative",
    marginLeft: "9%",
    marginBottom: ".8%",
  },
  bloodGroupIcon: {
    width: 30,
    height: 27,
    position: "relative",
    marginLeft: "7.5%",
    marginBottom: "-.2%",
  },
  treatment: {
    fontFamily: "Calibri-Regular",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 23,
    lineHeight: 28,
    color: "red",
    marginLeft: "8%",
    marginBottom: "3%",
  },
});

export default patientDetails;
