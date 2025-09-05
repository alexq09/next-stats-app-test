import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Platform,
  Keyboard,
  InputAccessoryView,
  TouchableOpacity,
  Text,
  useColorScheme,
} from "react-native";
import { Search } from "lucide-react-native";
import Colors from "@/constants/Colors";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = "Search",
}) => {
  const accessoryId = "searchInputAccessory";
  const colorScheme = useColorScheme();
  const accessoryBg = colorScheme === "dark" ? "#1c1c1e" : "#EFEFF4"; // tweak if needed
  return (
    <View style={styles.container}>
      <Search size={20} color={Colors.grey} style={styles.icon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.grey}
        returnKeyType="done"
        blurOnSubmit={true}
        onSubmitEditing={() => Keyboard.dismiss()}
        inputAccessoryViewID={Platform.OS === "ios" ? accessoryId : undefined}
      />
      {Platform.OS === "ios" && (
        <InputAccessoryView nativeID={accessoryId}>
          <View style={[styles.accessory, { backgroundColor: accessoryBg }]}>
            <TouchableOpacity onPress={() => Keyboard.dismiss()}>
              <Text style={styles.accessoryButton}>Done</Text>
            </TouchableOpacity>
          </View>
        </InputAccessoryView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.dark,
  },
  accessory: {
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
    padding: 8,
    alignItems: "flex-end",
  },
  accessoryButton: {
    color: Colors.primary || "#007AFF",
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});

export default SearchBar;
