import PhoneForgetConfirm from './PhoneForgetConfirm';
import { useEffect } from 'react';
import styles from '../../Modals/Modal.module.scss';
import { useStore } from 'context/store';
import { PhoneConnectionModalView } from 'store/PhoneConnectionStore';
import Spinner, {
  SpinnerSize,
} from '../../CarthingUIComponents/Spinner/Spinner';
import { IconCheck } from '@spotify-internal/encore-web';
import Overlay, { FROM } from '../../Overlays/Overlay';
import { observer } from 'mobx-react-lite';
import PremiumAccountRequired from '../../Modals/PremiumAccountRequired';
import LoginRequired from 'component/Modals/LoginRequired';

const PhoneConnectionModal = () => {
  const { bluetoothStore, phoneConnectionStore } = useStore();

  useEffect(() => {
    phoneConnectionStore.logDialogImpression();
  }, [phoneConnectionStore, phoneConnectionStore.phoneConnectionModal]);

  const getDialog = () => {
    switch (phoneConnectionStore.phoneConnectionModal) {
      case PhoneConnectionModalView.ADD_NEW_PHONE:
        return (
          <>
            <div className={styles.title}>配对模式</div>
            <div className={styles.description}>
              {`在手机设置中打开蓝牙，然后连接到 ${
                bluetoothStore.localDevice
                  ? bluetoothStore.localDevice.name
                  : '您的 Car Thing'
              }.`}
            </div>
          </>
        );
      case PhoneConnectionModalView.ADD_NEW_PAIRING:
        return (
          <>
            <div className={styles.title}>配对中...</div>
            <div className={styles.description}>
              确认您在手机上看到以下代码。
            </div>
            <div className={styles.pairingCode}>{bluetoothStore.pin}</div>
          </>
        );
      case PhoneConnectionModalView.FORGET_PHONE_CONFIRM:
        return <PhoneForgetConfirm />;
      case PhoneConnectionModalView.FORGET_PHONE_PROGRESS:
        return (
          <>
            <Spinner size={SpinnerSize.BIG} />
            <div
              className={styles.subtitle}
              data-testid="forget-phone-progress"
            >
              <p>遗忘中</p>
              <p>{phoneConnectionStore.phoneToConnectOrForget?.name}...</p>
            </div>
          </>
        );
      case PhoneConnectionModalView.FORGET_PHONE_FAILURE:
        return (
          <>
            <div className={styles.title}>失败</div>
            <div className={styles.description}>
              <p>Car Thing 在遗忘您的手机过程中出现了一些问题。</p>
            </div>
          </>
        );
      case PhoneConnectionModalView.FORGET_PHONE_SUCCESS:
        return (
          <>
            <IconCheck iconSize={24} className={styles.iconCheck} />
            <div className={styles.subtitle} data-testid="forget-phone-success">
              <p>{phoneConnectionStore.phoneToConnectOrForget?.name}</p>
              <p> 已经被遗忘</p>
            </div>
          </>
        );
      case PhoneConnectionModalView.SELECT_PHONE_PROGRESS:
        return (
          <>
            <Spinner size={SpinnerSize.BIG} />
            <div
              className={styles.subtitle}
              data-testid="select-phone-progress"
            >
              <p>正在连接到</p>
              <p>{phoneConnectionStore.phoneToConnectOrForget?.name}...</p>
            </div>
          </>
        );
      case PhoneConnectionModalView.PHONE_SWITCH_SUCCESS:
        return (
          <>
            <IconCheck iconSize={24} className={styles.iconCheck} />
            <div className={styles.subtitle} data-testid="select-phone-success">
              <p>已连接到</p>
              <p>{bluetoothStore.currentDevice?.name}</p>
            </div>
          </>
        );
      case PhoneConnectionModalView.SELECT_PHONE_FAILURE:
        return (
          <>
            <div className={styles.title}>不能连接到您的手机</div>
            <div className={styles.description}>
              <p>
                Car Thing无法连接到您的手机。请确保您的手机已打开&蓝牙已打开且在范围内。
              </p>
            </div>
          </>
        );
      case PhoneConnectionModalView.NEED_PREMIUM:
        return <PremiumAccountRequired />;
      case PhoneConnectionModalView.NOT_LOGGED_IN:
        return <LoginRequired />;
      default:
        return undefined;
    }
  };

  const dialog = getDialog();

  return (
    <Overlay show={!!dialog} appear={FROM.FADE_IN}>
      <div className={styles.dialog}>{dialog}</div>
    </Overlay>
  );
};

export default observer(PhoneConnectionModal);
