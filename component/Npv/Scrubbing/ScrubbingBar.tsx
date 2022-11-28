import { useStore } from 'context/store';
import { observer } from 'mobx-react-lite';
import styles from './ScrubbingBar.module.scss';

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
        marginTop: `-14px`        
      }}
        >
        <img src="images/progress-icon.svg" alt="" height="24px" width="24px" />
      </div>
    </div>
  );
};

export default observer(ScrubbingBar);
