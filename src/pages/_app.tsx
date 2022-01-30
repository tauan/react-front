import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import Nav from "../components/Nav";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <div className={styles.body}>
      <Nav pathRoute={router.route} />
      <div className={styles.content}>
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
