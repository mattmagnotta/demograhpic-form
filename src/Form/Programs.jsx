import React, { useContext } from 'react';
import { FormContext } from './Form';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => {
  return {
    programsContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    button: {
      width: '80vw',
      maxWidth: '25rem',
      margin: '1.5rem 0',
      height: '5rem',
      background: '#613395',
      color: '#fff',

      '&:hover': {
        // dark purple
        background: '#421D49',
      },
    },

    title: {
      fontSize: '1.2rem',
      fontWeight: 600,
    },
  };
});
const Programs = (props) => {
  const { setStep, setValues, values } = useContext(FormContext);

  const classes = useStyles();

  const handleProgramClick = (program) => {
    setStep(2);
    // when program is clicked update the selected plan in the state to the program code
    setValues({ ...values, selected_plan: program.Code });
  };

  return (
    <div className={classes.programsContainer}>
      <span className={classes.title}>
        Please select one of the goverment programs you are enrolled in below.
      </span>

      {values.programs.map((program, index) => {
        return (
          <Button
            variant="contained"
            key={index}
            className={classes.button}
            onClick={() => handleProgramClick(program)}
            value={program.Code}
          >
            <span>{program.Description}</span>
          </Button>
        );
      })}
    </div>
  );
};
export default Programs;
