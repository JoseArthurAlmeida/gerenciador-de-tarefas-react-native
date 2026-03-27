import { ItemLista, Tarefa } from "@/components/ItemLista";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Plus } from "lucide-react-native";
import { useState } from "react";
import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Botao from "../components/Botao";

export default function Index() {
	const [tarefas, setTarefas] = useState<Tarefa[]>([]);
	const [modalVisivel, setModalVisivel] = useState(false);

	const [tarefaEmEdicao, setTarefaEmEdicao] = useState<Tarefa | null>(null);

	const [descricao, setDescricao] = useState("");
	const [prioridade, setPrioridade] = useState("");

	const [dataSelecionada, setDataSelecionada] = useState(new Date());
	const [mostrarDatePicker, setMostrarDatePicker] = useState(false);

	const abrirModalNovo = () => {
		setTarefaEmEdicao(null);
		setDescricao("");
		setPrioridade("");
		setDataSelecionada(new Date());
		setModalVisivel(true);
	};

	const abrirModalEdicao = (tarefa: Tarefa) => {
		setTarefaEmEdicao(tarefa);
		setDescricao(tarefa.descricao);
		setPrioridade(tarefa.prioridade.toString());

		const [ano, mes, dia] = tarefa.prazo.split("-");
		setDataSelecionada(new Date(Number(ano), Number(mes) - 1, Number(dia)));

		setModalVisivel(true);
	};

	const aoMudarData = (event: any, selectedDate?: Date) => {
		if (Platform.OS === "android") {
			setMostrarDatePicker(false);
		}
		if (selectedDate) {
			setDataSelecionada(selectedDate);
		}
	};

	const salvarTarefa = () => {
		if (!descricao || !prioridade) {
			alert("Preencha a descrição e a prioridade!");
			return;
		}

		const numPrioridade = parseInt(prioridade);
		if (numPrioridade < 1 || numPrioridade > 5) {
			alert("A prioridade deve ser um número de 1 a 5.");
			return;
		}

		const prazoFormatado = dataSelecionada.toISOString().split("T")[0];

		if (tarefaEmEdicao) {
			setTarefas(
				tarefas.map((t) =>
					t.id === tarefaEmEdicao.id ? { ...t, descricao, prioridade: numPrioridade, prazo: prazoFormatado } : t,
				),
			);
		} else {
			const novaTarefa: Tarefa = {
				id: Date.now().toString(),
				descricao,
				prioridade: numPrioridade,
				prazo: prazoFormatado,
			};
			setTarefas([...tarefas, novaTarefa]);
		}

		setModalVisivel(false);
	};

	const apagarTarefa = (id: string) => {
		setTarefas(tarefas.filter((t) => t.id !== id));
	};

	// Ordenação (1º Prazo, 2º Prioridade)
	const tarefasOrdenadas = [...tarefas].sort((a, b) => {
		const dataA = new Date(a.prazo).getTime();
		const dataB = new Date(b.prazo).getTime();
		if (dataA !== dataB) return dataA - dataB;
		return a.prioridade - b.prioridade;
	});

	return (
		<SafeAreaView style={styles.container} edges={['right', 'left', 'bottom']}>
			<View style={styles.header}>
				<Pressable
					style={({ pressed }) => [
						styles.botaoAdicionarLindo,
						pressed && { transform: [{ scale: 0.96 }], opacity: 0.9 },
					]}
					onPress={abrirModalNovo}
				>
					<Plus size={24} color="#fff" />
					<Text style={styles.textoBotaoAdicionar}>Nova Tarefa</Text>
				</Pressable>
			</View>

			<FlatList
				data={tarefasOrdenadas}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<ItemLista
						tarefa={item}
						apagarItem={apagarTarefa}
						editarItem={abrirModalEdicao}
					/>
				)}
				contentContainerStyle={{ paddingBottom: 20 }}
			/>

			<Modal visible={modalVisivel} animationType="slide" transparent={true}>
				<View style={styles.modalBackground}>
					<View style={styles.modalContainer}>
						<Text style={styles.modalTitle}>{tarefaEmEdicao ? "Editar Tarefa" : "Nova Tarefa"}</Text>

						<Text style={styles.label}>Descrição</Text>
						<TextInput
							style={styles.input}
							placeholder="O que você precisa fazer?"
							value={descricao}
							onChangeText={setDescricao}
						/>

						<Text style={styles.label}>Prioridade (1 = Alta, 5 = Baixa)</Text>
						<TextInput
							style={styles.input}
							placeholder="Ex: 1"
							value={prioridade}
							onChangeText={setPrioridade}
							keyboardType="numeric"
							maxLength={1}
						/>

						<Text style={styles.label}>Prazo</Text>
							<TouchableOpacity style={styles.inputData} onPress={() => setMostrarDatePicker(true)}>
							<Text style={styles.textoData}>{dataSelecionada.toLocaleDateString("pt-BR")}</Text>
						</TouchableOpacity>

						{mostrarDatePicker && (
							<DateTimePicker
								value={dataSelecionada}
								mode="date"
								display={Platform.OS === "ios" ? "spinner" : "default"}
								onChange={aoMudarData}
							/>
						)}

						<View style={styles.botoesModal}>
							<TouchableOpacity style={styles.botaoCancelar} onPress={() => setModalVisivel(false)}>
								<Text style={styles.textoCancelar}>Cancelar</Text>
							</TouchableOpacity>
							<Botao title="Salvar" onPress={salvarTarefa} />
						</View>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f0f2f5",
	},
	header: {
		padding: 15,
		paddingBottom: 5,
	},
	botaoAdicionarLindo: {
		flexDirection: "row",
		backgroundColor: "#4285F4",
		paddingVertical: 14,
		paddingHorizontal: 20,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
		shadowColor: "#4285F4",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 5,
		elevation: 6,
		marginBottom: 10,
	},
	textoBotaoAdicionar: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
		marginLeft: 8,
	},
	modalBackground: {
		flex: 1,
		justifyContent: "flex-end",
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	modalContainer: {
		backgroundColor: "#fff",
		padding: 24,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: -2 },
		shadowOpacity: 0.2,
		elevation: 10,
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 20,
		color: "#333",
	},
	label: {
		fontSize: 14,
		color: "#555",
		marginBottom: 6,
		fontWeight: "600",
	},
	input: {
		height: 48,
		borderColor: "#e0e0e0",
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 12,
		marginBottom: 16,
		backgroundColor: "#fafafa",
		fontSize: 16,
	},
	inputData: {
		height: 48,
		borderColor: "#e0e0e0",
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 12,
		marginBottom: 20,
		backgroundColor: "#fafafa",
		justifyContent: "center",
	},
	textoData: {
		fontSize: 16,
		color: "#333",
	},
	botoesModal: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 10,
		paddingBottom: Platform.OS === "ios" ? 20 : 0,
	},
	botaoCancelar: {
		padding: 12,
	},
	textoCancelar: {
		color: "#ff4444",
		fontWeight: "bold",
		fontSize: 16,
	},
});
