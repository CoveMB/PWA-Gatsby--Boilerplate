import React, { useRef } from 'react';
import styled from 'styled-components';
import { button } from 'styles/button';
import { mainColor } from 'styles/colors';

const Div = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: stretch;
`;

const SubmitButton = styled.input`
  ${button}
  margin-left: 6%;
  width: 27%;
`;

const Input = styled.input`
  width: 67%;
  border-radius: 4px;
  border: 1px solid ${mainColor} 
`;

const Label = styled.label`
  width: 100%;
  margin-bottom: 10px;
  display: block
`;

const SingleInputForm = ({
  element, setElement, placeholder, label, name
}) => {

  const inputRef = useRef();

  const handleSubmit = (event) => {

    event.preventDefault();
    setElement(inputRef.current.value);
    event.currentTarget.reset();

  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Label htmlFor={name}>{label}</Label>
        <Div>
          <Input
            id={name}
            name={name}
            placeholder={placeholder}
            ref={inputRef}
          />
          <SubmitButton type="submit" />
        </Div>
      </form>
    </>

  );

};

export default SingleInputForm;
