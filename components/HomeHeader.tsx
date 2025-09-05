import { View, Text, SafeAreaView, StyleSheet } from "react-native";

const HomeHeader = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text style={{ textAlign: "center", marginTop: 10 }}>Teams</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeHeader;
