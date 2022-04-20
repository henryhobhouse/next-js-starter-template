import { check } from 'prettier';
import type {
  ComponentProps,
  DetailedHTMLProps,
  InputHTMLAttributes,
} from 'react';
import { forwardRef } from 'react';

import { Input, InputWrapper, Label, LabelContent } from './radio-input.sc';

export const Radio = forwardRef<
  HTMLInputElement,
  Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'dangerouslySetInnerHTML' | 'children'
  > & {
    label?: string;
  }
>(({ checked, disabled, name, value, label, ...other }, reference) => {
  return (
    <Label disabled={disabled} htmlFor={String(value)}>
      <InputWrapper isChecked={checked}>
        <Input
          checked={checked}
          name={name}
          id={String(value)}
          type="radio"
          disabled={disabled}
          ref={reference as any}
          value={value}
          {...other}
        />
      </InputWrapper>
      {label && <LabelContent>{label}</LabelContent>}
    </Label>
  );
});

Radio.displayName = 'Radio';

export type RadioProps = ComponentProps<typeof Radio>;
