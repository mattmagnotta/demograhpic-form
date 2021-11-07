import { makeStyles } from '@material-ui/core';
import { ErrorSvg } from '../Assets/ErrorX';
const useStyles = makeStyles(() => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
    },
  };
});

const ErrorPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div>
        <ErrorSvg />
      </div>

      <h1>Uh oh!</h1>
      <p>The was an error, please resubmit the form again.</p>
    </div>
  );
};
export default ErrorPage;
