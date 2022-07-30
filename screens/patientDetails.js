import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";

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
import * as Print from "expo-print";

const patientDetails = ({ navigation, route }) => {
  const win = Dimensions.get("window");
  const {
    patientgender,
    address,
    agee,
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
    doctorSuggestion,
  } = route.params;

  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style>
       .patient-table{
          border-collapse: collapse;
          margin:auto;
          width: 100%;
  
       }
       .patient{
          margin-top: 50px;
          
       }
       
  
      </style>
    </head>
    <body>
        <div class="table1">
          <table border="1px" cellpadding="10" cellspacing="2" bordercolor="#b0b0b0" style="color:#03574a">
              <tr>
                <th bgcolor="#32a0a8"><font color="white">OUR MOTO IS TO PREVENT BLINDNESS</font></th>
                <th>Mob. **********</th>
              </tr>
              <tr>
                <th bgcolor="#32a0a8"><font color="white">ANIL EYE CARE CENTER</font></th>
                <th>अनिल आई केयर सेंटर</th>
              </tr>
              <tr colspan="2">
                <td>
                  Dharamgarh Road, Ward No. 4
                </td>
                <td>
                  धर्मगढ़ रोड, वार्ड नंबर 4
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  Supported by Pracheen Shiv Mandir Charitable trust 
                </td>
              </tr>
              <tr>
                <td text-align="left">
                  <b>Dr. Ashapritpal Kaur<br /></b>
                  M.B.B.S, M.S Ophthalmology <br />
                  Phaco Medical Retinal Specialist & Squint Surgeon
                </td>
                <td text-align="left">
                  <b>Dr. Vartika Anand<br /></b>
                  M.B.B.S, M.S Ophthalmology <br />
                  Ex. SR Gian Sagar Medical College <br />
                  Consultant Surgeon Guru Teg Bahadur Eye Hospital, Patiala
                </td>
              </tr>
              <tr>
                <td text-align="left" colspan="2">
                  <b>Optom. ANIL VISHWAS MEHTA<br /></b>
                  Master in Optometry and Ophthalmic Technology<br />
                  Apprenticeship holder from General Hospital Sector-16, Chandigarh
                  <br />
                  <ul>
                    <li>Ex. Ophthalmic Asst. P.C Sharma Eye Hospital Ambala city</li>
                    <li>Ex. Ophthalmic Asst J. P Eye Hospital, Mohali</li>
                    <li>Ex. Ophthalmic Asst Pannu Eye Hospital, Ropar</li>
                    <li>
                      Ex. Ophthalmic Officer Gian Sagar Medical College & Hospital
                    </li>
                  </ul>
                </td>
              </tr>
            </table>
        </div>
        
      <div class="patient">
          <table class="patient-table" border="1px" cellpadding="10" bordercolor="#d6d6d6" style="color:#03574a">
              <tr >
                 <th colspan="2">Patient Details</th> 
              </tr>
              
              <tr>
                  <td><b>ID</b></td>
                  <td>${patientId}</td>
              </tr>
              <tr>
                  <td><b>Name</b></td>
                  <td>${name}</td>
              </tr>
              <tr>
                  <td><b>Gender</b></td>
                  <td>${patientgender}</td>
              </tr>
              <tr>
                  <td><b>Visit Date</b></td>
                  <td>${visitDate}</td>
              </tr>
              <tr>
                  <td><b>Phone</b></td>
                  <td>${phoneNumber}</td>
              </tr>
              </table>
              </div>
          
              <div class="patient">
        <table class="patient-table" border="1px" cellpadding="10" bordercolor="#d6d6d6" style="color:#03574a">
            <tr >
               <th colspan="3">Medical Details</th> 
            </tr>
            
            <tr>
            <th></th>
                <th>Medicine</th>
                <th>Dosage</th>
            </tr>
            <tr>
            <th>Treatment-1</th>
                <td>${treatment1}</td>
                <td>${dosage1}</td>
            </tr>
            <tr>
            <th>Treatment-2</th>
            <td>${treatment2}</td>
            <td>${dosage2}</td>
            </tr>
            <tr>
            <th>Treatment-3</th>
            <td>${treatment3}</td>
            <td>${dosage3}</td>
            </tr>
            <tr>
                <th>Suggestion</th>
                <td colspan="2">${doctorSuggestion}</td>
            </tr>
          </table>
      </div>
      
      
    </body>
  </html>
  
`;

  let createAndSavePDF = async () => {
    const file = await printToFileAsync({
      html: htmlContent,
      base64: false,
    });

    await shareAsync(file.uri);
  };

  // let createAndSavePDF = async (html) => {
  //   try {
  //     const { uri } = await Print.printToFileAsync({ html });
  //     if (Platform.OS === "ios") {
  //       await Sharing.shareAsync(uri);
  //     } else {
  //       const permission = await MediaLibrary.requestPermissionsAsync();

  //       if (permission.granted) {
  //         await MediaLibrary.createAssetAsync(uri);
  //         Alert.alert("Success", "PDF saved Successfully in documents", [
  //           { text: "OK" },
  //         ]);
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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
              agee,
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
              doctorSuggestion,
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
                value={agee}
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
            <Icon
              name="email-open-outline"
              color="grey"
              type="material-community"
            />
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
            <Icon
              name="map-marker-radius-outline"
              color="grey"
              type="material-community"
            />
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
            <Icon
              name="account-clock-outline"
              color="grey"
              type="material-community"
            />
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
            <Icon
              name="alert-decagram-outline"
              color="grey"
              type="material-community"
            />
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
            <Icon name="doctor" color="grey" type="material-community" />
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
            <Icon
              name="alarm-light-outline"
              color="grey"
              type="material-community"
            />
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
            <Icon
              name="progress-clock"
              color="grey"
              type="material-community"
            />
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
            <Icon
              name="alarm-light-outline"
              color="grey"
              type="material-community"
            />
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
            <Icon
              name="progress-clock"
              color="grey"
              type="material-community"
            />
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
            <Icon
              name="alarm-light-outline"
              color="grey"
              type="material-community"
            />
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
            <Icon
              name="progress-clock"
              color="grey"
              type="material-community"
            />
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
          <Button
            onPress={() => {
              navigation.navigate("newVisit1", {
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
              });
            }}
            icon="account-plus-outline"
            mode="contained"
            style={styles.button}
          >
            Repeat Visit
          </Button>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => createAndSavePDF(htmlContent)}
          >
            <Text style={styles.pdf}>Generate PDF</Text>
          </TouchableOpacity>
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
    height: "75%",
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
  emailHead: {
    flexDirection: "row",
    alignItems: "center",
  },
  emaill: {
    marginLeft: 5,
    color: "grey",
  },
  treatment: {
    marginLeft: 5,
    color: "red",
  },
  button: {
    width: "55%",
    // marginLeft: 86,
    padding: 5,
    marginTop: 20,
    marginBottom: 30,
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  button2: {
    padding: 5,
    marginTop: 5,
    marginBottom: 30,
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  pdf: {
    color: "red",
    fontSize: 18,
  },
});

export default patientDetails;
