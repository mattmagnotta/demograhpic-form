import React, { useState } from 'react';
// MUI
import { makeStyles } from '@material-ui/core/styles';
import { Button, FormControl } from '@material-ui/core';
//components
import PersonalDetails from './PersonalDetails';
import Address from './Addresss';
import Programs from './Programs';

/* 
This form is a multi-step form. There are three seperate components
each representing a page. This form is controlled but two buttons in the parent
component (this file). When clicked they will update the state variable, step.
When step is updated it this parent component knows how to rerender based on that state
*/

const img =
  'https://wia.toj.mybluehost.me/disclosureswp/wp-content/uploads/2021/07/image-3.png';

const useStyles = makeStyles((theme) => {
  return {
    formContainer: {
      position: 'absolute',
      top: '1rem',
      left: '50%',
      transform: 'translate(-50%,0%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem',
      width: '80vw',
      maxWidth: '90rem',
      background: '#fff',
      borderRadius: '15px',
      border: `solid 1px ${theme.palette.grey[400]}`,

      [theme.breakpoints.up('sm')]: {
        top: '5rem',
      },
    },
    pagebutton: {
      background: theme.palette.grey[300],
      width: '10rem',
      margin: '1rem',
    },
    img: {
      margin: '2rem',
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

  // next button click
  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else if (step === 3) {
      // submit your post request here
      console.log(values);
    }
  };
  // prev button click
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // a change fxn to pass to each input that knows how to dynamically
  // update its respected key in the values object. Simply pass the the key
  // as the arguement that you want updated.
  const handleChange = (name) => (e) => {
    // if checkbox for shipping address is clicked, flip the value of shipping
    // otherwise set the value to the input value
    const target = name === 'shipping' ? !values.shipping : e.target.value;

    // copies old values, and gets the key that is equal to the name
    // and sets the value to input value
    setValues({ ...values, [name]: target });
  };

  return (
    <div className={classes.formContainer}>
      <img className={classes.img} src={img} width="200rem" />

      {/* Main Form */}
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
            ),
          }[step]
        }
      </FormControl>

      {/* Previous and next buttons */}
      {step > 1 && (
        <>
          <Button onClick={prevStep} className={classes.pagebutton}>
            prev
          </Button>
          <Button className={classes.pagebutton} onClick={nextStep}>
            {step === 3 ? 'Submit' : 'Next'}
          </Button>
        </>
      )}
    </div>
  );
};
export default Form;
