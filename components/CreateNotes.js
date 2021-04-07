import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from "@ui-kitten/components"
import { useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import { Dimensions, KeyboardAvoidingView, StyleSheet, TextInput, View } from "react-native"

export default function CreateNote() {
	const [ note, setNote ] = useState("")
	const navigation = useNavigation()

	const saveNote = async () => {
		const value = await AsyncStorage.getItem("NOTES")
		const n = value ? JSON.parse(value) : []
		n.push(note)
		await AsyncStorage.setItem("NOTES", JSON.stringify(n)).then(() => navigation.navigate("Home"))
		setNote("")
	}

	return (
		<View style={styles.container}>
			<Button style={StyleSheet.button} appearance="filled" onPress={saveNote}>Create Note</Button>
			<TextInput
				value={note}
				onChangeText={setNote}
				style={{ color: "#fff", fontSize: 22 }}
				multiline={true}
				autoFocus
				selectionColor="#fff"
			/>

			<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.bottom}>

			</KeyboardAvoidingView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#222B45",
		color: "white",
		padding: 30,
		paddingTop: 80,

		width: Dimensions.get("window").width
	},
	bottom: {
		flex: 1,
		justifyContent: "flex-end",
		marginBottom: 36
	},
	button: {
		marginBottom: 30
	}
})