import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { isEmpty } from 'lodash-es';

import TextBoxField from 'components/common/form/TextBoxField';
import Button from 'components/common/Button';
import { SUBMIT } from 'constants/buttonTypes';

import { actions } from '../slice';

import styles from './customLevelForm.scss';

const propTypes = {
  numberOfMines: PropTypes.number,
  numberOfRows: PropTypes.number,
  numberOfColumns: PropTypes.number,
};

const defaultProps = {
  numberOfMines: 0,
  numberOfRows: 0,
  numberOfColumns: 0,
};

const numberValidator = Yup.number().typeError('Should be a number').required('Required.');

const CustomLevelForm = ({ numberOfMines, numberOfRows, numberOfColumns }) => {
  const dispatch = useDispatch();
  // These variables are only used for validation purposes.
  const [crtNumberOfRows, setCrtNumberOfRows] = useState(numberOfRows);
  const [crtNumberOfColumns, setCrtNumberOfColumns] = useState(numberOfColumns);

  return (
    <div className={styles['custom-level-form']}>
      <Formik
        validateOnMount
        initialValues={{
          numberOfRows,
          numberOfColumns,
          numberOfMines,
        }}
        validationSchema={Yup.object().shape({
          numberOfRows: numberValidator,
          numberOfColumns: numberValidator,
          numberOfMines: numberValidator.lessThan(
            crtNumberOfRows * crtNumberOfColumns,
            'The number of mines cannot be equal or greater than the size of the board',
          ),
        })}
        onSubmit={(values) => dispatch(actions.updateGameBoard({ ...values }))}
      >
        {({ errors, values }) => (
          <Form className={styles.form}>
            <TextBoxField
              className={styles.field}
              name="numberOfRows"
              value={values.numberOfRows}
              onChange={(event) => setCrtNumberOfRows(event.target.value)}
            />
            <TextBoxField
              className={styles.field}
              name="numberOfColumns"
              value={values.numberOfColumns}
              onChange={(event) => setCrtNumberOfColumns(event.target.value)}
            />
            <TextBoxField
              className={styles.field}
              name="numberOfMines"
              value={values.numberOfMines}
            />
            <Button
              className={styles['submit-button']}
              isDisabled={!isEmpty(errors)}
              type={SUBMIT}
            >
              Update
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

CustomLevelForm.propTypes = propTypes;
CustomLevelForm.defaultProps = defaultProps;

export default CustomLevelForm;
