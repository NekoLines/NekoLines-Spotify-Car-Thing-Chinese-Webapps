import styles from 'component/Queue/QueueEmptyState/EmptyQueueState.module.scss';

import Type from 'component/CarthingUIComponents/Type/Type';

const EmptyQueueState = () => {
  return (
    <div className={styles.emptyBody} data-testid="empty-body">
      <Type className={styles.infoText} name="balladBook" textColor="gray-70">
        点击“添加到队列”图标，添加歌曲或播客集。
      </Type>
    </div>
  );
};

export default EmptyQueueState;
