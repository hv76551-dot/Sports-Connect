import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './ThemeContext';

const defaultTheme = {
  black: '#000000',
  white: '#FFFFFF',
  transparent: 'transparent',
  backgroundColor: '#F0F0F0',
  surfaceColor: '#FFFFFF',
  borderColor: '#E0E0E0',
  primaryLightColor: '#D0D0D0',
  primaryColor: '#C0C0C0',
  primaryDarkColor: '#A0A0A0',
  disabledColor: '#B0B0B0',
  disabledDarkColor: '#909090',
  headingTextColor: '#303030',
  subHeadingTextColor: '#606060',
  bodyTextColor: '#404040',
  successColor: '#008000',
  errorColor: '#FF0000',
  appbar: {
    statusBarColor: '#202020',
    barStyle: 'dark-content',
    backgroundColor: '#303030',
    tintColor: '#FFFFFF',
  },
};

const ThemeProvider = ({theme = defaultTheme, children}) => {
  const [themeState, setTheme] = useState(theme);

  return (
    <ThemeContext.Provider value={{theme: themeState, setTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  theme: PropTypes.shape({
    black: PropTypes.string.isRequired,
    white: PropTypes.string.isRequired,
    transparent: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    surfaceColor: PropTypes.string.isRequired,
    borderColor: PropTypes.string.isRequired,
    primaryLightColor: PropTypes.string.isRequired,
    primaryColor: PropTypes.string.isRequired,
    primaryDarkColor: PropTypes.string.isRequired,
    disabledColor: PropTypes.string.isRequired,
    disabledDarkColor: PropTypes.string.isRequired,
    headingTextColor: PropTypes.string.isRequired,
    subHeadingTextColor: PropTypes.string.isRequired,
    bodyTextColor: PropTypes.string.isRequired,
    successColor: PropTypes.string.isRequired,
    errorColor: PropTypes.string.isRequired,
    appbar: PropTypes.shape({
      statusBarColor: PropTypes.string.isRequired,
      barStyle: PropTypes.string.isRequired,
      backgroundColor: PropTypes.string.isRequired,
      tintColor: PropTypes.string.isRequired,
    }).isRequired,
  }),
  children: PropTypes.element.isRequired,
};

export default ThemeProvider;
