export const personDetailsValidation = (values) => {
  let errors = {};
  if (values.first_name === '') {
    errors.first_name = 'First name is required';
  }
  return errors;
};
