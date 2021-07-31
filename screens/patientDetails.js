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
    visitTime,
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
              visitTime,
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
            })
          }
        >
          <Text style={styles.save}>edit</Text>
        </TouchableOpacity>
      </View>
      <Card style={styles.cardContainer}>
        <ScrollView>
          <Text style={styles.detailsText}>Personal Details</Text>
          <View style={styles.row}>
            <View>
              <TextInput
                label="Patient id"
                value={patientId}
                editable={false}
                mode="outlined"
                style={styles.inputid}
                left={
                  <TextInput.Icon
                    name="card-account-details-outline"
                    color="grey"
                  />
                }
              />
            </View>
            <View>
              <TextInput
                label="Visit Date"
                value={visitDate}
                editable={false}
                mode="outlined"
                style={styles.inputDate}
                left={
                  <TextInput.Icon name="calendar-month-outline" color="grey" />
                }
              />
            </View>
          </View>

          <TextInput
            label="Patient Name"
            value={name}
            editable={false}
            mode="outlined"
            style={styles.inputname}
            left={<TextInput.Icon name="shield-account-outline" color="grey" />}
          />
          <View style={styles.row}>
            <View>
              <TextInput
                label="Age"
                value={age}
                editable={false}
                mode="outlined"
                style={styles.inputAge}
              />
            </View>
            <View>
              <TextInput
                label="Gender"
                value={patientgender}
                editable={false}
                mode="outlined"
                style={styles.inputgender}
              />
            </View>
          </View>
          <TextInput
            label="Phone Number"
            value={phoneNumber}
            editable={false}
            mode="outlined"
            style={styles.inputname}
            left={<TextInput.Icon name="cellphone-basic" color="grey" />}
          />
          <View style={styles.emailHead}>
          <Icon name="email-open-outline" color="grey" type="material-community"/>
          <Text style={styles.emaill}>Email</Text>
          </View>
          
          <TextInput
            placeholder="Email"
            value={email}
            editable={false}
            mode="outlined"
            style={styles.inputname}
            multiline={true}
          />
          <View style={styles.emailHead}>
          <Icon name="map-marker-radius-outline" color="grey" type="material-community"/>
          <Text style={styles.emaill}>Address</Text>
          </View>
          <TextInput
            placeholder="Address"
            value={address}
            editable={false}
            mode="outlined"
            style={styles.inputname}
            multiline={true}
          />
          <Text style={styles.detailsText}>Medical Details</Text>

          <View style={styles.emailHead}>
          <Icon name="account-clock-outline" color="grey" type="material-community"/>
          <Text style={styles.emaill}>Patient History</Text>
          </View>
          <TextInput
            placeholder="Patient History"
            value={history}
            editable={false}
            mode="outlined"
            style={styles.inputname}
            multiline={true}
          />
          <View style={styles.emailHead}>
          <Icon name="alert-decagram-outline" color="grey" type="material-community"/>
          <Text style={styles.emaill}>C/O</Text>
          </View>
          <TextInput
            placeholder="C/O"
            value={CO}
            editable={false}
            mode="outlined"
            style={styles.inputname}
            multiline={true}
          />
          <View style={styles.emailHead}>
          <Icon name="doctor" color="grey" type="material-community"/>
          <Text style={styles.emaill}>Diagnosis</Text>
          </View>
          <TextInput
            placeholder="Diagnosis"
            value={diagnosis}
            editable={false}
            mode="outlined"
            style={styles.inputname}
            multiline={true}
          />
          <View style={styles.emailHead}>
          <Icon name="alarm-light-outline" color="grey" type="material-community"/>
          <Text style={styles.treatment}>Treatment-1</Text>
          </View>
          <TextInput
            placeholder="Treatment-1"
            value={treatment1}
            editable={false}
            mode="outlined"
            style={styles.inputname}
            multiline={true}
          />
          <View style={styles.emailHead}>
          <Icon name="progress-clock" color="grey" type="material-community"/>
          <Text style={styles.emaill}>Dosage-1</Text>
          </View>
          <TextInput
            placeholder="Dosage-1"
            value={dosage1}
            editable={false}
            mode="outlined"
            style={styles.inputname}
            multiline={true}
          />
          <View style={styles.emailHead}>
          <Icon name="alarm-light-outline" color="grey" type="material-community"/>
          <Text style={styles.treatment}>Treatment-2</Text>
          </View>
          <TextInput
            placeholder="Treatment-2"
            value={treatment2}
            editable={false}
            mode="outlined"
            style={styles.inputname}
            multiline={true}
          />
          <View style={styles.emailHead}>
          <Icon name="progress-clock" color="grey" type="material-community"/>
          <Text style={styles.emaill}>Dosage-2</Text>
          </View>
          <TextInput
            placeholder="Dosage-2"
            value={dosage2}
            editable={false}
            mode="outlined"
            style={styles.inputname}
            multiline={true}
          />
          <View style={styles.emailHead}>
          <Icon name="alarm-light-outline" color="grey" type="material-community"/>
          <Text style={styles.treatment}>Treatment-3</Text>
          </View>
          <TextInput
            placeholder="Treatment-3"
            value={treatment3}
            editable={false}
            mode="outlined"
            style={styles.inputname}
            multiline={true}
          />
          <View style={styles.emailHead}>
          <Icon name="progress-clock" color="grey" type="material-community"/>
          <Text style={styles.emaill}>Dosage-3</Text>
          </View>
          <TextInput
            placeholder="Dosage-3"
            value={dosage3}
            editable={false}
            mode="outlined"
            style={styles.inputname}
            multiline={true}
          />
          <TextInput
            label="Suggestion"
            value={doctorSuggestion}
            editable={false}
            mode="outlined"
            multiline={true}
            style={styles.inputname}
          />

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
    width: "90%",
    borderRadius: 20,
    position: "absolute",
    top: 160,
    padding: 15,
    paddingBottom: 25,
    height: 530,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  detailsText: {
    fontFamily: "Salsa-Regular",
    fontSize: 25,
    lineHeight: 31,
    color: "red",
    marginTop: "7%",
    marginBottom: "5%",
  },
  inputDate: {
    width: 150,
  },
  inputid: {
    width: 100,
  },
  inputname: {
    marginBottom: 20,
  },
  inputAge: {
    width: 100,
  },
  inputgender: {
    width: 150,
  },
  emailHead:{
    flexDirection:"row",
    alignItems:"center",
  },
  emaill:{
    marginLeft:5,
    color: "grey"
  },
  treatment:{
    marginLeft:5,
    color: "red"
  },
});

export default patientDetails;
