import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import Button from "./components/Button";
import Keyboard, { SpecialKeyboardKeys } from "./components/Keyboard";
import TextBlock, { TextBlockState } from "./components/TextBlock";
import { MAX_GUESSES, MAX_WORD_LEN } from "./constants/gameConstants";
import { getInitialBoard, getRandomNumber, getWordleEmoji } from "./gameUtils";

const BOARD_TEMPLATE = getInitialBoard();

const GameScreen = (props) => {
  const [guessList, setGuessList] = useState<string[]>([]);
  const [inputWord, setInputWord] = useState<string>("");
  const [gameOver, setGameOver] = useState<boolean>(false);
  const resultado = props.newprop;

  const wordToGuess = useRef<string>("xxxx");

  useEffect(() => {
    if (gameOver === false) {
      wordToGuess.current = getRandomNumber(resultado.itemId);
      setInputWord("");
      setGuessList([]);
    }
  }, [gameOver]);

  useEffect(() => {
    const guessLen = guessList.length;
    if (guessList[guessLen - 1] === wordToGuess.current) {
      setGameOver(true);
    } else if (guessLen === MAX_GUESSES) {
      setGameOver(true);
    }
  }, [guessList]);

  useEffect(() => {
    const list: string[] = [];

    guessList.forEach((word) => {
      word.split("").forEach((letter) => {
        if (!wordToGuess.current.includes(letter)) {
          list.push(letter);
        }
      });
    });
  }, [guessList]);

  const onKeyPress = useCallback(
    (key: string) => {
      if (key === SpecialKeyboardKeys.DELETE) {
        setInputWord((prev) => prev.slice(0, -1));
      } else if (key === SpecialKeyboardKeys.GUESS) {
        setGuessList((prev) => [...prev, inputWord.toUpperCase()]);
        setInputWord("");
      } else if (key.length === 1) {
        setInputWord((prev) => {
          if (prev.length < MAX_WORD_LEN) {
            return prev + key;
          }

          return prev;
        });
      }
    },
    [, inputWord]
  );

  const wordleEmoji: string = useMemo(() => {
    if (!gameOver) {
      return "";
    }

    return getWordleEmoji(wordToGuess.current, guessList);
  }, [gameOver, guessList]);

  return (
    <View style={styles.fg1}>
      {BOARD_TEMPLATE.map((row, rowIndex) => {
        return (
          <View key={`row-${rowIndex}`} style={styles.row}>
            {row.map((_, colIndex) => {
              const guessLetter = guessList[rowIndex]?.[colIndex];
              let state: TextBlockState = TextBlockState.GUESS;

              if (guessLetter === undefined) {
                state = TextBlockState.GUESS;
              } else if (guessLetter === wordToGuess.current[colIndex]) {
                state = TextBlockState.CORRECT;
              } else if (wordToGuess.current.includes(guessLetter)) {
                state = TextBlockState.POSSIBLE;
              } else {
                state = TextBlockState.INCORRECT;
              }

              const letterToShow =
                rowIndex === guessList.length
                  ? inputWord[colIndex]
                  : guessLetter;

              return (
                <View style={styles.mh2} key={`col-${colIndex}`}>
                  <TextBlock text={letterToShow || ""} state={state} />
                </View>
              );
            })}
          </View>
        );
      })}

      <View style={styles.bottomContainer}>
        {gameOver ? (
          <>
            <Text style={[styles.textWhite, styles.mb12]}>Game Over!</Text>
            <Text style={[styles.textWhite, styles.mb12]}>
              The number was : {wordToGuess.current}
            </Text>

            <Text style={styles.textWhite} selectable>
              {wordleEmoji}
            </Text>

            <View style={styles.buttonRow}>
              <View style={styles.buttonSpacer} />
              <Button cta="Play Again" onPress={() => setGameOver(false)} />
            </View>
          </>
        ) : (
          <Keyboard
            disabledKeyList={[
              inputWord.length !== MAX_WORD_LEN
                ? SpecialKeyboardKeys.GUESS
                : "",
            ]}
            onKeyPress={onKeyPress}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mb12: {
    marginBottom: 12,
  },
  mh2: {
    marginHorizontal: 2,
  },
  fg1: {
    flexGrow: 1,
  },
  textWhite: {
    color: "#fff",
    fontSize: 22,
  },
  row: {
    marginBottom: 4,
    flexDirection: "row",
    justifyContent: "center",
  },
  bottomContainer: {
    flexGrow: 1,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  score: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: "row",
  },
  buttonSpacer: {
    width: 12,
  },
});

export default GameScreen;
