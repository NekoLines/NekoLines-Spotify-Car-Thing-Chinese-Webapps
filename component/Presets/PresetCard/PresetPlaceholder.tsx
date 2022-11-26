import { observer } from 'mobx-react-lite';
import styles from 'component/Presets/PresetCard/PresetPlaceholder.module.scss';
import Type from 'component/CarthingUIComponents/Type/Type';
import classNames from 'classnames';

type Props = {
  isFocused: boolean;
};
const PresetPlaceholder = ({ isFocused }: Props) => {
  return (
    <div className={styles.presetPlaceholder}>
      <Type
        name="mestroBold"
        className={classNames(styles.title, { [styles.active]: isFocused })}
      >
        按住预设按钮来保存正在播放的内容
      </Type>
    </div>
  );
};

export default observer(PresetPlaceholder);
