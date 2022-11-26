import styles from './InlineTipItem.module.scss';
import { ShelfItem } from 'store/ShelfStore';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import Type from 'component/CarthingUIComponents/Type/Type';
import { useStore } from 'context/store';

type Props = {
  item: ShelfItem;
  isActive: boolean;
};

export const TITLES = {
  // backticks intended
  playlists: '您没有关注任何歌单',
  podcasts: '您没有关注任何播客和节目',
  artists: '您没有关注任何艺人',
  albums: '您没有保存任何专辑',
  voice: '此处将显示语音结果',
};

const VOICE_TIPS = {
  playlists: '“Hey Spotify, like this playlist” 或点击喜爱以添加到列表。',
  podcasts: '“Hey Spotify, follow this podcast” 或点击喜爱以添加到列表。',
  artists: '“Hey Spotify, follow this artist” 或点击喜爱以添加到列表。',
  albums: '“Hey Spotify, like this album” 或点击喜爱以添加到列表。',
  voice: '或点击麦克风按钮提出您的要求',
};

const InlineTipItem = ({ item, isActive }: Props) => {
  const uiState = useStore().shelfStore.shelfController.shelfSwiperItemUiState;
  const categoryTitle = uiState.getcategoryItemTitle(item.category);

  if (!categoryTitle) {
    return <div />;
  }

  const isHidden = uiState.isHidden(item);
  const isLeft = uiState.isLeftItem(item);
  const isVoiceTip = uiState.isVoiceTextPlaceholder(item);

  const title = TITLES[categoryTitle];
  const trySaying = isVoiceTip ? '说 “Hey Spotify” ' : '尝试说: ';
  const subtitle = VOICE_TIPS[categoryTitle];

  return (
    <div
      data-testid={isActive ? 'selected-item-title' : ''}
      className={classNames(styles.inlineTipItem, {
        [styles.toTheLeft]: isLeft,
        [styles.hidden]: isHidden,
        [styles.voiceTip]: isVoiceTip,
      })}
    >
      <Type name="brioBold">{title}</Type>
      <div className={styles.subtitle}>
        <Type name="celloBook">
          <span className={styles.tryThis}>{trySaying}</span>
          {subtitle}
        </Type>
      </div>
    </div>
  );
};

export default observer(InlineTipItem);
