import React, { useEffect, useState } from 'react';
// MUI
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, TextField, Button, FormControl } from '@material-ui/core';
// utils
// import classNames from 'classnames';
import useInputValue from 'use-input-value';
//components
import PersonalDetails from './PersonalDetails';
import Address from './Addresss';

const img =
  'https://wia.toj.mybluehost.me/disclosureswp/wp-content/uploads/2021/07/image-3.png';
const useStyles = makeStyles((theme) => {
  return {
    formContainer: {
      position: 'absolute',
      top: '10rem',
      left: '50%',
      transform: 'translate(-50%,0%)',
      padding: '2rem',
      width: '80vw',
      maxWidth: '90rem',
      background: '#fff',
      borderRadius: '15px',
      border: `solid 1px ${theme.palette.grey[400]}`,
    },
  };
});

export const Form = () => {
  const classes = useStyles();

  const [step, setStep] = useState(1);
  const [values, setValues] = useState({
    currentStep: 1, // Default is Step 1
    email: '',
    username: '',
    password: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    second_last_name: '',
    suffix: 'No Suffix',
    dob_month: 0,
    dob_day: 0,
    dob_year: 0,
    ssn: 0,
    residence_address: '',
    res_apt: '',
    permanence: 'Permanent',
    shipping: false,
    shipping_address: '',
    ship_apt: '',
    ship_zipcode: 0,
    state: '',
    selected_plan: '',
    programs: [
      '135PEBB',
      'MCAIDEBB',
      'SLEBB',
      'FPHAEBB',
      'SNAPPEBB',
      'SSIEBB',
      'VSDPEBB',
      'FPGEBB',
      'SLOIEBB',
      'LIPEBB',
      'SP',
    ],
    program_names: [
      '135% of Federal Poverty Guidelines',
      'Medicaid',
      'Free and Reduced Price School Lunch Program',
      'Federal Public Housing Assistance (FPHA)',
      'Supplemental Nutrition Assistance Program',
      'Supplemental Security Income (SSI)',
      'Veterans Pension and Survivors Benefit Programs',
      'Federal Pell Grant',
      'Substantial loss of income',
      'Existing low-income program/COVID-19 program',
      'Super Poor',
    ],
  });

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else if (step === 3) {
      console.log(values);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleChange = (name) => (e) => {
    const target = name === 'shipping' ? !values.shipping : e.target.value;
    console.log({ target });
    setValues({ ...values, [name]: target });
    console.log(values);
  };

  useEffect(() => {
    console.log(values.first_name);
  }, [values.first_name]);

  return (
    <div className={classes.formContainer}>
      <img src={img} />

      <FormControl component="form" autoComplete="on">
        {
          {
            1: <PersonalDetails handleChange={handleChange} />,
            2: (
              <Address handleChange={handleChange} shipping={values.shipping} />
            ),
          }[step]
        }
      </FormControl>

      <div>
        <Button onClick={prevStep}> prev </Button>
        <Button onClick={nextStep}> next </Button>
      </div>
    </div>
  );
};
export default Form;
