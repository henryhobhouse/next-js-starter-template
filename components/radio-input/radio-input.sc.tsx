import type { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

export const Label = styled.label<
  DetailedHTMLProps<InputHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>
>`
  align-items: center;
  user-select: none;
  cursor: pointer;
  display: flex;
  margin-bottom: 1rem;
  font-size: 1rem;
  width: fit-content;
  margin-left: 0.5rem;

  &:disabled {
    opacity: 0.75;
    cursor: not-allowed;
  }
`;

export const InputWrapper = styled.div<{ isChecked?: boolean }>`
  cursor: pointer;
  position: relative;
  background-color: white;
  border: 0.25rem;
  border-color: gray;
  width: 1.15rem;
  height: 1.15rem;
  border-radius: 100%;
  flex-shrink: 0;
  transition: all 0.1s ease-in;
  &:hover {
    border-color: lightgray;
    box-shadow: 0 2px 4px rgba(223, 227, 232, 0.5);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  ${({ isChecked }) =>
    isChecked &&
    css`
      border-width: 1.1rem;
      border-color: #0c5ce0;
      &:hover {
        border-color: #0c5ce0;
      },
  `}
`;

export const LabelContent = styled.div`
  margin-left: 0.4rem;
`;

export const Input = styled.input<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
>`
  cursor: pointer;
  width: 80%;
  height: 80%;
  font: inherit;
  color: currentColor;
  border: 0.15em solid currentColor;
  border-radius: 50%;
  transform: translateY(-0.15rem);

  &:disabled {
    cursor: not-allowed;
  }
`;
