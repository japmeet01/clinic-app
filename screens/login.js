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


const LoginPage = ({ navigation }) => {
  const win = Dimensions.get("window");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login(){
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      navigation.navigate("Home");
    })
    .catch((error) => {
        Alert.alert("Error", "Enter correct email and password", [
            { text: "OK" },
          ]);
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
        <Text style={styles.heading}>Anil Eye Care Center</Text>
      </View>
      <Card style={styles.card}>
        <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={200}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            mode="outlined"
            style={styles.input}
          />

          <Button
            onPress={() => {
              login();
            }}
            mode="contained"
            style={styles.button}
          >
            Login
          </Button>
          
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


});

export default LoginPage;
