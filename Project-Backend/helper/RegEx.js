const RegEx = {
  email: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
  mobile: /^([0-9]{10})$/,
  password: /^([a-zA-Z0-9@*#]{8,15})$/,
  name: /^([a-zA-Z]{3,15})$/,
  address: /^([a-zA-Z0-9]{3,15})$/,
  pincode: /^([0-9]{6})$/,
  city: /^([a-zA-Z]{3,15})$/,
  state: /^([a-zA-Z]{3,15})$/,
  country: /^([a-zA-Z]{3,15})$/,

  // validate email
  validateEmail: (email) => {
    return RegEx.email.test(email);
  },

  // validate mobile
  validateMobile: (mobile) => {
    return RegEx.mobile.test(mobile);
  },

  // validate password
  validatePassword: (password) => {
    return RegEx.password.test(password);
  },

  // validate name
  validateName: (name) => {
    return RegEx.name.test(name);
  },

  // validate address
  validateAddress: (address) => {
    return RegEx.address.test(address);
  },

  // validate pincode
  validatePincode: (pincode) => {
    return RegEx.pincode.test(pincode);
  },

  // validate city
  validateCity: (city) => {
    return RegEx.city.test(city);
  },

  // validate state
  validateState: (state) => {
    return RegEx.state.test(state);
  },

  // validate country
  validateCountry: (country) => {
    return RegEx.country.test(country);
  },
};

module.exports = RegEx;
