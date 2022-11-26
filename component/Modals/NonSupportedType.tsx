import { IconExclamationAlt } from '@spotify-internal/encore-web';
import LegacyModal from 'component/Modals/LegacyModal';
import styles from './NonSupportedType.module.scss';

const NonSupportedType = () => {
  return (
    <LegacyModal>
      <div
        className={styles.nonSupportedType}
        data-testid="non_supported_type-modal-type"
      >
        <IconExclamationAlt className={styles.icon} iconSize={64} />
        <div className={styles.text}>
          <span>歌曲界面不适用于专辑电台</span>
        </div>
      </div>
    </LegacyModal>
  );
};

export default NonSupportedType;
