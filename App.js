import * as Font from "expo-font";
import { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Task from "./components/Task";

//Fonction de hargement des polices
async function loadFonts() {
  await Font.loadAsync({
    "NotoSans-Black": require("./assets/fonts/NotoSans-Black.ttf"),
    "NotoSans-Bold": require("./assets/fonts/NotoSans-Bold.ttf"),
  });
}

export default function App() {
  //Appel de la fonction de chargement des polices
  useEffect(() => {
    loadFonts();
  }, []);

  const [task, setTask] = useState(""); //Tâche
  const [taskItems, setTaskItems] = useState([]); //Liste de tâches

  //Fonction d'ajout de tâche
  const addTask = () => {
    Keyboard.dismiss(); //Fermeture du clavier après ajout
    setTaskItems([...taskItems, task]); //Agrandit la liste de tâches pour y ajouter la tâche
    setTask(null); //Vide le champ d'ajout de tâche
  };

  //Fonction de tâche terminée
  const completedTask = (index) => {
    let itemsCopy = [...taskItems]; //Sauvegarde du tableau
    itemsCopy.splice(index, 1); //Supprime la tâche terminée
    setTaskItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      {/* {Tâche du jour} */}
      <View style={styles.tasks}>
        <Text style={styles.textTitle}>Tâches du jour</Text>

        <View style={styles.items}>
          {/* {Liste des tâches} */}
          {taskItems.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => completedTask(index)}
              >
                <Task text={item} />
              </TouchableOpacity>
            );
          })}
          {}
        </View>
      </View>
      {/* {Ecriture de tâche} */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTasks}
      >
        <TextInput
          style={styles.input}
          placeholder="What's the task ? 😊"
          placeholderTextColor="#FFF"
          value={task}
          onChangeText={(text) => setTask(text)}
        ></TextInput>
        <TouchableOpacity onPress={() => addTask()}>
          <View style={styles.addTask}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DAEFB3",
  },
  tasks: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  textTitle: {
    // fontFamily: "NotoSans-Black",
    fontSize: 24,
    color: "#4B6615",
  },
  items: {
    marginTop: 30,
  },
  writeTasks: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    // fontFamily: "NotoSans-Bold",
    fontSize: 16,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#70981F",
    opacity: 0.8,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: "#70981F",
    color: "#FFF",
    width: 250,
  },
  addTask: {
    width: 60,
    height: 60,
    backgroundColor: "#C16200",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  addText: {
    color: "#FFF",
    fontSize: 30,
  },
});
