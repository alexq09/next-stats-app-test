import { AuthProdivder, useAuth } from "@/lib/auth-context";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

function InnerLayout() {
  const { user, isLoadingUser } = useAuth();

  return (
    <Stack>
      <Stack.Protected guard={!!user}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="team/[id]"
          options={{
            headerTitle: "",
            headerTransparent: true,
            headerBackButtonDisplayMode: "generic",
          }}
        />
        <Stack.Screen
          name="game/[id]"
          options={{
            headerTitle: "Game",
            headerTransparent: true,
            headerBackButtonDisplayMode: "generic",
          }}
        />
        <Stack.Screen
          name="roster/[teamId]"
          options={{
            headerTitle: "Roster",
            headerTransparent: false,
            headerBackButtonDisplayMode: "generic",
          }}
        />
        <Stack.Screen
          name="stats/[teamId]"
          options={{
            headerTitle: "Season Statistics",
            headerTransparent: false,
            headerBackButtonDisplayMode: "generic",
          }}
        />
        <Stack.Screen
          name="team-settings/[teamId]"
          options={{
            headerTitle: "Team Settings",
            headerTransparent: false,
            headerBackButtonDisplayMode: "generic",
          }}
        />
      </Stack.Protected>

      <Stack.Protected guard={!user}>
        <Stack.Screen name="auth" options={{ title: "Authentication" }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProdivder>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <SafeAreaProvider>
            <StatusBar />
            <InnerLayout />
          </SafeAreaProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </AuthProdivder>
  );
}
