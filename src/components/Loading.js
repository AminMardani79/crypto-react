import React from "react";
// loading
import loading from "../assets/img/cryptoLoading.gif";
// styles
import styles from "../assets/css/Loading.module.css";

const Loading = () => {
  return (
    <tr className={styles.loadingContainer}>
      <td colSpan={5}>
        <img src={loading} alt="cryptoLoading" />
      </td>
    </tr>
  );
};

export default Loading;
