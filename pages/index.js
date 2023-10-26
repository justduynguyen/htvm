import {
  Typography,
  Button,
  Input,
  IconButton,
  Chip,
} from '@material-tailwind/react';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import Banner from '@/components/Banner';
import { useRouter } from 'next/router';
import { ApiGetAllTopic } from '@/utils/endpoints';
import axios from 'axios';

const customStyles = {
  control: (base, state) => ({
    ...base,
    height: '64px',
    'min-height': '64px',
    'border-radius': 999,
  }),
};

export default function Home() {
  const [availableTopics, setAvailableTopics] = useState([]);
  const [topic, setTopic] = useState(null);
  const [name, setName] = useState('');
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await axios.get(ApiGetAllTopic);
        if (response?.data?.length > 0) {
          const topics = response.data
            .sort(
              (a, b) =>
                ('' + a.type).localeCompare(b.type) ||
                ('' + a.schoolLevel).localeCompare(b.schoolLevel)
            )
            .map(({ id, name }) => ({
              value: id,
              label: name,
            }));
          setAvailableTopics(topics);
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const isExistPlayer = players.some((x) => x.trim() === name.trim());

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (isExistPlayer) return;
      handleAddPlayer();
    }
  };
  const handleAddPlayer = () => {
    if (!name) return;
    if (players?.length === 4) return;
    setPlayers([...players, name]);
    setName('');
  };

  const handleDeletePlayer = (name) => {
    setPlayers(players.filter((x) => x !== name));
  };

  const handleStartGame = () => {
    if (!topic?.value) {
      window.alert('Vui lòng chọn bộ đề');
    } else {
      const queryParams = new URLSearchParams({
        topicId: topic?.value,
        players: players,
      }).toString();
      router.push(`/game?${queryParams}`);
    }
  };

  return (
    <div
      className='relative flex justify-center w-screen h-screen'
      style={{
        backgroundImage: "url('/start.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Banner title={'Thiết lập lượt chơi'} />
      <div className='w-[45vw] h-[65vh] bg-white rounded-[24px] border-[3px] border-primary p-12 relative mt-[221px]'>
        <Typography className='mb-5 text-xl font-semibold leading-6'>
          CHỌN BỘ ĐỀ
        </Typography>
        <div className='mb-10'>
          <Select
            className='basic-single'
            isLoading={isLoading}
            isSearchable
            value={topic}
            options={availableTopics}
            placeholder='Hãy chọn 1 bộ đề đã khởi tạo'
            onChange={(e) => setTopic(e)}
            styles={customStyles}
          />
        </div>
        <Typography className='mb-5 text-xl font-semibold leading-6'>
          THÊM ĐỘI CHƠI
        </Typography>
        <div className='relative flex w-full mb-4'>
          <Input
            type='text'
            placeholder='Nhập tên đội'
            className='!border-1 !border-gray-400 bg-white focus:!border-blue-400 text-[17px] rounded-full pr-20'
            labelProps={{
              className: 'hidden',
            }}
            containerProps={{ className: 'min-w-0 h-16' }}
            value={name}
            onChange={({ target }) => setName(target.value)}
            onKeyDown={handleKeyDown}
          />
          <IconButton
            size='lg'
            className='!absolute right-2 top-2 rounded-full bg-primary'
            onClick={handleAddPlayer}
            disabled={!name || isExistPlayer}
          >
            <i className='fas fa-plus' />
          </IconButton>
        </div>
        <div className='flex flex-wrap gap-2'>
          {players.length > 0 &&
            players.map((player) => (
              <Chip
                key={player}
                value={player}
                variant='ghost'
                onClose={() => handleDeletePlayer(player)}
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 50 },
                }}
                className='text-base normal-case rounded-full'
                color='blue'
              />
            ))}
        </div>

        <Button
          className='bg-primary-dark h-[60px] flex items-center justify-center gap-3 !absolute right-12 bottom-12 w-60'
          onClick={handleStartGame}
          disabled={players.length === 0}
        >
          <Typography className='text-xl font-semibold'>
            BẮT ĐẦU CHƠI
          </Typography>
          <ChevronDoubleRightIcon className='w-5 h-5' />
        </Button>
      </div>
      <Button
        className='bg-primary-dark !opacity-40 hover:!opacity-100 h-[60px] flex items-center justify-center border-2 border-white !absolute bottom-4 left-8'
        onClick={() => router.push('/ceremony')}
      >
        <Typography className='text-xl font-semibold'>Tổng kết</Typography>
      </Button>
    </div>
  );
}
