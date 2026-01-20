
import * as Dialog from '@radix-ui/react-dialog';
import styles from './ConfirmDialog.module.scss';
import { Button } from '@/shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  isLoading?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  isLoading
}) => {
  const { t } = useTranslation();

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content}>
          <Dialog.Title className={styles.title}>{title}</Dialog.Title>
          <Dialog.Description className={styles.description}>
            {description}
          </Dialog.Description>
          
          <div className={styles.actions}>
            <Dialog.Close asChild>
              <Button variant="ghost" onClick={onClose}>
                {t('common.cancel')}
              </Button>
            </Dialog.Close>
            <Button variant="danger" onClick={onConfirm} disabled={isLoading}>
              {isLoading ? t('common.loading') : t('common.confirm')}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
