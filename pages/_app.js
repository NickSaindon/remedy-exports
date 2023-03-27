import { useEffect } from 'react';
import '../styles/globals.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';


export default function App({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return <Component {...pageProps} />
}
