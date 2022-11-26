import Banner from '../../CarthingUIComponents/Banner/Banner';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../context/store';
import { IconPublic } from '../../CarthingUIComponents';
import { useEffect, useState } from 'react';
import { IconSize } from '@spotify-internal/encore-web/types/src/core/components/Icon/Svg';
import { IconCheck } from '@spotify-internal/encore-web';
import { runInAction } from 'mobx';

const BANNER_ICON_SIZE: IconSize = 32;
export const NETWORK_RESTORED_CONFIRMATION_DURATION_MS = 5_000;

function NoNetworkBanner(): JSX.Element {
  return (
    <Banner
      show
      infoText="没有网络。请确保您的手机已打开网络链接。"
      icon={<IconPublic iconSize={BANNER_ICON_SIZE} />}
    />
  );
}

export function NetworkRestoredBanner(): JSX.Element {
  return (
    <Banner
      show
      infoText="您已恢复网络连接，继续享受吧。"
      icon={<IconCheck iconSize={BANNER_ICON_SIZE} />}
      colorStyle="confirmation"
    />
  );
}

function NoNetworkBannerContainer(): JSX.Element {
  const { sessionStateStore } = useStore();
  const [showNoNetworkBanner, setShowNoNetworkBanner] =
    useState<boolean>(false);
  const [showNetworkRestoredBanner, setShowNetworkRestoredBanner] =
    useState<boolean>(false);

  useEffect(() => {
    runInAction(() => {
      if (sessionStateStore.isOffline && !showNoNetworkBanner) {
        setShowNoNetworkBanner(true);
      } else if (showNoNetworkBanner && !sessionStateStore.isOffline) {
        setShowNoNetworkBanner(false);
        setShowNetworkRestoredBanner(true);
        window.setTimeout(() => {
          setShowNetworkRestoredBanner(false);
        }, NETWORK_RESTORED_CONFIRMATION_DURATION_MS);
      }
    });
  }, [sessionStateStore.isOffline, showNoNetworkBanner]);

  if (showNoNetworkBanner) {
    return <NoNetworkBanner />;
  }
  if (showNetworkRestoredBanner) {
    return <NetworkRestoredBanner />;
  }
  return <></>;
}

export default observer(NoNetworkBannerContainer);
