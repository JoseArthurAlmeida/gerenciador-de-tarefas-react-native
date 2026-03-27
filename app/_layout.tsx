import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

export default function RootLayout() {
	return (
		<SafeAreaProvider>
			<StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />
			<Stack
				screenOptions={{
					headerTitle: "Minhas Tarefas",
					headerTitleStyle: {
						fontWeight: "bold",
						fontSize: 24,
					},
				}}
				
			/>
		</SafeAreaProvider>
	);
}
