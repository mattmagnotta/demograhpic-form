import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  MenuItem,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';

const useStyles = makeStyles(() => {
  return {
    inputItem: {
      width: '90%',
      maxWidth: '30rem',
      margin: '1rem',
    },

    FormGroup: {
      marginLeft: '2.3rem',
      marginRight: '0',
    },
  };
});

const GreenCheckbox = withStyles({
  root: {
    color: '#613395',
    '&$checked': {
      color: '#613395',
    },
  },
})((props) => <Checkbox color="default" {...props} />);

const Address = (props) => {
  const { handleChange, shipping } = props;

  const classes = useStyles();

  return (
    <div>
      <TextField
        onChange={handleChange('first_name')}
        required
        fullWidth
        id="outlined-required"
        variant="outlined"
        label="Residence Address"
        placeholder="Enter a location"
        className={classes.inputItem}
      />

      <TextField
        onChange={handleChange('first_name')}
        className={classes.inputItem}
        id="outlined"
        variant="outlined"
        placeholder="Apt, unit or lot #"
      />

      <TextField
        select
        id="outlined"
        variant="outlined"
        label="Suffix"
        placeholder="Suffix"
        className={classes.inputItem}
        defaultValue={'Permanent'}
      >
        {/* TODO: Default value */}
        <MenuItem value={'permanent'}>Permanent</MenuItem>
        <MenuItem>Temporary</MenuItem>
      </TextField>

      {/* TODO: figure out margin issue */}
      <FormGroup className={classes.FormGroup}>
        <FormControlLabel
          control={<GreenCheckbox onChange={handleChange('shipping')} />}
          label="I have a different shipping address"
        />
      </FormGroup>

      {shipping && (
        <>
          <TextField
            className={classes.inputItem}
            id="outlined"
            variant="outlined"
            placeholder="Shipping Address"
          />

          <TextField
            className={classes.inputItem}
            id="outlined"
            variant="outlined"
            placeholder="Apt, unit or lot #"
          />

          <TextField
            className={classes.inputItem}
            id="outlined"
            variant="outlined"
            placeholder="Zip"
          />
        </>
      )}
    </div>
  );
};

export default Address;
