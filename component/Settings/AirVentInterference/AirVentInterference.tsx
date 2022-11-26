import { useEffect, useRef, useState } from 'react';
import styles from './AirVentInterference.module.scss';
import { observer } from 'mobx-react-lite';
import { OptionsMenuItemId } from 'store/SettingsStore';
import classNames from 'classnames';
import pointerListenersMaker from 'helpers/PointerListeners';
import { IconWind32, Type } from 'component/CarthingUIComponents';
import { useStore } from 'context/store';

const CONTENT_HEIGHT = 490;
const NUMBER_OF_SCROLL_STEPS = 3;
const SCROLL_STEP_SIZE = CONTENT_HEIGHT / NUMBER_OF_SCROLL_STEPS;

const AirVentInterference = () => {
  const [pressed, setPressed] = useState(false);
  const aviContainerRef = useRef<HTMLDivElement>(null);

  const uiState =
    useStore().airVentInterferenceController.airVentInterferenceUiState;

  useEffect(() => {
    const onTouchEnd = () => {
      const scrollElement = aviContainerRef.current;
      if (scrollElement) {
        uiState.setAirVentInterferenceScrollStep(
          (scrollElement.scrollTop / CONTENT_HEIGHT) * NUMBER_OF_SCROLL_STEPS,
        );
      }
    };

    const onScroll = () => {
      const scrollElement = aviContainerRef.current;
      if (scrollElement) {
        const hitToBottom =
          scrollElement.scrollTop ===
          scrollElement.scrollHeight - scrollElement.offsetHeight;
        if (hitToBottom) {
          uiState.setAirVentInterferenceScrollStep(
            (scrollElement.scrollTop / CONTENT_HEIGHT) * NUMBER_OF_SCROLL_STEPS,
          );
        }
      }
    };

    uiState.logImpression();
    const scrollElement = aviContainerRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('touchend', onTouchEnd);
      scrollElement.addEventListener('scroll', onScroll);
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('touchend', onTouchEnd);
        scrollElement.removeEventListener('scroll', onScroll);
      }
      uiState.resetAirVentContainerScrollStep();
    };
  }, [uiState]);

  const scrollElement = aviContainerRef.current;

  if (uiState.airVentContainerScrollStep >= 0 && scrollElement) {
    const top = uiState.airVentContainerScrollStep * SCROLL_STEP_SIZE;

    scrollElement.scrollTo({
      top: top,
      behavior: 'smooth',
    });
  }

  return (
    <>
      <div className={styles.aviHeader}>
        <span data-testid={`${OptionsMenuItemId.AIR_VENT_INTERFERENCE}-header`}>
          <Type name="altoBold">气流干扰检测</Type>
        </span>
      </div>
      <div ref={aviContainerRef} className={styles.aviContainer}>
        <div
          className={classNames(
            styles.notification,
            {
              [styles.pressed]: pressed || uiState.highlightOption,
            },
            {
              [styles.focused]: uiState.isNotificationStep,
            },
          )}
          {...pointerListenersMaker(setPressed)}
          onClick={() => uiState.toggleNotification()}
          data-testid="avi-notification"
        >
          <p>允许气流干扰警报</p>
          <span
            data-testid="avi-notification-status"
            className={classNames({
              [styles.onOff]: !uiState.airVentAlertsDisabled,
            })}
          >
            {uiState.airVentAlertsDisabled ? '关' : '开'}
          </span>
        </div>
        <div className={styles.texts}>
          <p className={styles.intro}>
            过多的气流流经您的麦克风可能会干扰您的语音命令<br/>执行, 当我们检测到问题时，{' '}
            <IconWind32 /> 图标会出现在您屏幕<br/>的右上角上，如果发生这种情况请尝试：
          </p>
          <ul>
            <li>将 Car Thing 移动到气流的上方</li>
            <li>引导气流从 Car Thing 下方流过</li>
            <li>关闭附近的空调出风口</li>
            <li>使用不同的底座移动 Car Thing 位置</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default observer(AirVentInterference);
