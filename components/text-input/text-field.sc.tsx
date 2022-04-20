import type { HTMLProps } from 'react';
import styled, { css } from 'styled-components';

import Flex from '../ui/flex';
import FlexColumn from '../ui/flex-column';

export const defaultAccent = '#0c5ce0';

const Body = styled.div`
  margin: 0;
`;

interface ContainerProps {
  error: boolean;
  disabled: boolean;
  outlined: boolean;
  hasFocus: boolean;
}

export const Container = styled(FlexColumn)<ContainerProps>`
  min-height: 48px;
  position: relative;
  margin-bottom: 16px;
  background-color: rgb(244, 246, 248);
  border-bottom: 1px solid rgb(223, 227, 232);
  cursor: text;
  font-size: 14px;
  ${({ error }) =>
    error &&
    css`
      border-bottom-color: red;
    `}
  ${({ outlined }) =>
    outlined &&
    css`
      border: 1px solid gray;
      background-color: transparent;
      border-radius: 2px;

      ${(properties) =>
        (properties as any).hasFocus &&
        css`
          border-color: ${defaultAccent};
        `}
    `}
`;

interface LabelProps {
  isActive: boolean;
  hasFocus: boolean;
  error: boolean;
}

export const Label = styled(Body)<HTMLProps<HTMLLabelElement> & LabelProps>`
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  height: 48px;
  margin-top: 16px;
  transition: all 0.2s ease-in-out;
  left: 12px;
  transform-origin: left top;
  line-height: 1;
  pointer-events: none;
  color: #696969;
  ${({ hasFocus }) =>
    hasFocus &&
    css`
      margin-top: 0;
      color: ${defaultAccent};
    `}
  ${({ error }) =>
    error &&
    css`
      top: 6px;
      transform: translateY(0%) scale(0.8);
      color: red;
    `}
  ${({ isActive }) =>
    isActive &&
    css`
      top: 6px;
      margin-top: 0;
      transform: translateY(5px) scale(0.8);
    `}
`;

interface InputProps {
  isActive: boolean;
  hasLabel: boolean;
}

export const Input = styled.input<HTMLProps<HTMLInputElement> & InputProps>`
  flex: 1;
  background-color: transparent;
  padding: 0;
  margin-bottom: 0;
  outline: none;
  overflow: hidden;
  border: none;
  -webkit-appearance: none;
  margin-left: 12px;
  font-size: 14px;
  margin-top: 18px;
  align-items: center;
  z-index: 1;

  ::placeholder {
    color: #696969;
  }

  /* Hide number wheel */
  &[type='number']::-webkit-outer-spin-button,
  &[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }
  ${({ isActive }) =>
    isActive &&
    css`
      ::placeholder {
        opacity: 1;
      }
    `}
  ${({ hasLabel }) =>
    hasLabel &&
    css`
      margin-top: 24px;

      ::placeholder {
        opacity: 0;
      }
    `}
`;

interface BottomBarProps {
  isActive: boolean;
  accent: string;
}

export const BottomBar = styled(Flex)<
  HTMLProps<HTMLHRElement> & BottomBarProps
>`
  margin-bottom: -2px;
  height: 2px;
  transform: scale(0);
  transition: all 0.2s ease-in-out;
  background-color: ${defaultAccent};
  border-bottom-right-radius: 2px;
  border-bottom-left-radius: 2px;
  overflow: hidden;
  border: none;
  ${({ isActive }) =>
    isActive &&
    css`
      transform: scale(1);
    `}
`;

export const ErrorMessage = styled.div`
  position: fixed;
  padding-top: 52px;
  font-size: 10px;
  padding-left: 12px;
  color: red;
  z-index: 0;
`;
