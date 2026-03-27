import { Trash2, Pencil } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";

export interface Tarefa {
    id: string;
    descricao: string;
    prioridade: number;
    prazo: string;
}

interface ItemListaProps {
    tarefa: Tarefa;
    apagarItem: (id: string) => void;
    editarItem: (tarefa: Tarefa) => void;
}

export function ItemLista({ tarefa, apagarItem, editarItem }: ItemListaProps) {
    const dataFormatada = tarefa.prazo.split("-").reverse().join("/");

    const corPrioridade = tarefa.prioridade === 1 ? "#ff4444" : 
                          tarefa.prioridade <= 3 ? "#ffbb33" : "#00C851";

    return (
        <View style={styles.itemLista}>
            <View style={styles.infoContainer}>
                <Text style={styles.textoItem}>{tarefa.descricao}</Text>
                
                <View style={styles.badgesContainer}>
                    <Text style={[styles.badgeTexto, { color: corPrioridade, borderColor: corPrioridade, borderWidth: 1 }]}>
                        Prioridade: {tarefa.prioridade}
                    </Text>
                    <Text style={styles.badgeTexto}>Prazo: {dataFormatada}</Text>
                </View>
            </View>

            <View style={styles.botoesContainer}>
                <Pressable 
                    style={({ pressed }) => [
                        styles.botaoAcao, 
                        styles.botaoEditar,
                        pressed && { opacity: 0.6 }
                    ]} 
                    onPress={() => editarItem(tarefa)}
                >
                    <Pencil size={18} color="#ffffff" />
                </Pressable>

                <Pressable 
                    style={({ pressed }) => [
                        styles.botaoAcao, 
                        styles.botaoApagar,
                        pressed && { opacity: 0.6 }
                    ]} 
                    onPress={() => apagarItem(tarefa.id)}
                >
                    <Trash2 size={18} color="#ffffff" />
                </Pressable>
            </View>
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
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    infoContainer: {
        flex: 1,
        marginRight: 10,
    },
    textoItem: {
        fontSize: 16,
        color: "#333333",
        fontWeight: "bold",
        marginBottom: 8,
    },
    badgesContainer: {
        flexDirection: "row",
        gap: 8,
    },
    badgeTexto: {
        fontSize: 12,
        color: "#555",
        backgroundColor: "#f8f9fa",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        overflow: "hidden",
    },
    botoesContainer: {
        flexDirection: "row",
        gap: 8,
    },
    botaoAcao: {
        width: 36,
        height: 36,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 18,
    },
    botaoEditar: {
        backgroundColor: "#4285F4",
    },
    botaoApagar: {
        backgroundColor: "#ff4444",
    },
});