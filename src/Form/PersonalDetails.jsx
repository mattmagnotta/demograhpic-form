import React, { useContext, useState } from 'react';
import { FormContext } from './Form';
import { personDetailsValidation } from './Validation';
// MUI
import { makeStyles } from '@material-ui/core/styles';
import { Button, MenuItem, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    inputItem: {
      width: '90%',
      maxWidth: '30rem',
      margin: '1rem',
    },

    pagebutton: {
      background: theme.palette.grey[300],
      width: '10rem',
      margin: '1rem',
    },
  };
});

const PersonalDetails = () => {
  const { values, handleChange, step, setStep } = useContext(FormContext);
  const classes = useStyles();

  const [errors, setErrors] = useState({});

  const handleContinue = (e) => {
    e.preventDefault();
    // every time you click the next btn it updates the errors state object
    // if there are errors it returns out of this, if there are no errors it
    // sets step + 1
    const errors = personDetailsValidation(values);
    setErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setStep(step + 1);
  };

  const prevStep = (e) => {
    e.preventDefault();

    setStep(step - 1);
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

      {/* buttons */}
      <div>
        <Button onClick={prevStep} className={classes.pagebutton}>
          prev
        </Button>
        <Button
          className={classes.pagebutton}
          onClick={(e) => handleContinue(e)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PersonalDetails;
