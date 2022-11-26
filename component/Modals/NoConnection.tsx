import { useEffect } from 'react';
import styles from './Modal.module.scss';
import { useStore } from 'context/store';
import { AppView } from 'store/ViewStore';
import { Button, ButtonType } from 'component/CarthingUIComponents';

const NoConnection = () => {
  const {
    settingsStore,
    overlayController: { overlayUiState },
    viewStore,
    onboardingStore,
    ubiLogger,
  } = useStore();

  useEffect(
    () => ubiLogger.modalUbiLogger.logNoConnectionModalImpression(),
    [ubiLogger.modalUbiLogger],
  );

  const handleClick = () => {
    overlayUiState.showSettings();
    settingsStore.showPhoneSettings();
    ubiLogger.modalUbiLogger.logGoToPhoneListClick();
    if (viewStore.appView === AppView.ONBOARDING) {
      onboardingStore.setOnboardingFinished();
    }
  };

  return (
    <div data-testid="no_connection-modal-type" className={styles.dialog}>
      <div className={styles.title}>手机已断开</div>
      <div className={styles.description}>
        <p>
          Car Thing 将自动重新连接。您也可以点击按钮并在跳转的页面中选择您想要重新连接的手机。
        </p>
      </div>
      <Button type={ButtonType.BUTTON_PRIMARY} onClick={handleClick}>
        前往手机列表
      </Button>
    </div>
  );
};

export default NoConnection;
