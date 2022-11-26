import styles from './SetupHelp.module.scss';
import { IconGears } from '@spotify-internal/encore-web';
import { SetupView } from 'store/SetupStore';

type Props = {
  onBackToStart: () => void;
};

const SetUpHelp = ({ onBackToStart }: Props) => {
  return (
    <div className={styles.screen} data-testid={`${SetupView.HELP}-screen`}>
      <div className={styles.content}>
        <div className={styles.texts}>
          <div className={styles.subtitle}>
            已安装程序可进行如下配置:
          </div>
          <div className={styles.subtitle}>
            <ul className={styles.subtitle}>
              <li>
                启动您手机上的 <span className={styles.white}>Spotify</span> 程序
              </li>
              <li>
                前往程序的 <span className={styles.white}>首页</span>
              </li>
              <li>
                点击位于右上角的 <span className={styles.white}>Settings </span>
                <IconGears className={styles.white} />
              </li>
              <li>
                在设置中的 <span className={styles.white}>Car</span> ，找到
                <span className={styles.white}> Car Thing</span>
              </li>
              <li>
                若设置中不存在 <span className={styles.white}>Car</span> ，请 <span className={styles.white}>更新</span> 您的程序。
              </li>
            </ul>
          </div>
        </div>
        <div
          className={styles.backToSetup}
          data-testid="go-to-start-setup"
          onClick={() => onBackToStart()}
        >
          返回配置页面
        </div>
      </div>
    </div>
  );
};

export default SetUpHelp;
