import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

type LoginData = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginData>({ email: "", password: "" });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={loginData.email}
        onChangeText={(text) => setLoginData((prev) => ({ ...prev, email: text }))}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={loginData.password}
        onChangeText={(text) => setLoginData((prev) => ({ ...prev, password: text }))}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { backgroundColor: "white", padding: 12, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: "#ddd" },
  button: { backgroundColor: "#1e3d59", padding: 15, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "white", fontWeight: "bold" },
});

export default LoginPage;
