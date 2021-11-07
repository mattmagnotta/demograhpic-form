import React, { useState, createContext } from 'react';
// MUI
import { makeStyles } from '@material-ui/core/styles';
import { Button, FormControl } from '@material-ui/core';
//components
import PersonalDetails from './PersonalDetails';
import Address from './Addresss';
import Programs from './Programs';
import Success from './Sucess';
/* 
This form is a multi-step form. There are 4 seperate components
each representing a page. This form is controlled but two buttons 
in the parent component (this file). When clicked they will update 
the state variable, step. When step is updated this parent 
component knows how to rerender based on that state in the switch 
statement below.

Instead of using props to share data/functions between components, 
useContext is cleaner solution. Each component inside of the 
FormContext.Provider is able to subscribe and use the values passed
into the value object prop. Think of it as global state for the form component.
*/

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

export const FormContext = createContext({});

export const Form = () => {
  const classes = useStyles();

  const [step, setStep] = useState(1);
  const [values, setValues] = useState({
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
    birthday: '',
    ssn: 0,
    residence_address: '',
    res_apt: '',
    permanence: 'Permanent',
    shipping: false,
    shipping_address: '',
    ship_apt: '',
    ship_zipcode: null, // type <number>, issue with place holder displaying 0 instead of 'zip'
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

  const logo =
    'https://wia.toj.mybluehost.me/disclosureswp/wp-content/uploads/2021/07/image-3.png';

  // next button click, on last page turns into submit button
  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else if (step === 3) {
      // submit your post request here
      console.log(values);
      // then do a .then() and put this line in there.
      setStep(4);
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
  // as the arguement to the handle change that you want updated.
  const handleChange = (name) => (e) => {
    const target = name === 'shipping' ? !values.shipping : e.target.value;

    setValues({ ...values, [name]: target });
  };

  return (
    <div className={classes.formContainer}>
      <img
        className={classes.img}
        src={logo}
        width="200rem"
        alt="company logo"
      />

      {/* Main Form */}
      <FormContext.Provider
        value={{ values, step, setValues, setStep, handleChange }}
      >
        <FormControl component="form" autoComplete="on">
          {
            {
              1: <Programs />,
              2: <PersonalDetails />,
              3: <Address />,
              4: <Success />,
            }[step]
          }
        </FormControl>
      </FormContext.Provider>

      {/* Previous and next buttons */}
      {step > 1 && step != 4 && (
        <div>
          <Button onClick={prevStep} className={classes.pagebutton}>
            prev
          </Button>
          <Button className={classes.pagebutton} onClick={nextStep}>
            {step === 3 ? 'Submit' : 'Next'}
          </Button>
        </div>
      )}
    </div>
  );
};
export default Form;
