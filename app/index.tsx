import { ItemLista } from "@/components/ItemLista";
import { useState } from "react";
import { FlatList, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Botao from "../components/Botao";

export default function Index() {
	const [tarefa, setTarefa] = useState("");
	const [tarefas, setTarefas] = useState<string[]>([]);

	const salvarTarefa = () => {
		setTarefas([...tarefas, tarefa]);
		setTarefa("");
	};

	const apagarTarefa = (index: number) => {
		setTarefas(tarefas.filter((_, i) => i !== index));
	};
	
	return (
		<SafeAreaView style={styles.container}>
			<View style={{ flexDirection: "row", gap: 10, marginBottom: 15 }}>
				<TextInput style={styles.input} placeholder="Digite uma tarefa" value={tarefa} onChangeText={setTarefa} />
				<Botao title="Adicionar" onPress={salvarTarefa} />
			</View>

			<FlatList data={tarefas} renderItem={({ item, index }) => <ItemLista item={item} index={index} apagarItem={apagarTarefa} />} />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
		backgroundColor: "#fff",
	},
	input: {
		flex: 1,
		height: 40,
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 5,
		padding: 10,
	},
});
