import { observer } from 'mobx-react-lite';
import {
  Button,
  ButtonType,
  IconPublic,
  Type,
} from 'component/CarthingUIComponents';
import styles from './NoNetwork.module.scss';
import { useStore } from 'context/store';

type Props = {
  onAcknowledgeClick: () => void;
};

export const NoNetwork = ({ onAcknowledgeClick }: Props): JSX.Element => (
  <div className={styles.noNetworkWrapper} data-testid="no_network-modal-type">
    <div className={styles.noNetwork}>
      <div className={styles.noNetworkContent}>
        <IconPublic iconSize={64} />
        <Type name="brioBold">网络未连接</Type>
        <Type name="celloBook">
          确保您的手机的“设置”中已打开网络功能。我们会在您恢复联机时通知您。
        </Type>
      </div>
      <Button onClick={onAcknowledgeClick} type={ButtonType.BUTTON_SECONDARY}>
        了解了
      </Button>
    </div>
  </div>
);

const NoNetworkContainer = (): JSX.Element => {
  const { overlayController } = useStore();

  function onAcknowledgeClick(): void {
    overlayController.overlayUiState.dismissedNoNetwork = true;
    overlayController.resetAndMaybeShowAModal();
  }

  return <NoNetwork onAcknowledgeClick={onAcknowledgeClick} />;
};

export default observer(NoNetworkContainer);
