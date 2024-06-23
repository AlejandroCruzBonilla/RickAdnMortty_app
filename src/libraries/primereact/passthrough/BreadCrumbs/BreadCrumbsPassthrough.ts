import classNames from 'classnames';

export const breadcrumb = {
  root: {
    className: classNames('overflow-x-auto', 'py-2'),
  },
  menu: { className: 'm-0 p-0 list-none flex items-center flex-nowrap' },
  action: {
    className: classNames('text-decoration-none flex items-center'),
  },
  home: { className: 'hover:text-primary' },
  menuitem: {className: 'hover:text-primary' },
  icon: { className: '' },
  separator: {
    className: classNames(
      'mx-1 text-gray-600 dark:text-white/70',
      'flex items-center'
    ),
  },
};
