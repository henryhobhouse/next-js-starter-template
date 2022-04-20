import styled, { css } from 'styled-components';

interface Props {
  color: string;
}

/**
 * Simple button styled for this tech test application
 */
export const Button = styled.button<Props>`
  border-radius: 1px;
  justify-content: center;
  align-content: center;
  justify-items: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  color: white;
  font-weight: 600;
  border: 2px solid #99c47c;
  background-color: #99c47c;
  height: 36px;
  padding: 0 16px;
  font-size: 14px;
  outline: none;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${({ disabled }) =>
    !disabled &&
    css`
      &:hover {
        background-color: #0cac68;
        border-color: #0cac68;
      }

      &:focus {
        background-color: #99c47c;
        border-color: #0cac68;
      }
    `}

  ${({ color, disabled }) =>
    color === 'secondary' &&
    !disabled &&
    css`
      border: 2px solid #99c47c;
      background-color: white;
      color: #0b0e35;
      font-size: 12px;
      font-weight: 600;

      &:hover {
        border-color: #0cac68;
        background-color: white;
      }

      &:focus {
        border-color: #0cac68;
        background-color: white;
      }
    `}
`;
