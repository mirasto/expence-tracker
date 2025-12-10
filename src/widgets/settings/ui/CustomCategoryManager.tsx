import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/app/providers/store/store';
import { addCustomCategory, removeCustomCategory, CustomCategory } from '@/entities/settings/model/slice';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import * as Popover from '@radix-ui/react-popover';
import { Plus, X, ShoppingCart, Car, Home, Zap, Coffee, Heart, Briefcase, Plane, Gift, Music, Smartphone, Book, Star } from 'lucide-react';
import styles from './Settings.module.scss';

const AVAILABLE_ICONS = [
  { name: 'shopping-cart', icon: ShoppingCart },
  { name: 'car', icon: Car },
  { name: 'home', icon: Home },
  { name: 'zap', icon: Zap },
  { name: 'coffee', icon: Coffee },
  { name: 'heart', icon: Heart },
  { name: 'briefcase', icon: Briefcase },
  { name: 'plane', icon: Plane },
  { name: 'gift', icon: Gift },
  { name: 'music', icon: Music },
  { name: 'smartphone', icon: Smartphone },
  { name: 'book', icon: Book },
  { name: 'star', icon: Star },
];

export const CustomCategoryManager = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const customCategories = useAppSelector((state) => state.settings.customCategories);
  
  const [isOpen, setIsOpen] = useState(false);
  const [newCategory, setNewCategory] = useState<Partial<CustomCategory>>({
    name: '',
    color: '#4f46e5',
    icon: 'star',
  });

  const handleAdd = () => {
    if (newCategory.name && newCategory.icon && newCategory.color) {
      dispatch(addCustomCategory({
        id: crypto.randomUUID(),
        name: newCategory.name,
        color: newCategory.color,
        icon: newCategory.icon,
      } as CustomCategory));
      setNewCategory({ name: '', color: '#4f46e5', icon: 'star' });
      setIsOpen(false);
    }
  };

  const getIconComponent = (iconName: string) => {
    const found = AVAILABLE_ICONS.find(i => i.name === iconName);
    const Icon = found ? found.icon : Star;
    return <Icon size={16} />;
  };

  return (
    <div className={styles.categoriesContainer}>
      <div className={styles.categoryList}>
        {customCategories.map((cat) => (
          <div key={cat.id} className={styles.categoryTag} style={{ borderColor: cat.color }}>
            <span style={{ color: cat.color }}>{getIconComponent(cat.icon)}</span>
            <span>{cat.name}</span>
            <button 
              className={styles.removeBtn}
              onClick={() => dispatch(removeCustomCategory(cat.id))}
            >
              <X size={14} />
            </button>
          </div>
        ))}
        {customCategories.length === 0 && (
          <div className={styles.emptyCategories}>
            {t('settings.noCustomCategories', 'No custom categories added')}
          </div>
        )}
      </div>

      <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger asChild>
          <Button variant="outline" size="sm">
            <Plus size={16} style={{ marginRight: 8 }} />
            {t('settings.addCategory', 'Add Category')}
          </Button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className={styles.popoverContent} sideOffset={5}>
            <div className={styles.popoverHeader}>
              <h3>{t('settings.newCategory', 'New Category')}</h3>
              <button className={styles.closeBtn} onClick={() => setIsOpen(false)}><X size={16} /></button>
            </div>
            
            <div className={styles.popoverForm}>
              <Input 
                placeholder="Category Name"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              />
              
              <div className={styles.colorRow}>
                <label>{t('settings.color', 'Color')}</label>
                <input 
                  type="color" 
                  value={newCategory.color}
                  onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                  className={styles.colorInput}
                />
              </div>

              <div className={styles.iconGrid}>
                {AVAILABLE_ICONS.map(({ name, icon: Icon }) => (
                  <button
                    key={name}
                    className={`${styles.iconBtn} ${newCategory.icon === name ? styles.active : ''}`}
                    onClick={() => setNewCategory({ ...newCategory, icon: name })}
                    type="button"
                  >
                    <Icon size={16} />
                  </button>
                ))}
              </div>

              <Button onClick={handleAdd} disabled={!newCategory.name} fullWidth>
                {t('common.add')}
              </Button>
            </div>
            <Popover.Arrow className={styles.popoverArrow} />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
};
