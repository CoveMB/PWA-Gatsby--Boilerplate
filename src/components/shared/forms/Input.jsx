import React from 'react';
import { ErrorFeedBack, Label } from 'styles/form';
import { useForm } from 'react-hook-form';

const Input = ({
  inputName, label, type, ref, error
}) => (
  <>
    <Label htmlFor={inputName}>{label}</Label>
    <input
      name={inputName}
      type={type}
      ref={ref}
    />
    <ErrorFeedBack>{error && error.message}</ErrorFeedBack>
  </>

);

export default Input;
