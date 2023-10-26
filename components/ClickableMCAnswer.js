import React, { useState } from 'react';
import classNames from 'classnames';
import { Typography } from '@material-tailwind/react';
import useSound from 'use-sound';

const ClickableMCAnswer = ({
  text,
  label,
  answerLabel,
  isDisabled,
  onClick,
  isShowAnswer,
  isImageQuestion,
  isSelectStar,
  onToggleStar,
  isLongText,
}) => {
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);

  const isCorrect = label === answerLabel;
  const isShowCorrectAnswer = isShowAnswer && isCorrect;

  const [playCorrect] = useSound('/correct.mp3');
  const [playIncorrect] = useSound('/incorrect.mp3');

  const handleClickAnswer = () => {
    if (isDisabled) return;
    if (isCorrect) {
      playCorrect();
    } else {
      playIncorrect();
    }
    onClick();
    setIsCorrectAnswer(isCorrect);

    if (!isCorrect && isSelectStar) {
      onToggleStar();
    }
  };
  return (
    <div
      className={classNames(
        'rounded-3xl p-[18px] flex items-center border-[3px] w-full max-h-[20vh] cursor-pointer',
        'hover:scale-[1.03]',
        isShowCorrectAnswer
          ? 'bg-success border-white'
          : isCorrectAnswer === null
          ? 'bg-white border-primary'
          : isCorrectAnswer
          ? 'bg-success border-white'
          : 'bg-error border-white',
        isImageQuestion ? 'h-full' : 'h-[20vh]'
      )}
      onClick={handleClickAnswer}
    >
      <div
        className={classNames(
          'w-[calc(14vh-36px)] h-[calc(14vh-36px)] rounded-full flex items-center justify-center shadow-inner',
          isShowCorrectAnswer
            ? 'bg-white'
            : isCorrectAnswer === null
            ? 'bg-primary'
            : 'bg-white'
        )}
      >
        <Typography
          className={classNames(
            'text-5xl font-medium text-white align-middle',
            isShowCorrectAnswer
              ? 'text-success'
              : isCorrectAnswer === null
              ? 'text-white'
              : isCorrectAnswer
              ? 'text-success'
              : 'text-error'
          )}
        >
          {label}
        </Typography>
      </div>
      <Typography
        className={classNames(
          'font-semibold whitespace-normal ml-[18px]',
          isImageQuestion ? 'max-w-[32vw]' : 'max-w-[33vw] text-center',
          (isCorrectAnswer !== null || isShowCorrectAnswer) && 'text-white',
          isLongText ? 'text-[20px]' : 'text-[27px]'
        )}
      >
        {text}
      </Typography>
    </div>
  );
};

export default ClickableMCAnswer;
