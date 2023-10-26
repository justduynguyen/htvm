import DashboardLayout from '@/layouts/DashboardLayout';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Typography, Button, IconButton, Chip } from '@material-tailwind/react';
import classNames from 'classnames';
import { AddQuestionsDialog } from '@/components/AddQuestionsDialog';
import { ApiRemoveQuestionTopic, ApiGetTopicById } from '@/utils/endpoints';
import axios from 'axios';

const TABLE_HEAD = [
  'Câu hỏi',
  'Đáp án',
  'Cấp bậc',
  'Loại câu hỏi',
  'Tệp đính kèm',
  '',
];

const TABLE_ROWS = [
  {
    name: 'John Michael',
    job: 'Manager',
    date: '23/04/18',
  },
  {
    name: 'Alexa Liras',
    job: 'Developer',
    date: '23/04/18',
  },
  {
    name: 'Laurent Perrier',
    job: 'Executive',
    date: '19/09/17',
  },
  {
    name: 'Michael Levi',
    job: 'Developer',
    date: '24/12/08',
  },
  {
    name: 'Richard Gran',
    job: 'Manager',
    date: '04/10/21',
  },
];

export default function TopicDetail({ topicId }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [notFound, setNotFound] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await axios.get(ApiGetTopicById + topicId);
        setData(response.data);
        console.log(response);
        setNotFound(response.data == null);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [topicId]);

  const handleRemoveQuestionTopic = (id) => {
    axios.delete(ApiRemoveQuestionTopic + '?questionId=' + id);
    window.location.reload();
  };
  return (
    <DashboardLayout>
      {isLoading ? (
        <h1>loading...</h1>
      ) : notFound ? (
        <h1>404 Not Found</h1>
      ) : (
        <>
          <div class='w-max text-left mb-2'>
            <nav aria-label='breadcrumb' class='w-max'>
              <ol class='flex w-full flex-wrap items-center'>
                <li class='flex cursor-pointer items-center font-sans text-sm font-normal leading-normal text-blue-gray-900'>
                  <Link class='opacity-70 hover:underline' href='/topic'>
                    <span>Quản lý bộ đề</span>
                  </Link>
                  <span class='pointer-events-none mx-2 select-none font-sans text-sm font-normal leading-normal text-blue-gray-500 antialiased'>
                    -
                  </span>
                </li>
                <li class='flex items-center font-sans text-sm font-normal leading-normal text-green-500 cursor-pointer'>
                  {data?.topic?.name}
                </li>
              </ol>
            </nav>
          </div>

          <div className='flex flex-row justify-between'>
            <div className='flex mb-4'>
              <Typography style={{ fontSize: 26 }}>
                {data?.topic?.name}
              </Typography>
              <div className='flex items-center ml-4'>
                <Chip
                  variant='outlined'
                  value='Tiểu học'
                  size='sm'
                  color='blue'
                  className='bg-blue-50'
                />
              </div>
            </div>
            <Button
              className='bg-green-500 h-[40px]'
              onClick={() => setOpenDialog(true)}
            >
              Thêm câu hỏi
            </Button>
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
              {data?.questions?.length > 0 &&
                data.questions.map(
                  (
                    { id, request, answer, schoolLevel, type, attachmentUrl },
                    index
                  ) => {
                    const isLast = index === data?.questions.length - 1;
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
                            {schoolLevel}
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
                        <td
                          className={classNames(classes, 'w-[50px]')}
                          onClick={() => handleRemoveQuestionTopic(id)}
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
          <AddQuestionsDialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            topicId={data?.topic?.id}
            schoolLevel={data?.topic?.schoolLevel}
            type={data?.topic?.type}
          />
        </>
      )}
    </DashboardLayout>
  );
}

export const getServerSideProps = ({ params }) => {
  return {
    props: { topicId: params.topicId },
  };
};
