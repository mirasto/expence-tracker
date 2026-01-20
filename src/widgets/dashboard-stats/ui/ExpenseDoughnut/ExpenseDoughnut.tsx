import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Transaction } from '@/entities/transaction/model/types';
import { Card } from '@/shared/ui/Card/Card';
import clsx from 'clsx';
import styles from './ExpenseDoughnut.module.scss';

interface ExpenseDoughnutProps {
  transactions: Transaction[];
}

const COLORS = [
  'var(--chart-1)', 
  'var(--chart-2)', 
  'var(--chart-3)', 
  'var(--chart-4)', 
  'var(--chart-5)', 
  'var(--chart-6)'
];

export const ExpenseDoughnut = ({ transactions }: ExpenseDoughnutProps) => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const { data, totalSpent, hasHiddenCategories } = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const total = expenses.reduce((acc, t) => acc + t.amount, 0);
    
    const grouped = expenses.reduce((acc, t) => {
      const existing = acc.find(item => item.name === t.category);
      if (existing) {
        existing.value += t.amount;
      } else {
        acc.push({ name: t.category, value: t.amount });
      }
      return acc;
    }, [] as { name: string; value: number }[]);

    const sorted = grouped
      .sort((a, b) => b.value - a.value);

    // Grouping logic for excessive data points (Requirement 4)
    // We limit to 5 categories + "Other" to ensure it fits in viewport (Requirement 1)
    const MAX_VISIBLE_CATEGORIES = 5;
    let finalData = sorted;
    let hasHidden = false;

    if (sorted.length > MAX_VISIBLE_CATEGORIES) {
      const visible = sorted.slice(0, MAX_VISIBLE_CATEGORIES);
      const hidden = sorted.slice(MAX_VISIBLE_CATEGORIES);
      const otherValue = hidden.reduce((sum, item) => sum + item.value, 0);
      
      finalData = [
        ...visible,
        { name: 'other', value: otherValue }
      ];
      hasHidden = true;
    }

    const dataWithPercentage = finalData.map(item => ({
      ...item,
      percentage: ((item.value / total) * 100).toFixed(1)
    }));

    return { data: dataWithPercentage, totalSpent: total, hasHiddenCategories: hasHidden };
  }, [transactions]);

  if (data.length === 0) {
    return (
      <Card className={styles.container}>
        <h3>{t('dashboard.expensesByCategory')}</h3>
        <div className={styles.empty}>{t('dashboard.noData')}</div>
      </Card>
    );
  }

  return (
    <Card className={styles.container}>
      <h3 className={styles.title}>{t('dashboard.expensesByCategory')}</h3>
      
      <div className={styles.content}>
        <div className={styles.chartWrapper}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    className={styles.cell}
                    stroke="none"
                    style={{
                      opacity: activeIndex === null || activeIndex === index ? 1 : 0.3,
                      transition: 'opacity 0.3s ease'
                    }}
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => `$${value.toFixed(2)}`}
                contentStyle={{ 
                  backgroundColor: 'var(--color-surface)', 
                  borderColor: 'var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-md)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          
          <div className={styles.centerLabel}>
            <span className={styles.centerLabelTitle}>Total</span>
            <span className={styles.centerLabelAmount}>${totalSpent.toFixed(0)}</span>
          </div>
        </div>

        <div className={styles.legend}>
          {data.map((entry, index) => (
            <div 
              key={entry.name} 
              className={clsx(styles.legendItem, activeIndex === index && styles.active)}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className={styles.legendInfo}>
                <span 
                  className={styles.legendColor} 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }} 
                />
                <span className={styles.legendName} title={t(`transactions.categories.${entry.name}`)}>
                  {t(`transactions.categories.${entry.name}`)}
                </span>
              </div>
              <div className={styles.legendStats}>
                <span className={styles.legendPercent}>{entry.percentage}%</span>
                <span className={styles.legendValue}>${entry.value.toFixed(0)}</span>
              </div>
            </div>
          ))}
          
          {hasHiddenCategories && (
            <div className={styles.limitIndicator}>
              * {t('dashboard.categoriesGrouped', 'Some categories grouped into "Other"')}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
