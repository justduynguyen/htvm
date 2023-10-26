import React from 'react';
import classNames from 'classnames';
import { Typography } from '@material-tailwind/react';

const MCAnswer = ({ text, label, answerLabel, isShowAnswer, isLongText }) => {
  const isCorrectAnswer = label === answerLabel && isShowAnswer;
  return (
    <div
      className={classNames(
        'rounded-3xl p-[18px] flex items-center border-[3px] w-full h-[20vh]',
        isCorrectAnswer ? 'bg-success border-white' : 'bg-white border-primary'
      )}
    >
      <div
        className={classNames(
          'w-[calc(14vh-36px)] h-[calc(14vh-36px)] rounded-full flex items-center justify-center shadow-inner',
          isCorrectAnswer ? 'bg-white' : 'bg-primary'
        )}
      >
        <Typography
          className={classNames(
            'text-5xl font-medium text-white align-middle',
            isCorrectAnswer ? 'text-success' : 'text-white'
          )}
        >
          {label}
        </Typography>
      </div>
      <Typography
        className={classNames(
          'font-semibold whitespace-normal ml-[18px] max-w-[33vw] text-center',
          isCorrectAnswer && 'text-white',
          isLongText ? 'text-[20px]' : 'text-[27px]'
        )}
      >
        {text}
      </Typography>
    </div>
  );
};

export default MCAnswer;
