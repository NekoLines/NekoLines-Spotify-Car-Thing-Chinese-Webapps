import withStore from 'hocs/withStore';
import styles from './BackPressBanner.module.scss';
import { IconArrowRight } from '@spotify-internal/encore-web';

const BackPressBanner = () => {
  return (
    <div className={styles.banner} data-testid="back-press-banner">
      <span>按下后退键</span>
      <IconArrowRight iconSize={16} />
    </div>
  );
};

export default withStore(BackPressBanner);
