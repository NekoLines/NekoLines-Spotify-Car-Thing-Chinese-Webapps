import { Component } from 'react';
import styles from './Connected.module.scss';
import { pink, aubergine } from '@spotify-internal/encore-foundation';
import { SetupView } from 'store/SetupStore';

class Connected extends Component<{}, {}> {
  render() {
    return (
      <div
        className={styles.screen}
        style={{ background: aubergine }}
        data-testid={`${SetupView.CONNECTED}-screen`}
      >
        <div className={styles.title} style={{ color: pink }}>
          已连接
        </div>
        <div className={styles.subtitle} style={{ color: pink }}>
          配置过程将在 Spotify 应用程序内继续进行。
        </div>
      </div>
    );
  }
}

export default Connected;
