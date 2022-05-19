import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface KeyboardProps {
  onKeyPress(char: string): void;
  disabledKeyList: string[];
}

export enum SpecialKeyboardKeys {
  DELETE = "⌫",
  GUESS = "↩",
}

const keySequence: string[][] = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  [SpecialKeyboardKeys.DELETE, "0", SpecialKeyboardKeys.GUESS],
];

const Keyboard = (props: KeyboardProps) => {
  const { onKeyPress, disabledKeyList } = props;

  return (
    <>
      {keySequence.map((row, rowIndex) => {
        return (
          <View key={"key-row-" + rowIndex} style={styles.row}>
            {row.map((key) => {
              const isDisabled = disabledKeyList.includes(key);
              return (
                <Pressable
                  key={key}
                  disabled={isDisabled}
                  onPress={() => onKeyPress(key)}
                >
                  <View
                    style={[styles.cell, isDisabled && styles.cellDisabled]}
                  >
                    <Text
                      style={[styles.text, isDisabled && styles.textDisabled]}
                    >
                      {key}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  cell: {
    padding: 5,
    paddingHorizontal: 8,
    margin: 4,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "white",
  },
  cellDisabled: {
    borderColor: "grey",
  },
  text: {
    color: "white",
    fontSize: 20,
    margin: 10,
  },
  textDisabled: {
    color: "grey",
  },
});

export default Keyboard;
