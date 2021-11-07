import { makeStyles } from '@material-ui/core/styles';
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

const Address = ({ handleChange }) => {
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
        label="Residence Address"
        placeholder="Enter a location"
        className={classes.inputItem}
      />

      <TextField
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
      >
        <MenuItem>Permanent</MenuItem>
        <MenuItem>Temporary</MenuItem>
      </TextField>

      <FormGroup className={classes.FormGroup}>
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="I have a different shipping address"
        />
      </FormGroup>
    </div>
  );
};

export default Address;
