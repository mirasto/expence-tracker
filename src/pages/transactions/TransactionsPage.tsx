import { useTranslation } from 'react-i18next';
import { AddTransaction } from '@/features/transaction/add-transaction/ui/AddTransaction';
import { TransactionList } from '@/widgets/transaction-list/ui/TransactionList';

export const TransactionsPage = () => {
  const { t } = useTranslation();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h2>{t('transactions.title')}</h2>
        <AddTransaction />
      </div>

      <div style={{ marginBottom: '24px' }}>
        {/* Filters will go here */}
      </div>

      <TransactionList />
    </div>
  );
};
