import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity } from "react-native";

type BotaoProps = {
	onPress: ((event: GestureResponderEvent) => void) | undefined;
	title: string;
	color?: string;
	titleColor?: string;
};

export default function Botao(props: BotaoProps) {
	const title = props.title || "Titulo";
	const color = props.color || "#0000aa";
	const titleColor = props.titleColor || "white";

	return (
		<TouchableOpacity onPress={props.onPress} style={[styles.button, { backgroundColor: color }]}>
			<Text style={{ color: titleColor }}>{title}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		padding: 10,
		borderRadius: 5,
	},
});
