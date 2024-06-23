import classNames from 'classnames';
import styles from './Menu.module.scss';

export const menu = {
  root: {
    className: classNames(styles.menu),
  },
  menu: {
    className: classNames(''),
  },
  content: ({ state }) => {
    return {
      className: classNames({
        '': state.focused,
      }),
    };
  },

  action: {
    className: classNames(styles.menu__action),
  },
  menuitem: {
    className: classNames(''),
  },
  icon: { className: classNames(styles.menu__icon) },
  submenuheader: {
    className: classNames(
      'm-0 p-3 text-gray-700 dark:text-white/80 bg-white dark:bg-gray-900 font-bold rounded-tl-none rounded-tr-none'
    ),
  },
  transition: {
    timeout: 150,
    classNames: {
      enter: 'opacity-0 scale-75',
      enterActive:
        'opacity-100 !scale-100 transition-transform transition-opacity duration-150 ease-in',
      exit: 'opacity-100',
      exitActive: '!opacity-0 transition-opacity duration-150 ease-linear',
    },
  },
};
