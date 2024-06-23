import { type FC, useEffect, useRef } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import Display from '@/components/icons/Display';
import Moon from '@/components/icons/Moon';
import Sun from '@/components/icons/Sun';
import type { IUIAppTheme } from '@/context/ui/interfaces';
import type { ISwitchTheme } from './interfaces';
import styles from './SwitchTheme.module.scss';

export const SwitchTheme: FC<ISwitchTheme> = () => {
  const { appTheme, setAppTheme } = useTheme();

  const menu = useRef<Menu>(null);

  useEffect(() => {
    const localStorageTheme = localStorage.getItem('appTheme');
    if (localStorageTheme) {
      setAppTheme(localStorageTheme as IUIAppTheme);
    }
  }, [setAppTheme]);

  const menuItems = [
    {
      label: 'Light',
      icon: options => <Sun {...options.iconProps} />,
      command: () => {
        setAppTheme('light');
        localStorage.setItem('appTheme', 'light');
      },
    },
    {
      label: 'Dark',
      icon: options => <Moon {...options.iconProps} />,
      command: () => {
        setAppTheme('dark');
        localStorage.setItem('appTheme', 'dark');
      },
    },
    {
      label: 'OS Default',
      icon: options => <Display {...options.iconProps} />,
      command: () => {
        setAppTheme('default');
        localStorage.setItem('appTheme', 'default');
      },
    },
  ];

  const ButtonIcon = () => {
    switch (appTheme) {
      case 'light':
        return <Sun width={20} height={20} className={styles.switch__icon} />;
      case 'dark':
        return <Moon width={20} height={20} className={styles.switch__icon} />;
      default:
        return (
          <Display width={20} height={20} className={styles.switch__icon} />
        );
    }
  };

  return (
    <div className={styles.switch}>
      <Button
        className='leading-none p-2'
        text
        type='button'
        aria-label='Theme switcher'
        onClick={event => menu.current?.toggle(event)}
        icon={() => <ButtonIcon />}
      />

      <Menu popup model={menuItems} ref={menu} />
    </div>
  );
};
