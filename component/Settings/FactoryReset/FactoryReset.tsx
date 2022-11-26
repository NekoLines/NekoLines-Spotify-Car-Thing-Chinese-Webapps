import { useStore } from 'context/store';
import { useEffect } from 'react';
import styles from './FactoryReset.module.scss';
import { observer } from 'mobx-react-lite';
import {
  Button,
  ButtonGroup,
  ButtonType,
} from 'component/CarthingUIComponents';

const FactoryReset = () => {
  const {
    hardwareStore,
    settingsStore,
    ubiLogger: { settingsUbiLogger },
  } = useStore();

  useEffect(
    () => settingsUbiLogger.logFactoryResetDialogImpression(),
    [settingsUbiLogger],
  );

  useEffect(
    () => settingsStore.setFactoryResetConfirmationIsActive(true),
    [settingsStore],
  );

  const factoryReset = () => {
    settingsUbiLogger.logFactoryResetConfirmButtonClick();
    hardwareStore.factoryReset();
  };

  return (
    <div className={styles.factoryReset}>
      <div className={styles.description}>
        您确定要恢复为出厂设置吗？所有该<br/>设备上的数据和配置信息将被消除。<br/>这是<b> 不可逆 </b>的。
      </div>
      <ButtonGroup layout="horizontal" style={{ margin: '0 auto' }}>
        <Button
          type={
            settingsStore.factoryResetConfirmationIsActive
              ? ButtonType.BUTTON_PRIMARY
              : ButtonType.BUTTON_SECONDARY
          }
          onClick={factoryReset}
        >
          全部删除
        </Button>
        <Button
          type={
            settingsStore.factoryResetConfirmationIsActive
              ? ButtonType.BUTTON_SECONDARY
              : ButtonType.BUTTON_PRIMARY
          }
          onClick={settingsStore.handleFactoryResetClicked}
        >
          取消
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default observer(FactoryReset);
