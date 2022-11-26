import styles from './BTPairing.module.scss';
import { observer } from 'mobx-react-lite';
import { SetupView } from 'store/SetupStore';
import { useStore } from 'context/store';

const parsePincode = (pinCode?: string) => {
  if (!pinCode) return pinCode;

  return pinCode.split('').join(' ');
};
const BTPairing = () => {
  const { bluetoothStore } = useStore();
  return (
    <div
      className={styles.screen}
      data-testid={`${SetupView.BT_PAIRING}-screen`}
    >
      <div className={styles.title}>配对代码</div>
      <div className={styles.content}>
        <div className={styles.texts}>
          在 Spotify 应用内确认您已看见配对代码。
        </div>
        <div className={styles.pinCode} data-testid="bt-pin">
          {parsePincode(bluetoothStore.bluetoothPairingPin)}
        </div>
      </div>
    </div>
  );
};

export default observer(BTPairing);
