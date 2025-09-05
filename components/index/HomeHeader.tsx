import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

const HomeHeader = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContent}>
        <Text style={styles.title}>Teams</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FA',
  },
  headerContent: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.dark,
    textAlign: 'left',
  },
});

export default HomeHeader;
