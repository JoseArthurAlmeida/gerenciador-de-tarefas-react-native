import { Trash2 } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ItemListaProps {
	item: string;
	index: number;
	apagarItem: (index: number) => void;
}

export function ItemLista({ item, index, apagarItem }: ItemListaProps) {
	return (
		<View style={styles.itemLista}>
			<Text style={styles.textoItem}>{item}</Text>

			<TouchableOpacity style={styles.botaoApagar} onPress={() => apagarItem(index)}>
				<Trash2 size={20} color="#ffffff" />
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	itemLista: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "#ffffff",
		padding: 14,
		marginVertical: 6,
		marginHorizontal: 10,
		borderRadius: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 1.41,
		elevation: 2,
	},
	textoItem: {
		fontSize: 16,
		color: "#333333",
		flex: 1,
	},
	botaoApagar: {
		backgroundColor: "#ff4444",
		width: 40,
		height: 40,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 20,
	},
});
