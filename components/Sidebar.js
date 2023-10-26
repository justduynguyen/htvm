import React, { useRef } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { useOnClickOutside } from '../hooks/useOnClickOutside';
import {
  DocumentDuplicateIcon,
  Square3Stack3DIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';
import Cookies from 'js-cookie';
import { clearToken } from '@/redux/auth/auth-slice';
import { useDispatch } from 'react-redux';
const navItems = [
  {
    label: 'Quản lý câu hỏi',
    href: '/question',
    icon: <DocumentDuplicateIcon className='w-6 h-6' />,
  },
  {
    label: 'Quản lý bộ đề',
    href: '/topic',
    icon: <Square3Stack3DIcon className='w-6 h-6' />,
  },
];
const Sidebar = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  useOnClickOutside(ref, (e) => {
    setOpen(false);
  });

  const onLogOut = () => {
    Cookies.remove('token');
    dispatch(clearToken());
  };
  return (
    <div
      className={classNames({
        'flex flex-col justify-between': true, // layout
        'bg-indigo-700 text-zinc-50': true, // colors
        'md:w-full md:sticky md:top-16 md:z-0 top-0 z-20 fixed': true, // positioning
        'md:h-[calc(100vh_-_64px)] h-full w-[250px]': true, // for height and width
        'transition-transform .3s ease-in-out md:-translate-x-0': true, //animations
        '-translate-x-full ': !open, //hide sidebar to the left when closed
      })}
      ref={ref}
    >
      <nav className='top-0 md:sticky md:top-16'>
        {/* nav items */}
        <ul className='flex flex-col gap-2 py-2'>
          {navItems.map((item, index) => {
            return (
              <Link key={index} href={item.href}>
                <li
                  className={classNames({
                    'text-indigo-100 hover:bg-indigo-900': true, //colors
                    'flex gap-4 items-center ': true, //layout
                    'transition-colors duration-300': true, //animation
                    'rounded-md p-2 mx-2': true, //self style
                  })}
                >
                  {item.icon} {item.label}
                </li>
              </Link>
            );
          })}
          <li
            onClick={onLogOut}
            className={classNames({
              'text-indigo-100 hover:bg-indigo-900': true, //colors
              'flex gap-4 items-center ': true, //layout
              'transition-colors duration-300': true, //animation
              'rounded-md p-2 mx-2': true, //self style
            })}
          >
            <ArrowLeftOnRectangleIcon className='w-6 h-6' />
            Đăng xuất
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Sidebar;
