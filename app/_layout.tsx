import { Stack } from "expo-router";

export default function RootLayout() {
	return (
		<Stack
			screenOptions={{
				headerTitle: "Minhas Tarefas",
				headerTitleStyle: {
					fontWeight: "bold",
					fontSize: 24,
				},
			}}
		/>
	);
}
