import {
  ButtonPrimary,
  ButtonSecondary,
  FormToggle,
} from '@spotify-internal/encore-web';
import styles from './DevOptions.module.scss';
import { observer } from 'mobx-react-lite';
import { FETCH_IMAGES, OTA_NONE_CRITICAL_OPTION } from 'store/DevOptionsStore';
import { useStore } from 'context/store';
import { action } from 'mobx';

const DevOptions = () => {
  const { devOptionsStore } = useStore();

  const handleChange = (event, info: string) => {
    const isChecked = event.target.checked;
    switch (info) {
      case OTA_NONE_CRITICAL_OPTION:
        devOptionsStore.setOtaNoneCriticalOption(isChecked);
        break;
      case FETCH_IMAGES:
        devOptionsStore.setImageFetchEnabled(isChecked);
        break;
      default:
        break;
    }
  };

  return (
    <div data-testid="dev-options" className={styles.devOptions}>
      <div className={styles.title}>开发人员选项</div>
      <div className={styles.options}>
        <FormToggle
          onChange={(event) => handleChange(event, FETCH_IMAGES)}
          checked={devOptionsStore.imageFetchEnabled}
          className={styles.devOptionsToggle}
        >
          读取 Images
        </FormToggle>
        <label htmlFor="alert-threshold" className={styles.devOptionsCounting}>
          <p>气流干扰阈值: </p>
          <span>{devOptionsStore.windAlertThreshold}</span>
          <section>
            <ButtonSecondary
              buttonSize="sm"
              onClick={action(() =>
                devOptionsStore.handleCountWindThreshold(1),
              )}
            >
              +
            </ButtonSecondary>
            <ButtonSecondary
              buttonSize="sm"
              onClick={action(() =>
                devOptionsStore.handleCountWindThreshold(-1),
              )}
            >
              -
            </ButtonSecondary>
          </section>
        </label>
        <label htmlFor="cache-size" className={styles.devOptionsCounting}>
          <p>Image 缓存尺寸: </p>
          <span>{devOptionsStore.imageCacheSize}</span>
          <section id="cache-size">
            <ButtonSecondary
              buttonSize="sm"
              onClick={action(() => devOptionsStore.setImageStoreCacheSize(25))}
            >
              +
            </ButtonSecondary>
            <ButtonSecondary
              buttonSize="sm"
              onClick={action(() =>
                devOptionsStore.setImageStoreCacheSize(-25),
              )}
            >
              -
            </ButtonSecondary>
          </section>
        </label>
        <ButtonPrimary
          className={styles.requestTipBtn}
          onClick={devOptionsStore.getNewTip}
        >
          请求新诀窍
        </ButtonPrimary>
        <ButtonPrimary
          className={styles.requestTipBtn}
          onClick={devOptionsStore.clearLocalStorage}
        >
          清理本地存储
        </ButtonPrimary>
      </div>
      <table className={styles.statsTable}>
        <tbody>
          <tr>
            <td>当前缓存中的 Images:</td>
            <td>{devOptionsStore.imagesInCache()}</td>
          </tr>
          <tr>
            <td>Images 总数:</td>
            <td>{devOptionsStore.imagesLoaded}</td>
          </tr>
          <tr>
            <td>驳回在:</td>
            <td>{devOptionsStore.alertDismissedAt}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default observer(DevOptions);
