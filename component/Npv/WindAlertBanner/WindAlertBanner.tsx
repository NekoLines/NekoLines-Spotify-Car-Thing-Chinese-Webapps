import { observer } from 'mobx-react-lite';
import { useStore } from 'context/store';
import Banner from 'component/CarthingUIComponents/Banner/Banner';
import BannerButton from 'component/CarthingUIComponents/Banner/BannerButton';
import { IconWind32 } from 'component/CarthingUIComponents';
import { useEffect } from 'react';
import { runInAction } from 'mobx';

const WindAlertBanner = () => {
  const uiState =
    useStore().airVentInterferenceController.windAlertBannerUiState;

  useEffect(() => {
    runInAction(() => {
      if (uiState.shouldShowAlert) {
        uiState.logImpression();
      }
    });
  }, [uiState]);

  const infoText = '您的气流干扰程度已超过阈值。';

  const icon = <IconWind32 />;

  return (
    <Banner show={uiState.shouldShowAlert} icon={icon} infoText={infoText}>
      <BannerButton
        text="修复指南"
        withDivider
        onClick={() => uiState.handleClickHowToFix()}
      />
      <BannerButton
        text="隐藏"
        withDivider
        onClick={() => uiState.handleClickHide()}
      />
    </Banner>
  );
};

export default observer(WindAlertBanner);
