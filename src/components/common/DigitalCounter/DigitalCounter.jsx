import React, { memo } from 'react';
import PropTypes from 'prop-types';

import DigitalNumber from './DigitalNumber';
import styles from './digitalCounter.scss';

const propTypes = {
  number: PropTypes.number.isRequired,
};

const addLeadingZeros = (digitArray) => {
  const MAXIMUM_NUMBER_OF_DIGITS = 3;
  const leadingZeros = [];

  for (let i = digitArray.length, j = MAXIMUM_NUMBER_OF_DIGITS; i < j; i++) {
    leadingZeros.push(0);
  }

  return leadingZeros.concat(digitArray);
};

const splitNumberIntoDigits = (number) => {
  const digitArray = [...number + ''].map(Number);

  return addLeadingZeros(digitArray);
};

const renderDigitalNumber = (digit, index) => <DigitalNumber key={index} digit={digit} />;

const DigitalCounter = ({ number }) => {
  const digits = splitNumberIntoDigits(number);

  return (
    <div className={styles['digital-counter']}>
      {digits.map(renderDigitalNumber)}
    </div>
  );
};

DigitalCounter.propTypes = propTypes;

export default memo(DigitalCounter);
