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
import * as firebase from 'firebase'

const searchPatient = ({navigation}) => {
    const win = Dimensions.get("window");
    const [Id, setId] = useState("");
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
                onPress={() => navigation.navigate("patientDetails")}
                icon="account-search"
                mode="contained"
                style={styles.button}
              >
                Search
              </Button>
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
        // left: 50,
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
        // marginTop: 150,
        // backgroundColor:"white",
        elevation: 5,
      },
      card: {
        width: "90%",
        borderRadius: 20,
        position: "absolute",
        top: 200,
        padding: 15,
      },
      button:{
          width:120,
          marginLeft:90,
          padding: 5,
          marginTop:20,
          marginBottom:30,
      }
});

export default searchPatient;