import React, { useRef } from 'react';
import styled from 'styled-components';
import { mainColor } from 'styles/colors';

const Div = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: stretch;
  padding-top: 10px;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 4px;
  border: 1px solid ${mainColor} 
`;

const Label = styled.label`
  width: 100%;
`;

const SingleInput = ({
  element, setElement, label, name
}) => {

  const inputRef = useRef();

  const handleChange = (event) => {

    event.preventDefault();
    setElement(inputRef.current.value);

  };

  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <Div>
        <Input
          id={name}
          onChange={handleChange}
          placeholder={element}
          ref={inputRef}
        />
      </Div>
    </>

  );

};

export default SingleInput;
