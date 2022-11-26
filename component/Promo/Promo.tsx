import styles from './Promo.module.scss';
import Type from 'component/CarthingUIComponents/Type/Type';
import { Button, ButtonType } from 'component/CarthingUIComponents';
// import phoneCallImage from './images/phone-call.png'; (not worth configuring rollup to get this to work)
// import otherMediaImage from './images/other-media.png';
import { Promo as PromoType } from 'component/Promo/PromoController';
import { useStore } from 'context/store';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

type PromoContent = {
  title: string;
  text: string;
  buttonText: string;
  image: string;
  optionText?: string;
};

const PROMOS: Record<PromoType, PromoContent> = {
  other_media: {
    title: '不仅是 Spotify',
    text: '您也可以使用 Car Thing 来控制其他媒体服务的播放。',
    buttonText: '了解',
    image: "/media/other-media.83237a6ee7e62a4fb53b.png",
  },
  phone_calls: {
    title: '手机通话',
    buttonText: '了解',
    image: "/images/phone-call.png", // can't find the actual file???
    text: '您的通话也可以在 Car Thing 上进行显示，在设置中了解更多信息或关闭该功能。',
    optionText: '设置',
  },
};

export type Props = {
  promo: PromoType;
  onClickButton: () => void;
  onClickOption: () => void;
};
export const Promo = ({ promo, onClickButton, onClickOption }: Props) => {
  const content = PROMOS[promo];
  return (
    <div className={styles.promo}>
      <div className={styles.textAndConfirm}>
        <Type name="brioBold" className={styles.text}>
          {content.title}
        </Type>
        <Type name="celloBook" className={styles.subText}>
          {content.text}
        </Type>
        <Button
          type={ButtonType.BUTTON_PRIMARY}
          onClick={onClickButton}
          className={styles.confirmButton}
          highlightOnDialPress={false}
        >
          {content.buttonText}
        </Button>
      </div>
      <div className={styles.imageAndOption}>
        <img className={styles.image} alt="" src={content.image} />
        {content.optionText && (
          <div className={styles.optionButtonWrapper}>
            <Button type={ButtonType.BUTTON_PRIMARY} onClick={onClickOption}>
              {content.optionText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const PromoWrapper = () => {
  const promoController = useStore().promoController;
  const promo = promoController.nextPromoToShow;

  useEffect(() => {
    promoController.handlePromoShowing();

    return () => promoController.handlePromoDisappearing();
  });

  // to keep the component rendered while transitioning out. nextPromoToShow will become undefined immediately.
  const [promoCache] = useState<PromoType>(promo!);

  return (
    <Promo
      promo={promoCache}
      onClickButton={() =>
        promoController.handlePromoConfirmationSelected(promoCache)
      }
      onClickOption={() =>
        promoController.handlePromoOptionSelected(promoCache)
      }
    />
  );
};

export default observer(PromoWrapper);
