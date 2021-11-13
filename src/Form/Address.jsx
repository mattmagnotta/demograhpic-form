import React, { useContext, useState } from 'react';
import { FormContext } from './Form';
import { addressValidation } from './Validation';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  MenuItem,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    inputItem: {
      width: '90%',
      maxWidth: '30rem',
      margin: '1rem',
    },

    FormGroup: {
      marginLeft: '2.3rem',
    },

    pagebutton: {
      background: theme.palette.grey[300],
      width: '10rem',
      margin: '1rem',
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
  const { handleChange, values, step, setStep } = useContext(FormContext);
  const [errors, setErrors] = useState({});

  const classes = useStyles();

  const prevStep = (e) => {
    e.preventDefault();

    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    const errors = addressValidation(values);
    setErrors(errors);

    if (Object.keys(errors).length > 0) return;

    alert(values);
  };

  // const sendPostValues = () => {
  //   const url = 'https://webhook.site/1fc1aed3-615d-434e-9717-1b2db79d536c';

  //   fetch(url, {
  //     method: 'POST',
  //     body: JSON.stringify(values),
  //   })
  //     .then(function (data) {
  //       //step 4 shows success page
  //       setStep(4);
  //       console.log('Request success: ', data);
  //     })
  //     .catch(function (error) {
  //       // step 5 shows error page
  //       setStep(5);
  //     });
  // };

  return (
    <div>
      <TextField
        onChange={handleChange('residence_address')}
        // required
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

      {/* Buttons */}
      <div>
        <Button onClick={prevStep} className={classes.pagebutton}>
          prev
        </Button>

        <Button
          className={classes.pagebutton}
          // onClick={() => sendPostValues(values)}
          type="submit"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Address;
