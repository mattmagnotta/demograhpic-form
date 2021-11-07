import React, { useEffect, useState } from 'react';
// MUI
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, TextField, Button, FormControl } from '@material-ui/core';
//components
import PersonalDetails from './PersonalDetails';
import Address from './Addresss';
import Programs from './Programs';

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
    pagebutton: {
      background: theme.palette.grey[300],
      width: '10rem',
      margin: '1rem',
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
      {
        Code: '135PEBB',
        Description: '135% of Federal Poverty Guidelines',
      },
      {
        Code: 'MCAIDEBB',
        Description: 'Medicaid',
      },
      {
        Code: 'SLEBB',
        Description:
          'Free and Reduced Price School Lunch Program or School Breakfast Program for EBB only',
      },
      {
        Code: 'FPHAEBB',
        Description: 'Federal Public Housing Assistance (FPHA)',
      },
      {
        Code: 'SNAPEBB',
        Description:
          'Supplemental Nutrition Assistance Program (SNAP/Food Stamps)',
      },
      {
        Code: 'SSIEBB',
        Description: 'Supplemental Security Income (SSI)',
      },
      {
        Code: 'VSDPEBB',
        Description: 'Veterans Pension and Survivors Benefit Programs',
      },
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

    setValues({ ...values, [name]: target });
  };

  const handleSubmit = (e) => {
    // do you post request here
    console.log(values);
  };

  useEffect(() => {
    console.log(values);
  }, [values]);
  return (
    <div className={classes.formContainer}>
      <FormControl component="form" autoComplete="on">
        {
          {
            1: (
              <Programs
                programs={values.programs}
                step={step}
                setStep={setStep}
                setValues={setValues}
                values={values}
              />
            ),
            2: <PersonalDetails handleChange={handleChange} />,
            3: (
              <Address handleChange={handleChange} shipping={values.shipping} />
            ), // prettier is messing up this formatting, just know I know. MM
          }[step]
        }
      </FormControl>

      <div>
        {step > 1 && (
          <>
            <Button onClick={prevStep} className={classes.pagebutton}>
              {' '}
              prev{' '}
            </Button>
            <Button
              className={classes.pagebutton}
              onClick={step === 3 ? handleSubmit : nextStep}
            >
              {step === 3 ? 'Submit' : 'Next'}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
export default Form;
