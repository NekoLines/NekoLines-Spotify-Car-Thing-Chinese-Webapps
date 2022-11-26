import { useStore } from 'context/store';
import { useEffect } from 'react';
import styles from './PowerTutorial.module.scss';
import Type from '../../CarthingUIComponents/Type/Type';

const PowerTutorial = () => {
  const {
    ubiLogger: { settingsUbiLogger },
  } = useStore();

  useEffect(() => {
    settingsUbiLogger.logPowerOffTutorialImpression();
  }, [settingsUbiLogger]);

  return (
    <div className={styles.powerTutorial}>
      <Type className={styles.title} name="brioBold">
        打开/关闭电源
      </Type>
      <Type className={styles.description} name="celloBook">
        若要进行打开/关闭电源操作，请按住设备顶部的“设置”按钮。
      </Type>
    </div>
  );
};

export default PowerTutorial;
