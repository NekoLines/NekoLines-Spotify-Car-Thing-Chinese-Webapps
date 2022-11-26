import { useEffect } from 'react';
import styles from './Updating.module.scss';
import { observer } from 'mobx-react-lite';
import { useStore } from 'context/store';
import { SetupView } from 'store/SetupStore';
import AppendEllipsis from 'component/CarthingUIComponents/AppendEllipsis/AppendEllipsis';

const Updating = () => {
  const { otaStore, setupStore, ubiLogger } = useStore();

  useEffect(() => {
    ubiLogger.modalUbiLogger.logSetupCriticalOtaImpression();
  }, [ubiLogger.modalUbiLogger]);

  return (
    <div className={styles.screen} data-testid={`${SetupView.UPDATING}-screen`}>
      <div className={styles.title}>
        <AppendEllipsis>
          {otaStore.upgrading ? '已完成' : '更新中'}
        </AppendEllipsis>
      </div>
      <div className={styles.content}>
        <div className={styles.subtitle}>
          {setupStore.isFinished
            ? '他应该需要一段时间来进行更新…'
            : '在 Spotify 应用内继续配置该程序。'}
        </div>
        <div className={styles.progress}>
          {!otaStore.upgrading && `${otaStore.transferPercent || 0}%`}
        </div>
      </div>
    </div>
  );
};

export default observer(Updating);
