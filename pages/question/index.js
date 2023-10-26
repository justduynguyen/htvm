import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import {
  ApiImportQuestion,
  ApiGetAllQuestion,
  ApiRemoveQuestion,
} from '@/utils/endpoints';
import {
  Typography,
  IconButton,
  ButtonGroup,
  Button,
} from '@material-tailwind/react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import axios from 'axios';

const TABLE_HEAD = [
  'Câu hỏi',
  'Đáp án',
  'Loại câu hỏi',
  'Cấp bậc',
  'Tệp đính kèm',
  '',
];

export default function Dashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();

  const handleDownloadTemplate = () => {
    router.push('/template.csv');
  };
  const handleUploadFile = async (event) => {
    const excelFile = new FormData();
    excelFile.append('excelFile', event.target.files[0]);
    setIsLoading(true);
    try {
      await axios.post(ApiImportQuestion, excelFile);
    } finally {
      setIsLoading(false);
      router.reload();
    }
  };

  const handleRemoveQuestion = (id) => {
    axios.delete(ApiRemoveQuestion + id);
  };

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await axios.get(ApiGetAllQuestion);
        setData(response?.data);
        console.log(response);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  return (
    <DashboardLayout>
      <div className='flex flex-row justify-between'>
        <Typography style={{ fontSize: 26 }} className='mb-4'>
          Quản lý câu hỏi
        </Typography>
        <ButtonGroup size='sm' className='h-[40px]' color='green'>
          <Button className='bg-green-500'>
            <label>
              Upload câu hỏi
              <input
                type='file'
                className='hidden'
                onChange={handleUploadFile}
              />
            </label>
          </Button>
          <Button className='bg-blue-500' onClick={handleDownloadTemplate}>
            Download file mẫu
          </Button>
        </ButtonGroup>
      </div>
      <table className='w-full text-left bg-white border shadow table-auto border-blue-gray-100'>
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className='p-4 border-b border-blue-gray-100 bg-blue-gray-50'
              >
                <Typography
                  variant='small'
                  color='blue-gray'
                  className='font-bold leading-none uppercase opacity-70'
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 &&
            data.map(
              (
                { id, request, answer, type, schoolLevel, attachmentUrl },
                index
              ) => {
                const isLast = index === data.length - 1;
                const classes = isLast
                  ? 'p-4'
                  : 'p-4 border-b border-blue-gray-50';

                return (
                  <tr key={id}>
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
                        {schoolLevel}
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
                    <td
                      className={classNames(classes, 'w-[50px]')}
                      onClick={() => handleRemoveQuestion(id)}
                    >
                      <IconButton variant='text' color='red'>
                        <i className='fas fa-trash' />
                      </IconButton>
                    </td>
                  </tr>
                );
              }
            )}
        </tbody>
      </table>
    </DashboardLayout>
  );
}
