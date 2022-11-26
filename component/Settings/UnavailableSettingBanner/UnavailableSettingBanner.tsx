import Banner from 'component/CarthingUIComponents/Banner/Banner';
import { useStore } from 'context/store';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { runInAction } from 'mobx';
import { IconInfo32 } from 'component/CarthingUIComponents';

const UnavailableSettingBanner = () => {
  const uiState = useStore().settingsStore.unavailableSettingsBannerUiState;

  useEffect(() => {
    runInAction(() => {
      if (uiState.shouldShowAlert) {
        uiState.logImpression();
      }
    });
  }, [uiState]);

  const infoText = '抱歉，部分配置在当前情况下不可用。';

  const icon = <IconInfo32 />;

  return (
    <Banner
      show={uiState.shouldShowAlert}
      icon={icon}
      infoText={infoText}
      colorStyle="unavailable"
    />
  );
};

export default observer(UnavailableSettingBanner);
