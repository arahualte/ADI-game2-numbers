import { MAX_GUESSES } from "./constants/gameConstants";

export const getInitialBoard = (): string[][] => {
  const board: string[][] = [];
  for (let i = 0; i < 10; i++) {
    board.push(new Array(4).fill(""));
  }

  return board;
};

export const getRandomNumber = (itemId): string => {
  var num1 = Math.floor(Math.random() * 9);
  var num2 = Math.floor(Math.random() * 9);
  var num3 = Math.floor(Math.random() * 9);
  var num4 = Math.floor(Math.random() * 9);
  var result = String(num1) + String(num2) + String(num3) + String(num4);
  console.log(itemId);
  console.log(result);
  if (itemId == "repeat") {
    while (num2 == num1) {
      num2 = Math.floor(Math.random() * 9);
    }
    while (num3 == num1 || num3 == num2) {
      num3 = Math.floor(Math.random() * 9);
    }
    while (num4 == num1 || num4 == num2 || num4 == num3) {
      num4 = Math.floor(Math.random() * 9);
    }
  }

  return String(num1) + String(num2) + String(num3) + String(num4);
};

export const getWordleEmoji = (word: string, guessList: string[]): string => {
  const hasWon = guessList[guessList.length - 1] === word;
  let output = `Tries ${hasWon ? guessList.length : "x"}/${MAX_GUESSES}\n\n`;
  return output;
};
