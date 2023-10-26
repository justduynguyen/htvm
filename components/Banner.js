import { Typography } from '@material-tailwind/react';

export default function Banner({ title, header = 'Hành trình văn minh' }) {
  return (
    <div
      className='absolute top-7 w-[1000px] h-[104px]  flex justify-center items-center'
      style={{
        backgroundImage: "url('/Header.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div>
        <Typography className='font-bold text-[42px] text-white uppercase'>
          {header}
        </Typography>
        <Typography className='text-[22px] text-white uppercase'>
          {title}
        </Typography>
      </div>
    </div>
  );
}
