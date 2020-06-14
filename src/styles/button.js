import { css } from 'styled-components';
import { mainColor } from './colors';

export const button = css`
  color: white;
  text-decoration: none;
  background: ${mainColor};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  height: 40px;
  cursor: pointer;
`;
