import { GestureResponderEvent, StyleSheet, Text, Pressable } from "react-native";

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
		<Pressable 
			onPress={props.onPress} 
			style={({ pressed }) => [
				styles.button, 
				{ backgroundColor: color },
				pressed && { opacity: 0.8, transform: [{ scale: 0.97 }] } 
			]}
		>
			<Text style={[styles.text, { color: titleColor }]}>{title}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		padding: 10,
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		fontWeight: "bold",
		fontSize: 16,
	}
});