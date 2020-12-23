//
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { Header } from "react-native-elements";
import * as firebase from "firebase";
export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: "",
      password: "",
    };
  }

  login = async (email, password) => {
    if (email && password) {
      try {
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        if (response) {
          this.props.navigation.navigate("Book");
        }
      } catch (error) {
        switch (error.code) {
          case "auth/user-not-found":
            Alert.alert("user is not valid");
            console.log("doesn't exist");
            break;
          case "auth/invalid-email":
            Alert.alert("enter the correct password");
            console.log("invaild");
            break;
        }
      }
    } else {
      Alert.alert("enter email and password");
    }
  };
  render() {
    return (
      <KeyboardAvoidingView style={{ alignItems: "center", marginTop: 20 }}>
        <Header
          backgroundColor={"pink"}
          centerComponent={{
            text: "Bed Time Stories",
            style: { color: "white", fontSize: 20 },
          }}
        />
        <View>
          <TextInput
            style={styles.loginBox}
            placeholder="abc@example.com"
            keyboardType="email-address"
            onChangeText={(text) => {
              this.setState({
                emailId: text,
              });
            }}
          />

          <TextInput
            style={styles.pass}
            secureTextEntry={true}
            placeholder="enter Password"
            onChangeText={(text) => {
              this.setState({
                password: text,
              });
            }}
          />
        </View>
        <View>
          <TouchableOpacity
            style={{
              height: 30,
              width: 90,
              borderWidth: 1,
              marginTop: 20,
              paddingTop: 5,
              borderRadius: 7,
            }}
            onPress={() => {
              this.login(this.state.emailId, this.state.password);
            }}
          >
            <Text style={{ textAlign: "center" }}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  loginBox: {
    marginTop: 200,
    width: 300,
    height: 40,
    borderWidth: 1.5,
    fontSize: 20,
    margin: 10,
    paddingLeft: 10,
  },
  pass: {
    width: 300,
    height: 40,
    borderWidth: 1.5,
    fontSize: 20,
    margin: 10,
    paddingLeft: 10,
  },
});
