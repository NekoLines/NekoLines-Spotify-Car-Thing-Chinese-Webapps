import styles from './Tracklist.module.scss';
import { isPlaylistV1OrV2URI } from '@spotify-internal/uri';
import {
  isCollectionUri,
  isNewEpisodesUri,
  isYourEpisodesUri,
} from 'helpers/SpotifyUriUtil';

const getTextBasedOnUri = (uri: string): string => {
  if (isPlaylistV1OrV2URI(uri)) {
    return '没有歌曲添加到此歌单';
  } else if (isCollectionUri(uri)) {
    if (isYourEpisodesUri(uri)) {
      return "你收集的播客单集在这里。";
    } else if (isNewEpisodesUri(uri)) {
      return '一旦你关注了某个节目，这里就会出现新单集提醒。';
    }
    return '您喜欢的歌曲将出现在此处。';
  }

  return '';
};

const EmptyTracklistState = ({ contextUri }: { contextUri: string }) => {
  return (
    <div className={styles.emptyBody} data-testid="empty-body">
      <p>{getTextBasedOnUri(contextUri)}</p>
    </div>
  );
};

export default EmptyTracklistState;
