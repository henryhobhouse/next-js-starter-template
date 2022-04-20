/* eslint-disable unicorn/no-thenable */
import type { Dispatch, FC, SetStateAction } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { TextInput } from '../text-input';
import { Button } from '../ui/button';
import { Radio } from '../radio-input';

import {
  BillsForm,
  RadioGroup,
  TextFieldWrapper,
  UsageGroup,
} from './monthly-bills-form.sc';

const schema = yup.object({
  dualFuel: yup.boolean(),
  electricityStandingCharge: yup
    .number()
    .typeError('Standing charge must be a number')
    .positive('must be a positive number - if zero leave empty'),
  electricityRate: yup
    .number()
    .typeError('Rate must be a number')
    .positive('must be a positive number - if zero leave empty'),
  annualElectricityUsage: yup
    .number()
    .typeError('Annual usage must be a number')
    .positive('must be a positive number - if zero leave empty')
    .integer('must be an integer'),
  gasStandingCharge: yup
    .number()
    .when('dualFuel', {
      is: true,
      then: yup
        .number()
        .typeError('Standing charge must be a number')
        .positive('must be a positive number - if zero leave empty'),
    })
    .transform((value, ogValue) => {
      return ogValue === '' ? undefined : value;
    }),
  gasRate: yup
    .number()
    .when('dualFuel', {
      is: true,
      then: yup
        .number()
        .typeError('Gas rate must be a number')
        .positive('must be a positive number - if zero leave empty'),
    })
    .transform((value, ogValue) => {
      return ogValue === '' ? undefined : value;
    }),
  annualGasUsage: yup
    .number()
    .when('dualFuel', {
      is: true,
      then: yup
        .number()
        .typeError('Annual usage must be a number')
        .positive('must be a positive number - if zero leave empty'),
    })
    .transform((value, ogValue) => {
      return ogValue === '' ? undefined : value;
    }),
});

const formDefaultValues = {
  dualFuel: 'false',
  annualGasUsage: '',
  gasRate: '',
  gasStandingCharge: '',
  annualElectricityUsage: '',
  electricityRate: '',
  electricityStandingCharge: '',
} as const;

export interface FormData {
  dualFuel: 'true' | 'false';
  annualGasUsage?: string;
  gasRate?: string;
  gasStandingCharge?: string;
  annualElectricityUsage: string;
  electricityRate: string;
  electricityStandingCharge: string;
}

interface Props {
  onFormSubmit: Dispatch<SetStateAction<FormData | undefined>>;
}

export const MonthlyBillsForm: FC<Props> = ({ onFormSubmit }) => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
    formState: { dirtyFields },
    watch,
    getValues,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: formDefaultValues,
  });

  const showElectricityFields = watch('dualFuel') === 'true';

  useEffect(() => {
    if (!showElectricityFields) {
      resetField('gasRate');
      resetField('annualGasUsage');
      resetField('gasStandingCharge');
    }
  }, [showElectricityFields, resetField]);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <BillsForm onSubmit={handleSubmit((data) => onFormSubmit(data))}>
      <RadioGroup>
        <h4>Dual Fuel:</h4>
        <Radio
          {...register('dualFuel')}
          value="true"
          name="dualFuel"
          label="Yes"
        />
        <Radio
          {...register('dualFuel')}
          value="false"
          name="dualFuel"
          label="No"
        />
      </RadioGroup>
      <UsageGroup>
        <h4>Electricity:</h4>
        <TextFieldWrapper>
          <TextInput
            {...register('electricityStandingCharge')}
            isInvalid={!!errors.electricityStandingCharge}
            isDirty={dirtyFields.electricityStandingCharge}
            errorMessage={errors.electricityStandingCharge?.message}
            label="Electricity standing charge per day in pence"
          />
        </TextFieldWrapper>
        <TextFieldWrapper>
          <TextInput
            {...register('electricityRate')}
            isInvalid={!!errors.electricityRate}
            label="Electricity unit rate in pence per KWH"
            errorMessage={errors.electricityRate?.message}
            isDirty={dirtyFields.electricityRate}
          />
        </TextFieldWrapper>
        <TextFieldWrapper>
          <TextInput
            {...register('annualElectricityUsage')}
            isInvalid={!!errors.annualElectricityUsage}
            label="Electricity annual usage in KWH"
            errorMessage={errors.annualElectricityUsage?.message}
            isDirty={dirtyFields.annualElectricityUsage}
          />
        </TextFieldWrapper>
      </UsageGroup>

      {showElectricityFields && (
        <UsageGroup>
          <h4>Gas:</h4>
          <TextFieldWrapper>
            <TextInput
              {...register('gasStandingCharge', {
                validate: () => {
                  const t = getValues('dualFuel');
                  console.log(t);
                  return t === 'true';
                },
              })}
              isInvalid={!!errors.gasStandingCharge}
              isDirty={dirtyFields.gasStandingCharge}
              errorMessage={errors.gasStandingCharge?.message}
              label="Gas standing charge per day in pence"
            />
          </TextFieldWrapper>
          <TextFieldWrapper>
            <TextInput
              {...register('gasRate')}
              isInvalid={!!errors.gasRate}
              label="Gas unit rate in pence per KWH"
              errorMessage={errors.gasRate?.message}
              isDirty={dirtyFields.gasRate}
            />
          </TextFieldWrapper>
          <TextFieldWrapper>
            <TextInput
              {...register('annualGasUsage')}
              isInvalid={!!errors.annualGasUsage}
              label="Gas annual usage in KWH"
              errorMessage={errors.annualGasUsage?.message}
              isDirty={dirtyFields.annualGasUsage}
            />
          </TextFieldWrapper>
        </UsageGroup>
      )}
      <Button type="submit" color="primary">
        Calculate estimated monthly bills
      </Button>
    </BillsForm>
  );
};
