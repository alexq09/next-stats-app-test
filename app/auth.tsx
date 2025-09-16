import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const AuthScreen = () => {
  const router = useRouter();
  const { signIn, signUp } = useAuth();
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSwitchMode = () => {
    setIsSignUp((prev) => !prev);
    setError(null);
  };

  const handleAuth = async () => {
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError(null);
    setLoading(true);

    let resultError: string | null = null;
    if (isSignUp) {
      resultError = await signUp(email, password);
    } else {
      resultError = await signIn(email, password);
    }

    setLoading(false);

    if (resultError) {
      setError(resultError);
      return;
    }

    router.replace("/");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { fontSize: 24, fontWeight: "600" }]}>
          {isSignUp ? "Create account" : "Sign in"}
        </Text>

        {error ? (
          <Text style={{ color: "red", marginBottom: 12 }}>{error}</Text>
        ) : null}

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          editable={!loading}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          editable={!loading}
        />

        <Button
          title={
            loading ? "Please wait…" : isSignUp ? "Create account" : "Sign in"
          }
          onPress={handleAuth}
          disabled={loading}
        />

        <TouchableOpacity
          style={styles.switchModeButton}
          onPress={handleSwitchMode}
          disabled={loading}
        >
          <Text style={{ textAlign: "center", color: "#007AFF" }}>
            {isSignUp
              ? "Already have an account? Sign in"
              : "Don't have an account? Sign up"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  button: {
    marginTop: 8,
  },
  switchModeButton: {
    marginTop: 16,
  },
});
