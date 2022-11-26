import { IconVolume48, IconVolumeOff48 } from 'component/CarthingUIComponents';
import Type from 'component/CarthingUIComponents/Type/Type';
import { useStore } from 'context/store';
import { observer } from 'mobx-react-lite';
import styles from './Volume.module.scss';
import VolumeBar from './VolumeBar';

const Volume = () => {
  const uiState = useStore().npvStore.volumeUiState;

  return (
    <div className={styles.volume} data-testid="volume">
      {uiState.carMode ? (
        <>
          <Type name="canonBook" textColor="white">
            在 {uiState.carMode} 情况下手机音量不可用
          </Type>
        </>
      ) : (
        <>
          <VolumeBar />
          <div
            className={styles.volumeInfo}
          >
            <div
              className={styles.volumeIcon}
            >
              {uiState.isVolumeAbove0 ? <IconVolume48 /> : <IconVolumeOff48 />}
            </div>
            <Type name="canonBook" textColor="white">
              手机音量
            </Type>
          </div>
        </>
      )}
    </div>
  );
};

export default observer(Volume);
