import React, { useContext } from 'react';
import { FormContext } from './Form';
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
    },
  };
});

const PurpleCheckBox = withStyles({
  root: {
    color: '#613395',
    '&$checked': {
      color: '#613395',
    },
  },
})((props) => <Checkbox color="default" {...props} />);

const Address = () => {
  const { handleChange, values } = useContext(FormContext);

  const classes = useStyles();

  return (
    <div>
      <TextField
        onChange={handleChange('residence_address')}
        required
        fullWidth
        id="outlined-required"
        variant="outlined"
        label="Residence Address"
        placeholder="Enter a location"
        className={classes.inputItem}
        value={values.residence_address}
      />

      <TextField
        onChange={handleChange('res_apt')}
        className={classes.inputItem}
        id="outlined"
        variant="outlined"
        placeholder="Apt, unit or lot #"
        value={values.res_apt}
      />

      <TextField
        select
        id="outlined"
        variant="outlined"
        label="Suffix"
        placeholder="Permanent or temporary"
        className={classes.inputItem}
        defaultValue={'Permanent'}
        onChange={handleChange('permanence')}
        value={values.permanence}
      >
        {/* TODO: Default value */}
        <MenuItem value={'permanent'}>Permanent</MenuItem>
        <MenuItem>Temporary</MenuItem>
      </TextField>

      {/* TODO: figure out margin issue */}
      <FormGroup className={classes.FormGroup}>
        <FormControlLabel
          control={
            <PurpleCheckBox
              onChange={handleChange('shipping')}
              checked={values.shipping}
            />
          }
          label="I have a different shipping address"
        />
      </FormGroup>

      {values.shipping && (
        <>
          <TextField
            className={classes.inputItem}
            id="outlined"
            variant="outlined"
            placeholder="Shipping Address"
            onChange={handleChange('shipping_address')}
            value={values.shipping_address}
          />

          <TextField
            className={classes.inputItem}
            id="outlined"
            variant="outlined"
            placeholder="Apt, unit, or lot #"
            onChange={handleChange('ship_apt')}
            value={values.ship_apt}
          />

          <TextField
            className={classes.inputItem}
            id="outlined"
            variant="outlined"
            placeholder="Zip"
            onChange={handleChange('ship_zipcode')}
            value={values.ship_zipcode}
          />
        </>
      )}
    </div>
  );
};

export default Address;
