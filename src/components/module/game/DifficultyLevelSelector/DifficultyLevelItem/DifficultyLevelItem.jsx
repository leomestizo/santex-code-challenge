import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './difficultyLevelItem.scss';

const propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
};

const defaultProps = {
  isSelected: false,
};

const getDifficultyLevelItemClasses = (isSelected) => classnames(styles['difficulty-level-item'], {
  [styles.selected]: isSelected,
});

const DifficultyLevelItem = ({
  label,
  value,
  onClick,
  isSelected,
}) => (
  <span
    className={getDifficultyLevelItemClasses(isSelected)}
    onClick={() => onClick(value)}
  >
    {label}
  </span>
);

DifficultyLevelItem.propTypes = propTypes;
DifficultyLevelItem.defaultProps = defaultProps;

export default DifficultyLevelItem;
