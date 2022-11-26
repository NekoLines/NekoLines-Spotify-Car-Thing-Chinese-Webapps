import styles from './Waiting.module.scss';
import { SetupView } from 'store/SetupStore';
import AppendEllipsis from 'component/CarthingUIComponents/AppendEllipsis/AppendEllipsis';

const Waiting = () => {
  return (
    <div className={styles.screen} data-testid={`${SetupView.WAITING}-screen`}>
      <div className={styles.title}>
        <AppendEllipsis>请稍等</AppendEllipsis>
      </div>
      <div className={styles.subtitle}>
        在您的手机下载最新版本并重新连接到 Car Thing 时，安装将继续进行。
      </div>
    </div>
  );
};

export default Waiting;
