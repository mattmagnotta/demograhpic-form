import React, { useContext, useEffect, useState } from 'react';
import { FormContext } from './Form';
import { addressValidation } from './Validation';
import { usePlacesWidget } from 'react-google-autocomplete';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  MenuItem,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from '@material-ui/core';
import classNames from 'classnames';

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
    noShippingInput: {
      display: 'none',
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
  const { handleChange, values, step, setStep, setValues, shipping } =
    useContext(FormContext);
  const [autoVal, setAutoVal] = useState('');
  const [errors, setErrors] = useState({});

  const { ref: residenceRef, autocompleteRef } = usePlacesWidget({
    apiKey: 'AIzaSyAga34fRWQEuoWl8cNHnQj0maNWUCO7k50',
    inputAutoCompleteValue: autoVal,
    onPlaceSelected: (place) => setAutoVal(place),
    options: {
      types: ['address'],
      componentRestrictions: { country: 'us' },
    },
  });

  const { ref: shippingRef } = usePlacesWidget({
    apiKey: 'AIzaSyAga34fRWQEuoWl8cNHnQj0maNWUCO7k50',
    onPlaceSelected: (place) =>
      setValues({ ...values, shipping_address: place.formatted_address }),
    options: {
      types: ['address'],
      componentRestrictions: { country: 'us' },
    },
  });

  useEffect(() => {}, [values]);
  const classes = useStyles();

  const prevStep = (e) => {
    e.preventDefault();

    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    // const errors = addressValidation(values);
    // setErrors(errors);
    // // if (Object.keys(errors).length > 0) return;
    // alert(values);
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
        // onChange={handleChange('residence_address')}
        // required
        fullWidth
        {...autocompleteRef}
        id="outlined-required"
        variant="outlined"
        inputRef={residenceRef}
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
        label="Perm"
        // placeholder="Permanent or temporary"
        className={classes.inputItem}
        defaultValue={'Permanent'}
        onChange={handleChange('permanence')}
        value={values.permanence}
      >
        {/* TODO: Default value */}
        <MenuItem value={'permanent'}>Permanent</MenuItem>
        <MenuItem value={'temporary'}>Temporary</MenuItem>
      </TextField>

      {/* TODO: figure out margin issue */}
      <FormGroup className={classes.FormGroup}>
        <FormControlLabel
          control={
            <PurpleCheckBox
              onChange={handleChange('shipping')}
              checked={shipping}
            />
          }
          label="I have a different shipping address"
        />
      </FormGroup>

      <div className={classNames({ [classes.noShippingInput]: !shipping })}>
        <TextField
          // onChange={handleChange('shipping_address')}
          autoComplete="false"
          // required
          fullWidth
          id="outlined-required"
          variant="outlined"
          inputRef={shippingRef}
          label="Residence Address"
          placeholder="Enter a location"
          className={classes.inputItem}
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
      </div>

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
