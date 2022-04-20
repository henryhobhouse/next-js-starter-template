import type { FC } from 'react';
import { useMemo } from 'react';

import type { MonthlyBills, Bill } from '../../lib/calculate-monthly-bills';
import { calculateMonthlyBills } from '../../lib/calculate-monthly-bills';

import type { FormData } from '../monthly-bills-form';

import { Container } from './monthly-bill-estimates.sc';

interface Props {
  usageData: FormData;
}

type PickedBill = Bill & { month: string };

const getMinMax = (estimatedMonthlyBills: MonthlyBills) => {
  let min: PickedBill = {
    month: '',
    electricityPounds: 0,
    totalPounds: 0,
  };
  let max: PickedBill = {
    month: '',
    electricityPounds: 0,
    totalPounds: 0,
  };

  for (const [month, bill] of Object.entries(estimatedMonthlyBills)) {
    if (bill.totalPounds > max.totalPounds || max.totalPounds === 0) {
      max = {
        month,
        ...bill,
      };
    }
    if (bill.totalPounds < min.totalPounds || min.totalPounds === 0) {
      min = {
        month,
        ...bill,
      };
    }
  }

  return {
    min,
    max,
  };
};

export const MonthBillEstimates: FC<Props> = ({ usageData }) => {
  const minMaxEstimates = useMemo(() => {
    const isDualFuel = Boolean(usageData.dualFuel);
    const estimatedMonthlyBills = calculateMonthlyBills({
      dualFuel: isDualFuel,
      gasUsage: isDualFuel
        ? {
            standingChargePence: usageData.gasStandingCharge,
            unitRate: usageData.gasRate,
            annualConsumption: usageData.annualGasUsage,
          }
        : undefined,
      electricityUsage: {
        standingChargePence: usageData.electricityStandingCharge,
        unitRate: usageData.electricityRate,
        annualConsumption: usageData.annualElectricityUsage,
      },
    });
    return getMinMax(estimatedMonthlyBills);
  }, [usageData]);

  return (
    <Container>
      <div>
        <h3>Estimated max bill</h3>
        <p>
          <strong>Month:</strong> {minMaxEstimates.max.month}
        </p>
        <p>
          <strong>Electricity:</strong>
          {' £'}
          {minMaxEstimates.max.electricityPounds.toFixed(2)}
        </p>
        {minMaxEstimates.max.gasPounds && (
          <p>
            <strong>Gas:</strong> £{minMaxEstimates.max.gasPounds.toFixed(2)}
          </p>
        )}
        <p>
          <strong>Total:</strong> £{minMaxEstimates.max.totalPounds.toFixed(2)}
        </p>
      </div>
      <div>
        <h3>Estimated min bill</h3>
        <p>
          <strong>Month:</strong> {minMaxEstimates.min.month}
        </p>
        <p>
          <strong>Electricity:</strong>
          {' £'}
          {minMaxEstimates.min.electricityPounds.toFixed(2)}
        </p>
        {minMaxEstimates.min.gasPounds && (
          <p>
            <strong>Gas:</strong> £{minMaxEstimates.min.gasPounds.toFixed(2)}
          </p>
        )}
        <p>
          <strong>Total:</strong> £{minMaxEstimates.min.totalPounds.toFixed(2)}
        </p>
      </div>
    </Container>
  );
};
