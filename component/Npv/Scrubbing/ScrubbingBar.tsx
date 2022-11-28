import { useStore } from 'context/store';
import { observer } from 'mobx-react-lite';
import styles from './ScrubbingBar.module.scss';

/** 30 行开始为定义小图标的代码段 */
/** marginTop 代表了小图标上浮的距离，可以根据小图标主体信息的位置来确定 */
/** img 标签的 height 和 width 两个属性代表了图标的大小，不宜设置过大。 */
/** 如果不需要显示该图标，请删除第 30 - 37 行 */

const ScrubbingBar = () => {
  const uiState = useStore().npvStore.scrubbingUiState;
  const { colorChannels } = uiState;

  return (
    <div
      className={styles.scrubbingBar}
      style={{
        backgroundColor: `rgb(${colorChannels.join(',')})`,
      }}
      data-testid="scrubbing-bar"
    >

      <div
        className={styles.progressPlayed}
        style={{
          transform: `scaleX(${uiState.trackPlayedPercent * 8})`
        }}
      />

      <div
        style={{
          marginLeft: `${uiState.trackPlayedPercent * 8}px`,
          marginTop: `-18px`
        }}
      >
        <img src="images/progress-icon.png" alt="" height="28px" width="23px" />
      </div>

    </div>
  );
};

export default observer(ScrubbingBar);
