import React from 'react';
import { Field } from 'formik';

const handleChange = (event, field, onChange) => {
  // Formik's `change` event handler.
  field.onChange(event);

  if (onChange) {
    onChange(event);
  }
};

const withField = (Component) => ({
  innerRef,
  onChange,
  name,
  validate,
  ...rest
}) => (
  <Field innerRef={innerRef} name={name} validate={validate}>
    {({ field, form, meta }) => (
      <Component
        {...field}
        {...form}
        {...meta}
        {...rest}
        onChange={(event) => handleChange(event, field, onChange)}
      />
    )}
  </Field>
);

export default withField;
