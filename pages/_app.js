import Layout from "../components/layout";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import { AuthProvider } from "../context/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
