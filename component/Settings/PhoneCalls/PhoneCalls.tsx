import { observer } from 'mobx-react-lite';
import SubmenuHeader from 'component/Settings/Submenu/SubmenuHeader';
import SubmenuItem from 'component/Settings/Submenu/SubmenuItem';
import { useEffect, useRef } from 'react';
import { useStore } from 'context/store';
import styles from './PhoneCalls.module.scss';
import Type from 'component/CarthingUIComponents/Type/Type';
import { NUMBER_OF_SCROLL_STEPS } from 'component/Settings/PhoneCalls/PhoneCallsUiState';

const CONTENT_HEIGHT = 300;
const SCROLL_STEP_SIZE = CONTENT_HEIGHT / NUMBER_OF_SCROLL_STEPS;

const PhoneCalls = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const uiState = useStore().settingsStore.phoneCallsUiState;

  useEffect(() => {
    const onTouchEnd = () => {
      const scrollElement = containerRef.current;
      if (scrollElement) {
        uiState.setPhoneCallsScrollStep(
          (scrollElement.scrollTop / CONTENT_HEIGHT) * NUMBER_OF_SCROLL_STEPS,
        );
      }
    };

    const onScroll = () => {
      const scrollElement = containerRef.current;
      if (scrollElement) {
        const hitToBottom =
          scrollElement.scrollTop ===
          scrollElement.scrollHeight - scrollElement.offsetHeight;
        if (hitToBottom) {
          uiState.setPhoneCallsScrollStep(
            (scrollElement.scrollTop / CONTENT_HEIGHT) * NUMBER_OF_SCROLL_STEPS,
          );
        }
      }
    };

    const scrollElement = containerRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('touchend', onTouchEnd);
      scrollElement.addEventListener('scroll', onScroll);
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('touchend', onTouchEnd);
        scrollElement.removeEventListener('scroll', onScroll);
      }
      uiState.resetScrollStep();
    };
  }, [uiState, containerRef]);

  const scrollElement = containerRef.current;

  if (uiState.scrollStep >= 0 && scrollElement) {
    const top = uiState.scrollStep * SCROLL_STEP_SIZE;

    scrollElement.scrollTo({
      top: top,
      behavior: 'smooth',
    });
  }

  return (
    <>
      <SubmenuHeader icon={null} name="Phone calls" />
      <div ref={containerRef} className={styles.scrollContainer}>
        <div className={styles.submenuItemWrapper}>
          <SubmenuItem
            active={uiState.isNotificationStep}
            item={uiState.phoneCallsSubmenuItem}
          />
        </div>
        <div className={styles.text}>
          <Type name="celloBook">
            如果打开，您将在屏幕上看到您的来电和呼出信息，并能够接听或拒绝来
            电。确保您的手机已连接到汽车的扬声器和麦克风。
            <br />
            <br />
            如果您的手机无法连接到汽车的麦克风，请将手机放得足够近，以便使用手机
            的麦克风。
          </Type>
        </div>
      </div>
    </>
  );
};

export default observer(PhoneCalls);
