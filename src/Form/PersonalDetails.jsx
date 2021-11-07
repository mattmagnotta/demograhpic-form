import React from 'react';
// MUI
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, TextField } from '@material-ui/core';

const useStyles = makeStyles(() => {
  return {
    inputItem: {
      width: '90%',
      maxWidth: '30rem',
      margin: '1rem',
    },
  };
});

const PersonalDetails = (props) => {
  const { values, handleChange } = props;
  const classes = useStyles();

  return (
    <div>
      <TextField
        onChange={handleChange('first_name')}
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
        <MenuItem>Sr</MenuItem>
        <MenuItem>Jr</MenuItem>
        <MenuItem>I</MenuItem>
        <MenuItem>II</MenuItem>
        <MenuItem>III</MenuItem>
        <MenuItem>IV</MenuItem>
      </TextField>

      <TextField
        id="date"
        variant="outlined"
        label="Birthday"
        placeholder="Birthday"
        type="date"
        // defaultValue="2017-05-24"
        className={classes.inputItem}
        onChange={handleChange('birthday')}
        // value={values.birthday}
      />

      <TextField
        required
        id="outlined-required"
        variant="outlined"
        label="Last 4 social"
        placeholder="Last 4 social"
        className={classes.inputItem}
        onChange={handleChange('ssn')}
        values={values.ssn}
      />
    </div>
  );
};

export default PersonalDetails;
