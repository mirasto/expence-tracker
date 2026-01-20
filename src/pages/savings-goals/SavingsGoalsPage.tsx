
import { useTranslation } from 'react-i18next';
import { SavingsGoalList } from '@/widgets/savings-goal-list/ui/SavingsGoalList';
import { AddSavingsGoalModal } from '@/features/savings-goal/add-savings-goal/ui/AddSavingsGoalModal';
import styles from './SavingsGoalsPage.module.scss';

export const SavingsGoalsPage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleSection}>
          <h1>{t('savings.title', 'Savings Goals')}</h1>
          <p>{t('savings.subtitle', 'Track your savings and reach your targets')}</p>
        </div>
        <AddSavingsGoalModal />
      </header>

      <SavingsGoalList />
    </div>
  );
};
