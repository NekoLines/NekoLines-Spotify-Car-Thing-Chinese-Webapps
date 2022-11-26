import { observer } from 'mobx-react-lite';

import styles from './OtaUpdating.module.scss';
import { useStore } from 'context/store';
import AppendEllipsis from 'component/CarthingUIComponents/AppendEllipsis/AppendEllipsis';

const OtaUpdating = () => {
  const { otaStore } = useStore();
  return (
    <div className={styles.background}>
      {otaStore.error ? (
        <>
          <div className={styles.error}>更新失败</div>
          <div className={styles.subtitle}>
            若要重启设备并重试，请拔下设备电源，稍等一段时间后插入即可。
          </div>
        </>
      ) : (
        <>
          <div className={styles.title} data-testid="critical-ota-screen">
            <AppendEllipsis>升级中</AppendEllipsis>
          </div>
          <div className={styles.subtitle}>
            请保证设备电源供应稳定，不要断开电源。
          </div>
          {otaStore.transferring && (
            <div
              className={styles.progress}
            >{`${otaStore.transferPercent}%`}</div>
          )}
        </>
      )}
    </div>
  );
};

export default observer(OtaUpdating);
