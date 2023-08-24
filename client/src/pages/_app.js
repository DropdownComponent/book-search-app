import '../styles/globals.css'
import PropTypes from 'prop-types';
MyApp.propTypes = {
      Component: PropTypes.func.isRequired,
      pageProps: PropTypes.object.isRequired
    };
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp;
