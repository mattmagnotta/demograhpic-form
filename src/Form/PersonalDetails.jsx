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

const PersonalDetails = ({ handleChange }) => {
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
      />

      <TextField
        className={classes.inputItem}
        id="outlined"
        variant="outlined"
        placeholder="Middle Name"
      />

      <TextField
        required
        id="outlined-required"
        variant="outlined"
        label="Last name"
        placeholder="Last Name"
        className={classes.inputItem}
      />

      <TextField
        id="outlined"
        variant="outlined"
        placeholder="Second Last Name"
        className={classes.inputItem}
      />

      <TextField
        select
        id="outlined"
        variant="outlined"
        label="Suffix"
        placeholder="Suffix"
        className={classes.inputItem}
      >
        <MenuItem>Jr</MenuItem>
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
        type="date"
        defaultValue="2017-05-24"
        className={classes.inputItem}
      />

      <TextField
        id="outlined"
        variant="outlined"
        placeholder="Second Last Name"
        className={classes.inputItem}
      />
    </div>
  );
};

export default PersonalDetails;
