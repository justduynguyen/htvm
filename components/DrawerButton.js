import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import classNames from 'classnames';

import StarCircle from '../public/star-circle.svg';

export default function DrawerButton({ onClick }) {
  return (
    <button
      className={classNames(
        'w-[182px] h-[52px] !absolute left-0 top-1/2 rotate-90 translate-x-[-65px] -translate-y-1/2', //translateX = - (width - height) / 2
        'bg-black text-white flex justify-center items-center normal-case',
        'opacity-20 hover:opacity-40 rounded-t-[32px]'
      )}
      onClick={onClick}
    >
      <Typography className='text-xl mr-2 font-semibold'>Tổng điểm</Typography>
      <Image
        className='mt-1'
        src={StarCircle}
        alt='star'
        width={24}
        height={24}
      />
    </button>
  );
}
