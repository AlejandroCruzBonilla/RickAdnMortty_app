import classNames from 'classnames';

import styles from './Menubar.module.scss';

export const menubar = {
  root: {
    className: classNames(styles.navbar),
  },
  menu: ({ state }) => ({
    className: classNames(styles.navbar__menu, {
      hidden: !state.mobileActive,
      flex: state.mobileActive,
    }),
  }),
  menuitem: ({ context }) => ({
    className: classNames(styles.navbar__menu_item, {
      [styles.navbar__submenu__active]: context.active,
    }),
  }),
  action: comp => {
    const { context } = comp;
    return {
      className: classNames(
        styles.navbar__action,
        {
          'hover:text-primary dark:hover:text-primary': !context.active,
        },
        {
          'pl-8 lg:pl-5': context.level === 1,
          'pl-12 lg:pl-5': context.level === 2,
          'pl-16 lg:pl-5': context.level === 3,
          'pl-20 lg:pl-5': context.level === 4,
        }
      ),
    };
  },
  content: comp => {
    const { context } = comp;

    return {
      className: classNames(
        {
          'bg-primary': context.active,
          'hover:text-primary': !context.active,
        },
        {
          'pl-4 lg:pl-0': context.level === 1,
          'pl-8 lg:pl-0': context.level === 2,
          'pl-12 lg:pl-0': context.level === 3,
          'pl-16 lg:pl-0': context.level === 4,
        }
      ),
    };
  },
  icon: { className: classNames('mr-2') },
  submenuicon: ({ props }) => ({
    className: classNames({
      'ml-auto lg:ml-2': props.root,
      'ml-auto': !props.root,
    }),
  }),
  submenu: () => {
    return {
      className: classNames(styles.navbar__submenu),
    };
  },
  separator: {
    className: classNames(
      'border-t border-gray-300 dark:border-blue-900/40 my-1'
    ),
  },
  button: {
    className: classNames(styles.navbar__button),
  },
  end: { className: classNames('m-0') },
};
