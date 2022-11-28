import { useEffect, useState } from 'react';
import styles from './DisplayAndBrightness.module.scss';
import { observer } from 'mobx-react-lite';
import { OptionsMenuItemId } from 'store/SettingsStore';
import classNames from 'classnames';
import pointerListenersMaker from 'helpers/PointerListeners';
import { useStore } from 'context/store';
import Type from 'component/CarthingUIComponents/Type/Type';
import { greenLight } from 'style/Variables';

const DisplayAndBrightness = () => {
  const [pressed, setPressed] = useState(false);

  const uiState = useStore().settingsStore.displayAndBrightnessUiState;

  useEffect(() => {
    uiState.logImpression();
  }, [uiState]);

  return (
    <>
      <div className={styles.header}>
        <span
          data-testid={`${OptionsMenuItemId.DISPLAY_AND_BRIGHTNESS}-header`}
        >
          <Type name="altoBold">显示与亮度</Type>
        </span>
      </div>
      <div className={styles.container}>
        <div
          className={classNames(styles.notification, {
            [styles.pressed]: pressed,
          })}
          {...pointerListenersMaker(setPressed)}
          onClick={() => uiState.handleClickToggle()}
        >
          <Type name="canonBold">夜航模式</Type>
          <Type
            name="canonBold"
            textColor={uiState.isNightMode && greenLight}
            dataTestId="night-mode-toggle"
          >
            {uiState.isNightMode ? '开' : '关'}
          </Type>
        </div>
        <Type name="celloBook" className={styles.text}>
          当夜航模式启动后，屏幕将对低光条件下的显示效果进行优化，您会获得更好的夜间使用效果。
        </Type>
      </div>
    </>
  );
};

export default observer(DisplayAndBrightness);
