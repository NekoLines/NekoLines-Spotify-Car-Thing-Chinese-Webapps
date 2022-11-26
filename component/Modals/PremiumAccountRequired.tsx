import { useEffect } from 'react';
import styles from './Modal.module.scss';

import { SpotifyLogo } from 'component/CarthingUIComponents';
import { useStore } from 'context/store';

const PremiumAccountRequired = () => {
  const { ubiLogger } = useStore();
  useEffect(
    () => ubiLogger.modalUbiLogger.logNeedPremiumModalShown(),
    [ubiLogger.modalUbiLogger],
  );
  return (
    <div data-testid="premiumneeded-modal-type" className={styles.dialog}>
      <SpotifyLogo logoHeight={64} logoColorClass="white" />
      <div className={styles.title}>需要高级账户</div>
      <div className={styles.description}>
        <p>
          要使用 Car Thing，您需要在手机上登录 Spotify Premium 或 Premium Family 帐户。
        </p>
      </div>
    </div>
  );
};

export default PremiumAccountRequired;
