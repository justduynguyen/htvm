import React, { useState } from 'react';
import MCAnswer from './MCAnswer';
import { Typography } from '@material-tailwind/react';
import { MC_LABELS } from '@/utils/constants';
import { getChoicesByAnswer } from '@/utils/utilities';
import ClickableMCAnswer from './ClickableMCAnswer';
import classNames from 'classnames';
import Image from 'next/image';

const MultipleChoiceQuestion = ({
  index,
  data,
  hasLuckyStar,
  isDisabled,
  onClickAnswer,
  isShowAnswer,
  isSelectStar,
  onToggleStar,
  isClickableAnswer,
}) => {
  const { request, answer, correctAnswer } = data;

  const choices = getChoicesByAnswer(answer);

  const isLongText = choices.some((choice) => choice.split(' ').length >= 30);

  const isLongQuestion = request.split(' ').length >= 50;

  return (
    <div>
      <div className='bg-white rounded-xl p-8 w-[87.5vw] h-[23.2vh] mt-[10vh] shadow relative'>
        <div className='w-[108px] h-[40px] bg-primary-1 flex items-center justify-center rounded-t-2xl absolute top-0 -translate-y-full'>
          <Typography className='text-xl font-semibold text-white'>
            {`Câu ${(index + 1).toString().padStart(2, '0')}`}
          </Typography>
        </div>
        {hasLuckyStar && (
          <div
            className='absolute cursor-pointer bottom-3 right-3'
            onClick={onToggleStar}
          >
            {isSelectStar ? (
              <Image src='/Star.gif' width={60} height={60} alt='star' />
            ) : (
              <i
                className={classNames(
                  'fa-solid fa-star fa-3x',
                  'text-gray-200'
                )}
              ></i>
            )}
          </div>
        )}
        <div className='flex flex-col justify-center h-full'>
          <Typography
            className={classNames(
              'font-bold text-center',
              isLongQuestion ? 'text-[32px]' : 'text-[38px]'
            )}
          >
            {request}
          </Typography>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-4 mt-4'>
        {choices.map((item, index) =>
          !isClickableAnswer ? (
            <MCAnswer
              key={item + index}
              text={item}
              label={MC_LABELS[index]}
              answerLabel={correctAnswer}
              isShowAnswer={isShowAnswer}
              isLongText={isLongText}
            />
          ) : (
            <ClickableMCAnswer
              key={item + index}
              text={item}
              label={MC_LABELS[index]}
              answerLabel={correctAnswer}
              isShowAnswer={isShowAnswer}
              isDisabled={isDisabled}
              onClick={onClickAnswer}
              isSelectStar={isSelectStar}
              onToggleStar={onToggleStar}
              isLongText={isLongText}
            />
          )
        )}
      </div>
    </div>
  );
};

export default MultipleChoiceQuestion;
