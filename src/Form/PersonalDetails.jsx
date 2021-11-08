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
    // if there are errors present it breaks out of this, if there are no errors it
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
        label="First Name"
        // placeholder="First Name"
        onChange={handleChange('first_name')}
        error={errors.first_name}
        // autoFocus
        required
        fullWidth
        id="outlined-required"
        variant="outlined"
        className={classes.inputItem}
        value={values.first_name}
      />

      <TextField
        label="Middle Name"
        // placeholder="Middle Name"
        onChange={handleChange('middle_name')}
        className={classes.inputItem}
        id="outlined"
        variant="outlined"
        value={values.middle_name}
      />

      <TextField
        label="Last Name"
        // placeholder="Last Name"
        onChange={handleChange('last_name')}
        error={errors.last_name}
        required
        fullWidth
        id="outlined-required"
        variant="outlined"
        className={classes.inputItem}
        value={values.last_name}
      />

      <TextField
        label="Second Last Name"
        // placeholder="Second Last Name"
        onChange={handleChange('second_last_name')}
        id="outlined"
        variant="outlined"
        className={classes.inputItem}
        value={values.second_last_name}
      />

      <TextField
        label="Suffix"
        // placeholder="Suffix"
        onChange={handleChange('suffix')}
        select
        id="outlined"
        variant="outlined"
        className={classes.inputItem}
        value={values.suffix}
      >
        <MenuItem value="No Suffix">No Suffix</MenuItem>
        <MenuItem value="Jr">Jr</MenuItem>
        <MenuItem value="Sr">Sr</MenuItem>
        <MenuItem value="I">I</MenuItem>
        <MenuItem value="III">II</MenuItem>
        <MenuItem value="III">III</MenuItem>
        <MenuItem value="IV">IV</MenuItem>
      </TextField>

      <TextField
        label="Birthday"
        // placeholder="Birthday"
        onChange={handleChange('birthday')}
        error={errors.birthday}
        required
        id="date"
        InputLabelProps={{ shrink: true }}
        variant="outlined"
        type="date"
        className={classes.inputItem}
        value={values.birthday}
      />

      <TextField
        label="Last 4 of Social"
        placeholder="&times;&times;&times;&times;"
        onChange={handleChange('ssn')}
        error={errors.ssn}
        required
        id="outlined-required"
        variant="outlined"
        className={classes.inputItem}
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
