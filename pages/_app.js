import '../styles/globals.css';   // relative to pages/_app.js
import Layout from '../components/Layout';  // relative to pages/_app.js

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
