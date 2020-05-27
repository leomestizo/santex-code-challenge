import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './digitalNumber.scss';

const propTypes = {
  digit: PropTypes.number.isRequired,
};

const getDigitalNumberClasses = (digit) => classnames(styles['digital-number'], {
  [styles.zero]: digit === 0,
  [styles.one]: digit === 1,
  [styles.two]: digit === 2,
  [styles.three]: digit === 3,
  [styles.four]: digit === 4,
  [styles.five]: digit === 5,
  [styles.six]: digit === 6,
  [styles.seven]: digit === 7,
  [styles.eight]: digit === 8,
  [styles.nine]: digit === 9,
});

const DigitalNumber = ({ digit }) => (
  <div className={getDigitalNumberClasses(digit)} />
);

DigitalNumber.propTypes = propTypes;

export default DigitalNumber;
