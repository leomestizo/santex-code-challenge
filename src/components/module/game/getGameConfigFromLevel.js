import * as difficultyLevels from 'constants/difficultyLevels';

const configMapper = {
  [difficultyLevels.EASY]: {
    numberOfRows: 9,
    numberOfColumns: 9,
    numberOfMines: 10,
  },
  [difficultyLevels.NORMAL]: {
    numberOfRows: 16,
    numberOfColumns: 16,
    numberOfMines: 40,
  },
  [difficultyLevels.HARD]: {
    numberOfRows: 16,
    numberOfColumns: 30,
    numberOfMines: 99,
  },
  [difficultyLevels.CUSTOM]: {
    numberOfRows: 9,
    numberOfColumns: 9,
    numberOfMines: 10,
  },
};

const getGameConfigFromLevel = (level) => configMapper[level];

export default getGameConfigFromLevel;
