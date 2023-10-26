import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Radio,
  Typography,
  Spinner,
  Checkbox,
} from '@material-tailwind/react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { ApiCreateTopic } from '@/utils/endpoints';
import Select from 'react-select';

const TOPIC_TYPES = [
  {
    value: 'Vong1',
    label: 'Vòng 1',
  },
  {
    value: 'Vong2',
    label: 'Vòng 2',
  }
];

export function TopicDialog({ open, onClose }) {
  const [name, setName] = useState('');
  const [isPrimary, setIsPrimary] = useState(true);
  const [isRandom, setIsRandom] = useState(false);
  const [topicType, setTopicType] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCreateTopic = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(ApiCreateTopic, {
        name,
        schoolLevel: isPrimary ? 'TH' : 'THCS',
        type: topicType.value,
        isRandom
      });
      if (response?.data?.id) {
        router.push(`/topic/${response?.data?.id}`);
      }
      //router.reload();
    } catch (e) {
      
    }
    finally {
      setIsLoading(false);
      handleClose();
    }
  };

  const handleClose = () => {
    setName('');
    onClose();
  };
  return (
    <Dialog open={open} size='md' handler={handleClose}>
      <DialogHeader className='text-lg'>Thêm bộ đề</DialogHeader>
      <DialogBody divider>
        <form className='my-4'>
          <div className='w-full mb-4'>
            <Input
              label='Tên bộ đề'
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='flex gap-10 items-center'>
            <Typography>Cấp bậc:</Typography>
            <Radio
              name='type'
              label='Tiểu học'
              color='blue'
              checked={isPrimary}
              onChange={() => setIsPrimary(true)}
            />
            <Radio
              name='type'
              height={'10px'}
              label='Trung học cơ sở'
              color='blue'
              checked={!isPrimary}
              onChange={() => setIsPrimary(false)}
            />
          </div>
          <div className='my-4'>
          <Select
            className='basic-single'
            
            isSearchable
            value={topicType}
            options={TOPIC_TYPES}
            placeholder='Chọn loại bộ đề'
            onChange={(e) => setTopicType(e)}
          />
        </div>
          <Checkbox
            label={
              <span>
                Tạo ngẫu nhiên bộ đề
              </span>
            }
            checked={isRandom}
            onChange={() => setIsRandom((prev) => !prev)}
          />
        </form>
      </DialogBody>
      <DialogFooter>
        <Button
          variant='text'
          color='red'
          onClick={handleClose}
          className='mr-1'
        >
          <span>Huỷ</span>
        </Button>
        <Button
          className='flex w-[120px] justify-center relative'
          variant='gradient'
          color='blue'
          onClick={handleCreateTopic}
          disabled={isLoading || !name}
        >
          {isLoading && <Spinner className='h-4 w-4 absolute left-4' />}
          <span>Thêm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
