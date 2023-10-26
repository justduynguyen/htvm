import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Spinner,
  IconButton,
  Checkbox,
} from '@material-tailwind/react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { ApiAddQuestionTopic, ApiGetAvailableQuestion } from '@/utils/endpoints';
import axios from 'axios';

const TABLE_HEAD = ['','Câu hỏi', 'Đáp án', 'Loại câu hỏi', 'Tệp đính kèm'];

export function AddQuestionsDialog({ open, onClose, topicId, schoolLevel, type }) {
  const router = useRouter();
  const [data, setData] = useState();

  const [checkedList, setCheckedList] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await axios.get(ApiGetAvailableQuestion + '?schoolLevel=' + schoolLevel + '&type=' + type);
        setData(response?.data);
        setCheckedList(Array(response?.data?.length).fill(false))
        console.log("avaliable question", response);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  const checkedCount = checkedList.filter((x) => x).length;

  const [isLoading, setIsLoading] = useState(false);

  const handleSelectQuestion = (index) => {
    let newCheckedList = [...checkedList];
    newCheckedList[index] = !newCheckedList[index];
    setCheckedList(newCheckedList);
  };

  const handleCreateTopic = async () => {
    setIsLoading(true);
    let ids = [];
    data?.forEach((value, index) => {
      if (checkedList[index]) {
        ids.push(value.id);
      }
    })
    // TODO: fetch api create Topic
    try {
      await axios.post(ApiAddQuestionTopic,{
        topicId,
        questionIds: ids
      });
    } finally {
      setIsLoading(false);
      handleClose();
      router.reload();
      //router.push('/topic/test-123443');
    }
  };
  const handleClose = () => {
    onClose(false);
    setCheckedList([]);
  };

  return (
    <Dialog open={open} size='lg' handler={handleClose}>
      <DialogHeader className='text-lg'>Thêm câu hỏi</DialogHeader>
      <DialogBody divider>
        <Typography className='mb-3'>
          Đã chọn <span className='font-bold'>{checkedCount}</span> câu hỏi
          trong tổng số <span className='font-bold'>{data?.length}</span>{' '}
          câu hỏi hiện có
        </Typography>
        <div className='max-h-[30rem] overflow-scroll'>
          <table className='border border-blue-gray-100 w-full min-w-max table-auto text-left bg-white shadow '>
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'
                  >
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-bold leading-none opacity-70 uppercase'
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.map(({ id, request, answer, type, attachmentUrl }, index) => {
                const isLast = index === data.length - 1;
                const classes = isLast
                  ? 'p-4'
                  : 'p-4 border-b border-blue-gray-50';

                return (
                  <tr key={id}>
                    <td className={classNames(classes, 'w-[50px]')}>
                      <Checkbox
                        checked={checkedList[index]}
                        onChange={() => handleSelectQuestion(index)}
                      />
                    </td>
                    <td className={classes}>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {request}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {answer}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {type}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {attachmentUrl}
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
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
          disabled={isLoading || checkedCount.length === 0}
        >
          {isLoading && <Spinner className='h-4 w-4 absolute left-4' />}
          <span>Thêm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
