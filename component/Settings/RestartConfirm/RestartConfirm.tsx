import { useStore } from 'context/store';
import { useEffect } from 'react';
import styles from './RestartConfirm.module.scss';
import { Button, ButtonType } from 'component/CarthingUIComponents';

const RestartConfirm = () => {
  const {
    hardwareStore,
    ubiLogger: { settingsUbiLogger },
  } = useStore();

  useEffect(() => {
    settingsUbiLogger.logRestartConfirmDialogImpression();
  }, [settingsUbiLogger]);

  const reboot = () => {
    settingsUbiLogger.logRestartConfirmButtonClick();
    hardwareStore.reboot();
  };

  return (
    <div className={styles.restartConfirm}>
      <div className={styles.title}>重启</div>
      <div className={styles.description}>
        您确定要重启设备吗？设备在启动前将不可用。
      </div>
      <Button type={ButtonType.BUTTON_PRIMARY} onClick={reboot}>
        重启 Car Thing
      </Button>
    </div>
  );
};

export default RestartConfirm;
