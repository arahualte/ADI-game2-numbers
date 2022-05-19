import * as React from "react";
import { View, Text, Button, SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TextInput } from "react-native-gesture-handler";
import { RadioButton } from "react-native-paper";
import ScreenHeader from "./src/components/ScreenHeader";
import GameScreen from "./src/GameScreen";
import { colors } from "./src/constants/gameConstants";

function Main({ navigation }) {
  const [nombre, setNombre] = React.useState("Player");
  const [value, setValue] = React.useState("noRepeat");

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.black,
      }}
    >
      <ScreenHeader />
      <TextInput
        style={styles.textInput}
        color="#FFF"
        placeholderTextColor="#FFF"
        placeholder="Ingrese su nombre"
        onChangeText={(text) => setNombre(text)}
      ></TextInput>

      <RadioButton.Group
        onValueChange={(value) => setValue(value)}
        value={value}
      >
        <RadioButton.Item
          label="Sin Repetición"
          value="noRepeat"
          uncheckedColor="#FFF"
          labelStyle={styles.radioBtnLabel}
        />
        <RadioButton.Item
          label="Con Repetición"
          value="repeat"
          uncheckedColor="#FFF"
          labelStyle={styles.radioBtnLabel}
        />
      </RadioButton.Group>
      <Button
        title="Comenzar"
        color="#4AA16F"
        onPress={() => {
          navigation.navigate("Secundaria", {
            itemId: value,
            otherParam: "Bienvenido " + nombre,
          });
        }}
      />
    </View>
  );
}

function Secundaria({ route, navigation }) {
  const { itemId } = route.params;
  const { otherParam } = route.params;

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.textWelcome}>{JSON.stringify(otherParam)}</Text>
        <GameScreen newprop={route.params} />
      </SafeAreaView>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Secundaria"
          component={Secundaria}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },

  textInput: {
    textAlign: "center",
    margin: 30,
    borderColor: "#4AA16F",
    borderWidth: 2,
    width: 200,
  },

  textWelcome: {
    marginTop: 60,
    marginBottom: 20,
    fontSize: 20,
    color: colors.lightgrey,
    textAlign: "center",
  },

  radioBtnLabel: {
    fontSize: 15,
    color: colors.lightgrey,
    margin: 20,
  },
});
