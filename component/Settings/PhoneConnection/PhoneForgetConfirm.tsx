import { useEffect } from 'react';
import styles from '../../Modals/Modal.module.scss';
import { useStore } from 'context/store';
import {
  Button,
  ButtonGroup,
  ButtonType,
} from 'component/CarthingUIComponents';
import { observer } from 'mobx-react-lite';

const PhoneForgetConfirm = () => {
  const {
    phoneConnectionStore,
    remoteControlStore,
    ubiLogger: { settingsUbiLogger },
  } = useStore();

  useEffect(
    () => settingsUbiLogger.logConfirmForgetImpression(),
    [settingsUbiLogger],
  );

  const isConnected = remoteControlStore.isConnectedPhone(
    phoneConnectionStore.phoneToConnectOrForget?.address,
  );

  return (
    <div>
      <div className={styles.title} data-testid="confirm-forget-title">
        遗忘这台手机？
      </div>
      <div className={styles.description}>
        {isConnected ? (
          <p>
            您当前已连接到{' '}
            {phoneConnectionStore.phoneToConnectOrForget?.name}。
            确定要遗忘这台设备吗？
          </p>
        ) : (
          <p>
            您确定要遗忘{' '}
            {phoneConnectionStore.phoneToConnectOrForget?.name}吗?
          </p>
        )}
      </div>

      <ButtonGroup layout="horizontal" style={{ margin: '0 auto' }}>
        <Button
          type={
            phoneConnectionStore.forgetConfirmationIsActive
              ? ButtonType.BUTTON_PRIMARY
              : ButtonType.BUTTON_SECONDARY
          }
          onClick={phoneConnectionStore.handlePhoneForgetConfirmClick}
        >
          确定
        </Button>
        <Button
          type={
            phoneConnectionStore.forgetConfirmationIsActive
              ? ButtonType.BUTTON_SECONDARY
              : ButtonType.BUTTON_PRIMARY
          }
          onClick={() => {
            settingsUbiLogger.logForgetCancelClick();
            phoneConnectionStore.dismissModal();
          }}
        >
          取消
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default observer(PhoneForgetConfirm);
