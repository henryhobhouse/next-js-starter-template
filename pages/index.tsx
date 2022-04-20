import type { NextPage } from 'next';
import { useState } from 'react';
import styled from 'styled-components';

import { MonthlyBillsForm } from '../components/monthly-bills-form';
import type { FormData } from '../components/monthly-bills-form';

import Center from '../components/ui/center-top';
import { MonthBillEstimates } from '../components/monthly-bill-estimates';

const PageContainer = styled.div`
  box-sizing: border-box;
  justify-content: center;
  height: 100vh;
`;

const Home: NextPage = () => {
  const [formValues, setFormValues] = useState<FormData>();

  return (
    <PageContainer>
      <Center>
        <MonthlyBillsForm onFormSubmit={setFormValues} />
        {formValues && <MonthBillEstimates usageData={formValues} />}
      </Center>
    </PageContainer>
  );
};

export default Home;
