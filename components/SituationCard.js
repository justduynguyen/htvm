import {
  Typography,
  Dialog,
  DialogBody,
  Button,
} from '@material-tailwind/react';
import { useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import ReactPlayer from 'react-player/lazy';
import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline';

const getVideoURL = (url) => {
  return url
    .replace('file/d/', 'uc?id=')
    .replace('/view?usp=share_link', '')
    .replace('/view?usp=sharing', '');
};

export default function SituationCard({ index, url }) {
  const [open, setOpen] = useState(false);
  const [isCounting, setIsCounting] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  return (
    <>
      <div
        className='flex flex-col items-center justify-center w-full h-full cursor-pointer'
        style={{
          backgroundImage: "url('/situation.png')",
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        onClick={() => setOpen(true)}
      >
        <Typography className='uppercase text-[40px] font-bold'>{`Tình huống ${
          index + 1
        }`}</Typography>
      </div>
      <Dialog
        open={open}
        size='lg'
        handler={() => setOpen(false)}
        className='h-[75vh]'
      >
        <div
          className='flex items-center justify-center w-[550px] z-10 h-[80px] absolute left-1/2 -translate-x-1/2 -translate-y-1/2'
          style={{
            backgroundImage: "url('/situation-2.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <Typography className='uppercase text-[40px] text-white font-bold'>{`Tình huống ${
            index + 1
          }`}</Typography>
        </div>
        <DialogBody className='relative bg-white rounded-[12px] h-full flex flex-col items-center justify-center'>
          <div className='absolute top-0 right-0 translate-x-[250px] -translate-y-1/2 bg-[#EDECEC] rounded-full'>
            <CountdownCircleTimer
              isPlaying={isCounting}
              key={timerKey}
              duration={180}
              colors={'#EC1C24'}
              size={150}
              onComplete={() => setIsCounting(false)}
            >
              {({ remainingTime }) => (
                <Typography className='text-5xl font-bold text-black'>
                  {remainingTime}
                </Typography>
              )}
            </CountdownCircleTimer>
          </div>
          <ReactPlayer
            url={getVideoURL(url)}
            width={'100%'}
            height={'80%'}
            controls
          />
          <div className='absolute flex items-center justify-between w-[97%] bottom-4'>
            <Button
              className='bg-red-500 w-[150px] h-[60px] flex items-center justify-center border-2 border-white'
              onClick={() => {
                setTimerKey((prev) => prev + 1);
                if (!isCounting) {
                  setIsCounting(true);
                } else {
                  setIsCounting(false);
                }
              }}
            >
              <Typography className='text-xl font-semibold'>
                {isCounting ? 'Dừng lại' : 'Bắt đầu'}
              </Typography>
            </Button>
            <Button
              className='bg-primary-dark h-[60px] flex items-center justify-center border-2 border-white'
              onClick={() => setOpen(false)}
            >
              <Typography className='text-xl font-semibold'>
                Tiếp tục
              </Typography>
              <ChevronDoubleRightIcon className='w-5 h-5 ml-2' />
            </Button>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
