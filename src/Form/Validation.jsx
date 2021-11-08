export const personDetailsValidation = (values) => {
  let errors = {};
  if (values.first_name === '') {
    errors.first_name = 'First name is required';
  }
  if (values.last_name === '') {
    errors.last_name = 'Last name is required';
  }
  if (values.birthday === '') {
    errors.birthday = 'Birthday is required';
  }
  if (values.ssn === null) {
    errors.ssn = 'Last 4 of social is required';
  }
  return errors;
};
