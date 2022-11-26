import styles from 'component/Modals/Modal.module.scss';
import savingPresetStyles from './SavingPresetFailed.module.scss';

import { IconExclamationAlt } from '@spotify-internal/encore-web';
import Type from 'component/CarthingUIComponents/Type/Type';

const SavingPresetFailed = () => {
  return (
    <div className={styles.dialog}>
      <IconExclamationAlt className={savingPresetStyles.icon} iconSize={64} />
      <div className={styles.description}>
        <Type name="celloBook">
          当前无法保存到预设。<br />
          请稍后再试。
        </Type>
      </div>
    </div>
  );
};

export default SavingPresetFailed;
