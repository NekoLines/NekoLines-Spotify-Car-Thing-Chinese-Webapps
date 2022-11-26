import { useEffect, useState } from 'react';
import styles from './StartSetup.module.scss';
import SetUpHelp from './SetupHelp';
import { SetupView } from 'store/SetupStore';
import { useStore } from '../../context/store';

const StartSetup = () => {
  const { bluetoothStore } = useStore();
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    bluetoothStore.bluetoothDiscoverable(true);
  });

  const dismissHelp = () => {
    setShowHelp(false);
  };

  if (showHelp) {
    return <SetUpHelp onBackToStart={dismissHelp} />;
  }

  return (
    <div
      className={styles.screen}
      data-testid={`${SetupView.START_SETUP}-screen`}
    >
      <div className={styles.title}>初始配置</div>
      <div className={styles.content}>
        <div className={styles.texts}>
          <div className={styles.subtitle}>
            使用您手机的扫码功能<br />扫描右侧二维码来安装 <br /><span className={styles.white}>Spotify</span> 程序。
          </div>
          <div
            className={styles.needHelp}
            data-testid="go-to-help"
            onClick={() => setShowHelp(true)}
          >
            已安装程序?
          </div>
        </div>
        <div className={styles.qrContainer}>
          <img src="images/setup-qr.svg" alt="" height="192px" width="192px" />
        </div>
      </div>
    </div>
  );
};

export default StartSetup;
