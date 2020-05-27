import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import {
  IDLE,
  RUNNING,
  GAME_OVER,
  WON_GAME,
} from 'constants/gameStatus';
import { COVERED, UNCOVERED, FLAGGED } from 'constants/cellStatus';
import { EASY } from 'constants/difficultyLevels';
import { MINE } from 'constants/mine';
import { hasMine, getAdjacentCells, countAdjacentMines } from 'utils/cell';
import {
  getNumberOfRows,
  getNumberOfColumns,
  getRandomRowIndex,
  getRandomColumnIndex,
} from 'utils/board';

import getGameConfigFromLevel from './getGameConfigFromLevel';

const initialState = {
  currentCell: null,
  difficultyLevel: EASY,
  ellapsedTime: 0,
  gameBoard: [],
  gameStatus: IDLE,
  numberOfColumns: 0,
  numberOfMines: 0,
  numberOfRows: 0,
};

const generateRandomMineLocations = (numberOfRows, numberOfColumns, numberOfMines) => {
  const dictionary = {};
  let counter = 0;

  while (counter < numberOfMines) {
    const randomRowIndex = getRandomRowIndex(numberOfRows);
    const randomColumnIndex = getRandomColumnIndex(numberOfColumns);

    if (!dictionary[randomRowIndex]) {
      dictionary[randomRowIndex] = {};
    }

    if (!dictionary[randomRowIndex][randomColumnIndex]) {
      dictionary[randomRowIndex][randomColumnIndex] = MINE;
      counter++;
    }
  }

  return dictionary;
};

const createGameBoard = (numberOfRows, numberOfColumns, numberOfMines) => {
  const gameBoard = [];
  const mineLocations = generateRandomMineLocations(numberOfRows, numberOfColumns, numberOfMines);

  for (let i = 0; i < numberOfRows; i++) {
    gameBoard[i] = [];

    for (let j = 0; j < numberOfColumns; j++) {
      gameBoard[i][j] = {
        i,
        j,
        id: uuidv4(),
        content: mineLocations[i]
          ? mineLocations[i][j] || null
          : null,
        status: COVERED,
      };
    }
  }

  return gameBoard;
};

const revealMineLocations = (gameBoard) => {
  const numberOfRows = getNumberOfRows(gameBoard);
  const numberOfColumns = getNumberOfColumns(gameBoard);

  for (let i = 0; i < numberOfRows; i++) {
    for (let j = 0; j < numberOfColumns; j++) {
      const currentCell = gameBoard[i][j];

      if (hasMine(currentCell)) {
        currentCell.status = UNCOVERED;
      }
    }
  }
};

const checkIfUserHasWon = (gameBoard) => {
  const numberOfRows = getNumberOfRows(gameBoard);
  const numberOfColumns = getNumberOfColumns(gameBoard);
  const availableMoves = [];

  for (let i = 0; i < numberOfRows; i++) {
    for (let j = 0; j < numberOfColumns; j++) {
      const currentCell = gameBoard[i][j];

      if (!hasMine(currentCell) && currentCell.status === COVERED) {
        availableMoves.push(currentCell);
      }
    }
  }

  // If there are no more movements, the user has won!
  return availableMoves.length === 0;
};

// TODO: Change the name to something more meaningful.
const runGameLogic = (gameBoard, cell) => {
  if (cell.status !== UNCOVERED) {
    const adjacentCells = getAdjacentCells(gameBoard, cell);
    const numberOfAdjacentMines = countAdjacentMines(adjacentCells);

    gameBoard[cell.i][cell.j].status = UNCOVERED;
    gameBoard[cell.i][cell.j].content = numberOfAdjacentMines;

    if (numberOfAdjacentMines === 0) {
      adjacentCells.forEach((adjacentCell) => {
        runGameLogic(gameBoard, adjacentCell);
      });
    }
  }
};

// ================================================================================================
// Reducers
// ================================================================================================
const initialize = (state, action) => {
  const { difficultyLevel } = action.payload;
  const { numberOfRows, numberOfColumns, numberOfMines } = getGameConfigFromLevel(difficultyLevel);

  state.difficultyLevel = difficultyLevel;
  state.gameBoard = createGameBoard(numberOfRows, numberOfColumns, numberOfMines);
  state.numberOfColumns = numberOfColumns;
  state.numberOfMines = numberOfMines;
  state.numberOfRows = numberOfRows;
};

const updateGameBoard = (state, action) => {
  const { numberOfRows, numberOfColumns, numberOfMines } = action.payload;

  state.gameBoard = createGameBoard(numberOfRows, numberOfColumns, numberOfMines);
  state.numberOfColumns = numberOfColumns;
  state.numberOfMines = numberOfMines;
  state.numberOfRows = numberOfRows;
};

const clickCell = (state, action) => {
  const { cell } = action.payload;

  state.currentCell = cell;

  if (hasMine(cell)) {
    state.gameStatus = GAME_OVER;
    revealMineLocations(state.gameBoard);
  } else {
    if (state.gameStatus !== RUNNING) {
      state.gameStatus = RUNNING;
    }

    runGameLogic(state.gameBoard, cell);
  }

  if (checkIfUserHasWon(state.gameBoard)) {
    state.gameStatus = WON_GAME;
  }
};

const setDifficultyLevel = (state, action) => {
  const { difficultyLevel } = action.payload;

  state.difficultyLevel = difficultyLevel;
};

const toggleFlaggedCell = (state, action) => {
  const { cell } = action.payload;

  if (state.gameStatus !== RUNNING) {
    state.gameStatus = RUNNING;
  }

  if (cell.status === COVERED && state.numberOfMines > 0) {
    state.gameBoard[cell.i][cell.j].status = FLAGGED;
    state.numberOfMines--;
  } else if (cell.status === FLAGGED) {
    state.gameBoard[cell.i][cell.j].status = COVERED;
    state.numberOfMines++;
  }
};

const increaseTime = (state) => {
  state.ellapsedTime++;
};

const resetGame = (state) => {
  const {
    numberOfRows,
    numberOfColumns,
    numberOfMines,
  } = getGameConfigFromLevel(state.difficultyLevel);

  state.currentCell = null;
  state.ellapsedTime = 0;
  state.gameBoard = createGameBoard(numberOfRows, numberOfColumns, numberOfMines);
  state.gameStatus = IDLE;
  state.numberOfMines = numberOfMines;
  state.numberOfRows = numberOfRows;
  state.numberOfColumns = numberOfColumns;
};

const slice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    initialize,
    clickCell,
    toggleFlaggedCell,
    increaseTime,
    resetGame,
    updateGameBoard,
    setDifficultyLevel,
  },
});

export const { actions, reducer } = slice;

export default slice;
