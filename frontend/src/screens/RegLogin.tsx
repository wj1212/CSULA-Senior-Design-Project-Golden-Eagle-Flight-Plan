import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { COLORS } from "../constants/colors";
import { SPACING } from "../constants/spacing";

export default function RegLogin({ navigation }: any ) {


 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");


 const handleLogin = async () => {

try {
  const res = await fetch("http://localhost:4000/login-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  //parses the server response as JSON.
  //data  holds the object returned from  backend like  message: "Login successful",

  const data = await res.json();
  console.log("Response:", data);


  if (!res.ok) {

                                           
    Alert.alert("Login Failed", data.message);
    return;
  }

  navigation.replace("Main");
} catch (err) {
  console.error("error:", err);
  Alert.alert("Error", "Cannot connect to server");
}
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Your Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />


      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.xl,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: SPACING.xxxl,
    color: COLORS.text,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    backgroundColor: COLORS.background,
  },
  button: {
    backgroundColor: COLORS.buttonPrimaryBackground, // Gold
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xxxl,
    borderRadius: SPACING.sm,
    marginTop: SPACING.md,
    width: "100%",
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.buttonPrimaryText, // Black
    fontWeight: "bold",
    fontSize: 16,
  },
});