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
export const addressValidation = (values) => {
  let errors = {};
  if (values.residence_address === '') {
    errors.residence_address = 'Address is required';
  }
  if (values.shipping === true) {
    if (values.shipping_address === '') {
      errors.shipping_address = 'Shipping address is required';
    }
    if (values.ship_zipcode === '') {
      errors.ship_zipcode = 'Shipping zip is required';
    }
  }

  return errors;
};
