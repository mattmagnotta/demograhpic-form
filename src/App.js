import React, { createContext, useContext, useState } from 'react';
import './App.css';
// mui
import { makeStyles } from '@material-ui/core';
// components
import Form from './Form/Form';
export const FormContext = createContext({});

const useStyles = makeStyles(() => {
  return {
    banner: {
      // purple
      background: 'rgb(72,0,154)',
      background:
        'linear-gradient(180deg, rgba(72,0,154,1) 0%, rgba(97,51,149,1) 100%)',
      width: '100%',
      height: '20rem',
      position: 'relative',
    },
  };
});

function App() {
  const classes = useStyles();
  const [state, setState] = useState({});
  const values = { state, setState };

  return (
    <FormContext.Provider value={values}>
      <div className="App">
        <div className={classes.banner}></div>
        <Form />
      </div>
    </FormContext.Provider>
  );
}

export default App;
