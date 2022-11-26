import npvTipsStyles from 'component/Npv/Tips/Tips.module.scss';
import styles from './TipsOnDemand.module.scss';
import { observer } from 'mobx-react-lite';
import { useStore } from 'context/store';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import classnames from 'classnames';
import pointerListenersMaker from 'helpers/PointerListeners';
import { Button, ButtonType, Type } from 'component/CarthingUIComponents';
import { TipsOnDemandUiState } from 'component/Settings/TipsOnDemand/TipsOnDemandUiState';

const tipOnDemandTransitionClasses = {
  enter: styles.tipOnDemandEnter,
  enterActive: styles.tipOnDemandEnterActive,
  exit: styles.tipOnDemandExit,
  exitActive: styles.tipOnDemandExitActive,
};

const TipsOnDemandError = ({ uiState }: { uiState: TipsOnDemandUiState }) => {
  useEffect(() => {
    uiState.handleErrorViewMount();
  }, [uiState]);

  return (
    <div className={styles.error}>
      <Type name="brioBold">当前无法获取诀窍</Type>
      <Type name="celloBook">
        您可能已经失去了同手机的链接或当前网络不佳，请稍后重试。
      </Type>
      <Button
        onClick={uiState.handleConfirmError}
        type={ButtonType.BUTTON_PRIMARY}
      >
        确定
      </Button>
    </div>
  );
};

const getSecondsSince = (thenRef: MutableRefObject<number>): number => {
  return Math.round((Date.now() - thenRef.current) / 1000);
};

const TipsOnDemand = () => {
  const uiState = useStore().settingsStore.tipsOnDemandUiState;
  const [pressed, setPressed] = useState<boolean>(false);
  const viewOpened = useRef<number>(0);
  const currentTipShown = useRef<number>(0);

  useEffect(() => {
    viewOpened.current = Date.now();
    uiState.handleMount();
    return () =>
      uiState.handleUnmount(
        getSecondsSince(currentTipShown),
        getSecondsSince(viewOpened),
      );
  }, [uiState]);

  useEffect(() => {
    currentTipShown.current = Date.now();
  }, [uiState.tip]);

  return (
    <div className={styles.background}>
      {uiState.isError ? (
        <TipsOnDemandError uiState={uiState} />
      ) : (
        <div className={styles.tipsOnDemand}>
          <div>
            <SwitchTransition>
              <CSSTransition
                key={uiState.tip?.description}
                timeout={300}
                classNames={tipOnDemandTransitionClasses}
              >
                <div>
                  <Type name="canonBold" className={npvTipsStyles.title}>
                    {uiState.tip?.title}
                  </Type>
                  <Type name="brioBold" className={npvTipsStyles.description}>
                    {uiState.tip?.description}
                  </Type>
                </div>
              </CSSTransition>
            </SwitchTransition>
          </div>
          <div
            className={styles.buttonContainer}
            onPointerDown={() => {
              uiState.nextTip(getSecondsSince(currentTipShown));
            }}
          >
            <div
              className={classnames(styles.nextButton, {
                [styles.pressed]: pressed,
              })}
              {...pointerListenersMaker(setPressed)}
            >
              <Type textColor="white" name="celloBook">
                继续
              </Type>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default observer(TipsOnDemand);
