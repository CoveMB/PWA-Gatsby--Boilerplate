import React, { FC } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { mainColor } from 'styles';

const cubeGridScaleDelay = keyframes`
  0%, 70%, 100% {
    transform: scale3D(1, 1, 1);
    transform: scale3D(1, 1, 1);
  } 35% {
    transform: scale3D(0, 0, 1);
    transform: scale3D(0, 0, 1);
  }
`;

const CubeGrid = styled.div`
  width: 40px;
  height: 40px;
  margin: 50px auto;
`;

const cube = css`
  width: 33%;
  height: 33%;
  background-color: ${mainColor};
  float: left;
  animation: ${cubeGridScaleDelay} 1.3s infinite ease-in-out;
`;

const CubeOne = styled.div`
  ${cube}
  animation-delay: 0.2s;
`;

const CubeTwo = styled.div`
  ${cube}
  animation-delay: 0.3s;
`;

const CubeThree = styled.div`
  ${cube}
  animation-delay: 0.4s;
`;

const CubeFour = styled.div`
  ${cube}
  animation-delay: 0.1s;
`;

const CubeFive = styled.div`
  ${cube}
  animation-delay: 0.2s;
`;

const CubeSix = styled.div`
  ${cube}
  animation-delay: 0.3s;
`;

const CubeSeven = styled.div`
  ${cube}
  animation-delay: 0s;
`;

const CubeHeight = styled.div`
  ${cube}
  animation-delay: 0.1s;
`;

const CubeNine = styled.div`
  ${cube}
  animation-delay: 0.2s;
`;

const Loading: FC = () => (
  <CubeGrid>
    <CubeOne />
    <CubeTwo />
    <CubeThree />
    <CubeFour />
    <CubeFive />
    <CubeSix />
    <CubeSeven />
    <CubeHeight />
    <CubeNine />
  </CubeGrid>

);

export default Loading;
