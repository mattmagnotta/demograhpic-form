import React, { useContext, useState } from 'react';
import { FormContext } from './Form';
import { personDetailsValidation } from './Validation';
// MUI
import { makeStyles } from '@material-ui/core/styles';
import { Button, MenuItem, TextField } from '@material-ui/core';
const useStyles = makeStyles(() => {
  return {
    inputItem: {
      width: '90%',
      maxWidth: '30rem',
      margin: '1rem',
    },
  };
});

const PersonalDetails = () => {
  const { values, handleChange, step, setStep } = useContext(FormContext);
  const [errors, setErrors] = useState({});
  const classes = useStyles();

  const handleContinue = (e) => {
    e.preventDefault();
    // every time you click continue it checks for errors.
    // if there are errors it just returns, if there are none
    // sets step + 1
    const errors = personDetailsValidation(values);
    setErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setStep(step + 1);
  };
  return (
    <div>
      <TextField
        onChange={handleChange('first_name')}
        error={errors.first_name}
        autoFocus
        required
        fullWidth
        id="outlined-required"
        variant="outlined"
        label="First Name"
        placeholder="First Name"
        className={classes.inputItem}
        value={values.first_name}
      />

      <TextField
        className={classes.inputItem}
        id="outlined"
        variant="outlined"
        placeholder="Middle Name"
        onChange={handleChange('middle_name')}
        value={values.middle_name}
      />

      <TextField
        required
        id="outlined-required"
        variant="outlined"
        label="Last name"
        placeholder="Last Name"
        className={classes.inputItem}
        onChange={handleChange('last_name')}
        value={values.last_name}
      />

      <TextField
        id="outlined"
        variant="outlined"
        placeholder="Second Last Name"
        className={classes.inputItem}
        onChange={handleChange('second_last_name')}
        value={values.second_last_name}
      />

      <TextField
        select
        id="outlined"
        variant="outlined"
        label="Suffix"
        placeholder="Suffix"
        className={classes.inputItem}
        onChange={handleChange('suffix')}
        value={values.suffix}
      >
        <MenuItem value="Jr">Jr</MenuItem>
        <MenuItem value="Sr">Sr</MenuItem>
        <MenuItem value="I">I</MenuItem>
        <MenuItem value="III">II</MenuItem>
        <MenuItem value="III">III</MenuItem>
        <MenuItem value="IV">IV</MenuItem>
      </TextField>

      <TextField
        id="date"
        InputLabelProps={{ shrink: true }}
        variant="outlined"
        label="Birthday"
        placeholder="Birthday"
        type="date"
        // defaultValue="2017-05-24"
        className={classes.inputItem}
        onChange={handleChange('birthday')}
        value={values.birthday}
      />

      <TextField
        required
        id="outlined-required"
        variant="outlined"
        label="Last 4 social"
        placeholder="Last 4 social"
        className={classes.inputItem}
        onChange={handleChange('ssn')}
        value={values.ssn}
      />

      <div>
        {/* <Button onClick={prevStep} className={classes.pagebutton}> */}
        prev
        {/* </Button> */}
        <Button
          className={classes.pagebutton}
          onClick={(e) => handleContinue(e)}
          // disabled={nextBtnDisabled}
          // type="submit"
        >
          {step === 3 ? 'Submit' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default PersonalDetails;
