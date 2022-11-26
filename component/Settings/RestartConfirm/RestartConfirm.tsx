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
      <div className={styles.title}>确定?</div>
      <div className={styles.description}>
        若您确定重启，请点击按钮。
      </div>
      <Button type={ButtonType.BUTTON_PRIMARY} onClick={reboot}>
        重启 Car Thing
      </Button>
    </div>
  );
};

export default RestartConfirm;
