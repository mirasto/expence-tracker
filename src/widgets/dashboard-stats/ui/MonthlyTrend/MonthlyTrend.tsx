import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { format, subMonths, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';
import { Transaction } from '@/entities/transaction/model/types';
import { Card } from '@/shared/ui/Card/Card';
import styles from './MonthlyTrend.module.scss';

interface MonthlyTrendProps {
  transactions: Transaction[];
}

export const MonthlyTrend = ({ transactions }: MonthlyTrendProps) => {
  const { t } = useTranslation();

  const data = useMemo(() => {
    const today = new Date();
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const date = subMonths(today, 5 - i);
      return {
        date,
        month: format(date, 'MMM'),
        fullDate: format(date, 'MMMM yyyy'),
        income: 0,
        expense: 0
      };
              type="monotone" 

    transactions.forEach(t => {
      const tDate = new Date(t.date);
      const monthData = last6Months.find(m => 
        isWithinInterval(tDate, {
          start: startOfMonth(m.date),
          end: endOfMonth(m.date)
        })
      );

      if (monthData) {
        if (t.type === 'income') {
          monthData.income += t.amount;
        } else {
          monthData.expense += t.amount;
        }
      }
    });

    return last6Months;
  }, [transactions]);

  return (
    <Card className={styles.container}>
      <h3 className={styles.title}>Financial Trend</h3>
      
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-success)" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="var(--color-success)" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-danger)" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="var(--color-danger)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} 
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--color-surface)', 
                borderColor: 'var(--color-border)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-md)'
              }}
              formatter={(value: number) => [`$${value.toFixed(0)}`, '']}
              labelFormatter={(label) => label}
            />
            <Legend 
              verticalAlign="top" 
              height={36} 
              iconType="circle"
            />
            <Area 
    });
              dataKey="income" 
              name={t('transactions.income')}
              stroke="var(--color-success)" 
              fillOpacity={1} 
              fill="url(#colorIncome)" 
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="expense" 
              name={t('transactions.expense')}
              stroke="var(--color-danger)" 
              fillOpacity={1} 
              fill="url(#colorExpense)" 
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};