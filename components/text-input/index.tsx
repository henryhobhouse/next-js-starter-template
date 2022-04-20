import type { FocusEvent, InputHTMLAttributes, ReactNode } from 'react';
import React, { useState, forwardRef } from 'react';

import FlexColumn from '../ui/flex-column';

import {
  Container,
  Input,
  Label,
  BottomBar,
  ErrorMessage,
  defaultAccent,
} from './text-field.sc';

export interface FormFieldElementProps {
  label?: string;
  isInvalid?: boolean;
  errorMessage?: string;
  outlined?: boolean;
  type?: string;
  accent?: string;
  children?: ReactNode;
  isDirty?: boolean;
}

type TextInputProps = FormFieldElementProps &
  InputHTMLAttributes<HTMLInputElement>;

/**
 * Styled Text input
 *
 * Includes handling of placeholders, errors (and handling thereof).
 */
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      value,
      placeholder,
      onFocus,
      onBlur,
      isInvalid = false,
      errorMessage,
      disabled = false,
      name,
      type = 'text',
      accent = defaultAccent,
      outlined = false,
      children,
      isDirty,
      ...other
    },
    reference,
  ) => {
    const [hasFocus, setHasFocus] = useState(false);

    const handleOnFocus = (event: FocusEvent<HTMLInputElement>) => {
      onFocus && onFocus(event);
      setHasFocus(true);
    };

    const handleOnBlur = (event: FocusEvent<HTMLInputElement>) => {
      onBlur && onBlur(event);
      setHasFocus(false);
    };

    // Color to use for label and bottom bar when focused
    const accentColor = !isInvalid ? accent : 'red';
    // Conditionals to put in active state
    const isActive =
      hasFocus || (value != undefined && value !== '') || isInvalid || isDirty;

    return (
      <FlexColumn>
        <Container
          error={isInvalid}
          disabled={disabled}
          as="label"
          htmlFor={name}
          outlined={outlined}
          hasFocus={hasFocus}
        >
          <Label isActive={!!isActive} error={!!isInvalid} hasFocus={hasFocus}>
            {label}
          </Label>
          <Input
            isActive={!!isActive}
            value={value}
            type={type}
            placeholder={placeholder}
            hasLabel={!!label}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            id={name}
            name={name}
            disabled={disabled}
            tabIndex={0}
            ref={reference}
            {...other}
          >
            {children}
          </Input>
          {!outlined && (
            <BottomBar accent={accentColor} isActive={hasFocus} as="hr" />
          )}
        </Container>
        {isInvalid && !!errorMessage && (
          <ErrorMessage>{errorMessage}</ErrorMessage>
        )}
      </FlexColumn>
    );
  },
);

TextInput.displayName = 'TextInput';
