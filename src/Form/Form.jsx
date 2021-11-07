import React, { useState, createContext, useEffect } from 'react';
// MUI
import { makeStyles } from '@material-ui/core/styles';
import { Button, FormControl } from '@material-ui/core';
//components
import PersonalDetails from './PersonalDetails';
import Address from './Addresss';
import Programs from './Programs';
import Success from './Sucess';
import ErrorPage from './Error';

/* 
This form is a multi-step form. There are 5 seperate components
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
      width: '80vw',
      maxWidth: '90rem',
      padding: '2rem',
      background: '#fff',
      borderRadius: '15px',
      border: `solid 1px ${theme.palette.grey[400]}`,

      [theme.breakpoints.up('sm')]: {
        top: '2rem',
      },
    },

    pagebutton: {
      background: theme.palette.grey[300],
      width: '10rem',
      margin: '1rem',
    },

    img: {
      margin: '2rem',
      width: '15rem',
    },
  };
});
// here is where we create the form context
export const FormContext = createContext({});

export const Form = () => {
  const classes = useStyles();
  // step 4 & 5 are reserved for the error and success page
  // if step is set to either, it will render that page
  const [step, setStep] = useState(1);
  const [programs, setPrograms] = useState([]);
  const [values, setValues] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    second_last_name: '',
    suffix: 'No Suffix',
    birthday: '',
    ssn: null,
    residence_address: '',
    res_apt: '',
    permanence: 'Permanent',
    shipping: false,
    shipping_address: '',
    ship_apt: '',
    ship_zipcode: null, // type <number>, issue with place holder displaying 0 instead of 'zip'
    selected_plan: '',
  });

  const logo =
    'https://wia.toj.mybluehost.me/disclosureswp/wp-content/uploads/2021/07/image-3.png';

  const sendPostValues = () => {
    const url = 'https://webhook.site/1fc1aed3-615d-434e-9717-1b2db79d536c';

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(values),
    })
      .then(function (data) {
        //step 4 shows success page
        setStep(4);
        console.log('Request success: ', data);
      })
      .catch(function (error) {
        // step 5 shows error page
        setStep(5);
      });
  };

  // next button click, on page 3 turns into submit button
  const nextStep = () => {};
  // if (step < 3) {
  //   setStep(step + 1);
  // } else if (step === 3) {
  //   // *** submit your post request here ***

  //   // setStep(4);
  //   sendPostValues();
  // }
  // };

  // prev button click
  // const prevStep = () => {
  //   if (step > 1) {
  //     setStep(step - 1);
  //   }
  // };

  // a change fxn to pass to each input that knows how to dynamically
  // update its respected key in the values object. Simply pass the the key
  // as the arguement to the handle change that you want updated.
  const handleChange = (name) => (e) => {
    const target = name === 'shipping' ? !values.shipping : e.target.value;

    setValues({ ...values, [name]: target });
    console.log(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendPostValues(values);
    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
  };

  // refer useEffect docs
  useEffect(() => {
    // make api call to get dynamic programs here

    // then set the programs with the response needs to be an array of objects
    setPrograms([
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
    ]);
  }, []);

  return (
    <div className={classes.formContainer}>
      <img className={classes.img} src={logo} alt="company logo" />

      {/* Main Form */}
      <FormContext.Provider
        value={{
          values,
          step,
          programs,
          setValues,
          setStep,
          handleChange,
          nextStep,
        }}
      >
        <FormControl
          component="form"
          autoComplete="on"
          onSubmit={(e) => handleSubmit(e)}
        >
          {
            {
              1: <Programs />,
              2: <PersonalDetails />,
              3: <Address />,
              4: <Success />,
              5: <ErrorPage />,
            }[step]
          }
          {/* page buttons
          {step > 1 && step !== 4 && step !== 5 && (
            <div>
              <Button onClick={prevStep} className={classes.pagebutton}>
                prev
              </Button>
              <Button
                className={classes.pagebutton}
                onClick={step === 3 ? '' : nextStep}
                // disabled={nextBtnDisabled}
                type="submit"
              >
                {step === 3 ? 'Submit' : 'Next'}
              </Button>
            </div>
          )} */}
        </FormControl>
      </FormContext.Provider>

      {/* reset button on error page */}
      {step === 5 && (
        <Button className={classes.pagebutton} onClick={handleReset}>
          Try again
        </Button>
      )}

      {/* pagination */}
      {step !== 4 && step !== 5 && <p> Page {step} of 3 </p>}
    </div>
  );
};
export default Form;
