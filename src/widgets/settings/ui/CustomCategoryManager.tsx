import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/app/providers/store/store';
import { addCustomCategory, removeCustomCategory, CustomCategory } from '@/entities/settings/model/slice';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import * as Popover from '@radix-ui/react-popover';
import { Plus, X, ShoppingCart, Car, Home, Zap, Coffee, Heart, Briefcase, Plane, Gift, Music, Smartphone, Book, Star, Search, Trash2 } from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState('');
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
    return <Icon size={20} />;
  };

  const filteredCategories = customCategories.filter(cat => 
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.categoriesContainer}>
      <div className={styles.controls}>
        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} size={18} />
          <input 
            className={styles.searchInput}
            placeholder={t('common.search', 'Search categories...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
          <Popover.Trigger asChild>
            <Button variant="outline" size="sm" className={styles.addBtn}>
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

      <div className={styles.tableHeader}>
        <div className={styles.colIcon}>{t('common.icon', 'Icon')}</div>
        <div className={styles.colName}>{t('common.name', 'Name')}</div>
        <div className={styles.colColor}>{t('settings.color', 'Color')}</div>
        <div className={styles.colActions}>{t('common.actions', 'Actions')}</div>
      </div>

      <div className={styles.categoryList}>
        {filteredCategories.map((cat) => (
          <div key={cat.id} className={styles.categoryItem}>
            <div className={styles.itemIcon} style={{ color: cat.color }}>
              {getIconComponent(cat.icon)}
            </div>
            
            <div className={styles.itemContent}>
              <span className={styles.itemName}>{cat.name}</span>
              <div className={styles.itemColorIndicator} style={{ backgroundColor: cat.color }} />
            </div>

            <button 
              className={styles.removeBtn}
              onClick={() => dispatch(removeCustomCategory(cat.id))}
              aria-label={t('common.delete', 'Delete')}
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
        {filteredCategories.length === 0 && (
          <div className={styles.emptyCategories}>
            {searchQuery ? t('common.noResults', 'No matching categories') : t('settings.noCustomCategories', 'No custom categories added')}
          </div>
        )}
      </div>
    </div>
  );
};
