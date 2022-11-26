import styles from './Modal.module.scss';
import { SpotifyLogo } from 'component/CarthingUIComponents';

const LoginRequired = () => {
  return (
    <div data-testid="login-modal-type" className={styles.dialog}>
      <SpotifyLogo logoHeight={64} logoColorClass="white" />
      <div className={styles.title}>未登录</div>
      <div className={styles.description}>
        <p>
          要使用 Car Thing ，您需要在您的手机上登陆 Spotify 应用程序。
        </p>
      </div>
    </div>
  );
};

export default LoginRequired;
