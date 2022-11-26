import { useState } from 'react';
import styles from './Failed.module.scss';
import { useStore } from 'context/store';
import { SetupView } from 'store/SetupStore';

const Failed = () => {
  const { hardwareStore } = useStore();
  const [rebootSelected, setRebootSelected] = useState(false);
  return (
    <div
      className={styles.screen}
      data-testid={`${SetupView.FAILED}-screen`}
      onClick={() => {
        if (!rebootSelected) {
          hardwareStore.reboot();
          setRebootSelected(true);
        }
      }}
    >
      <div className={styles.title}>请再试一次</div>
      <div className={styles.subtitle}>
        Car Thing 无法完成更新，请确保您的手机具备网络链接后点击屏幕任意位置进行重试。
      </div>
    </div>
  );
};

export default Failed;
