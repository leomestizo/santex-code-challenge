import React from 'react';
import PropTypes from 'prop-types';

import difficultyLevels from 'constants/difficultyLevels';
import { capitalizeOnlyFirstLetter } from 'utils/string';

import DifficultyLevelItem from './DifficultyLevelItem';
import styles from './difficultyLevelSelector.scss';

const propTypes = {
  selectedLevel: PropTypes.oneOf(difficultyLevels).isRequired,
  onSelectLevel: PropTypes.func,
};

const defaultProps = {
  onSelectLevel: () => {},
};

const renderDifficultyLevelItems = (selectedLevel, onSelectLevel) => (
  difficultyLevels.map((currentDifficultyLevel) => (
    <DifficultyLevelItem
      key={currentDifficultyLevel}
      label={capitalizeOnlyFirstLetter(currentDifficultyLevel)}
      value={currentDifficultyLevel}
      onClick={(difficultyLevel) => onSelectLevel(difficultyLevel)}
      isSelected={selectedLevel === currentDifficultyLevel}
    />
  ))
);

const DifficultyLevelSelector = ({ selectedLevel, onSelectLevel }) => (
  <div className={styles['difficulty-level-selector']}>
    {renderDifficultyLevelItems(selectedLevel, onSelectLevel)}
  </div>
);

DifficultyLevelSelector.propTypes = propTypes;
DifficultyLevelSelector.defaultProps = defaultProps;

export default DifficultyLevelSelector;
