import {
  Drawer,
  Typography,
  IconButton,
  Button,
  Alert,
} from '@material-tailwind/react';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

export default function ScoreDrawer({
  open,
  onClose,
  players,
  isDisabledCounter,
  isStar,
  setScore,
  isHiddenSquareColumn,
}) {
  const [isSubmitScore, setIsSubmitScore] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [selectedSquare, setSelectedSquare] = useState([]);
  const [isError, setIsError] = useState(false);

  const handleSubmit = () => {
    if (selectedSquare.filter((x) => x).length === players.length) {
      setIsSubmitScore(true);
      setIsDisable(true);
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  const onClickScoreSquare = (index) => {
    const newSelectedSquare = [...selectedSquare];
    newSelectedSquare[index] = true;
    setSelectedSquare(newSelectedSquare);
  };
  return (
    <Drawer
      open={open}
      onClose={onClose}
      className='bg-white flex flex-col items-center px-[50px] py-[25px]'
      size={750}
    >
      <Typography className='uppercase font-bold text-[40px] text-primary-dark mb-[60px]'>
        Thống kê điểm thi
      </Typography>
      <div className='flex flex-col items-center w-full'>
        {players.map(({ name, score }, index) => (
          <ScoreField
            key={index}
            name={name}
            score={score}
            setScore={setScore(index)}
            isSubmit={isSubmitScore}
            isDisabledCounter={isDisabledCounter}
            isStar={isStar}
            isHiddenSquareColumn={isHiddenSquareColumn}
            onClickScoreSquare={() => onClickScoreSquare(index)}
          />
        ))}
      </div>
      {isDisabledCounter && (
        <div className='flex flex-col justify-between w-full h-full'>
          <div className='h-[50px]'>
            <Alert color='red' open={isError} onClose={() => setIsError(false)}>
              Vui lòng chọn đủ thứ hạng trước khi Lưu điểm
            </Alert>
          </div>
          <Button
            className='bg-primary-dark w-[160px] !h-[60px] self-end justify-end mt-[10px]'
            onClick={handleSubmit}
            disabled={isDisable}
          >
            <Typography className='text-[20px] font-semibold'>
              Lưu điểm
            </Typography>
          </Button>
        </div>
      )}
    </Drawer>
  );
}

const SCORE_BY_POSITION = [30, 25, 20, 15];
const ScoreField = ({
  name,
  isDisabledCounter,
  isSubmit,
  isStar,
  score,
  setScore,
  isHiddenSquareColumn,
  onClickScoreSquare,
}) => {
  const [squares, setSquares] = useState(Array(5).fill(false));
  const [scoreSquares, setScoreSquares] = useState(Array(4).fill(false));

  const bonusScore = isStar ? 20 : 10;

  const [isCalculated, setIsCalculated] = useState(false);
  useEffect(() => {
    if (isSubmit && !isCalculated) {
      const index = scoreSquares.findIndex((x) => x);
      setScore(SCORE_BY_POSITION[index] ?? 0);
      setIsCalculated(true);
    }
  }, [isSubmit, scoreSquares, isCalculated, setScore]);

  const onToggleSquare = (index) => {
    if (isSubmit) return;
    const newSquares = [...squares];
    newSquares[index] = !newSquares[index];
    setSquares(newSquares);
  };

  const onToggleScoreSquare = (index) => {
    if (isSubmit) return;
    const newScoreSquares = Array(4).fill(false);
    newScoreSquares[index] = true;
    setScoreSquares(newScoreSquares);
    onClickScoreSquare();
  };

  return (
    <div
      className={classNames(
        'border-[3px] w-full border-gray-300 relative mb-10',
        isDisabledCounter ? 'rounded-l-full' : 'rounded-full'
      )}
    >
      <Typography className='text-[28px] font-bold my-[30px] ml-[140px]'>
        {name}
      </Typography>
      <div
        className=' bg-black w-[130px] h-[130px] flex items-center 
                  justify-center rounded-full border-4 border-primary-1
                  bg-gradient-to-b from-[#1A6DE3] to-[#549BFF]
                  absolute -left-2 top-1/2 -translate-y-1/2'
      >
        <Typography className='text-[40px] font-semibold text-white'>
          {score}
        </Typography>
      </div>
      {isDisabledCounter ? (
        <div>
          <div className='absolute right-[2px] top-1/2 -translate-y-1/2 flex flex-col'>
            {!isHiddenSquareColumn &&
              squares.map((value, index) => (
                <Square
                  key={index}
                  isCheck={value}
                  onToggle={() => onToggleSquare(index)}
                />
              ))}
          </div>
          <div className='absolute bottom-[-3px] translate-y-full left-[150px] flex'>
            {scoreSquares.map((value, index) => (
              <ScoreSquare
                key={index}
                value={index + 1}
                isCheck={value}
                onToggle={() => onToggleScoreSquare(index)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className='absolute right-[35px] top-1/2 -translate-y-1/2 flex flex-col'>
          <IconButton
            variant='text'
            className='opacity-30 hover:opacity-80'
            onClick={() => setScore(bonusScore)}
          >
            <i className='fa-solid fa-caret-up fa-3x'></i>
          </IconButton>
          <IconButton
            variant='text'
            className='opacity-30 hover:opacity-80'
            disabled={score === 0}
            onClick={() => setScore(-5)}
          >
            <i className='fa-solid fa-caret-down fa-3x'></i>
          </IconButton>
        </div>
      )}
    </div>
  );
};

const Square = ({ isCheck, onToggle }) => {
  return (
    <div
      className={classNames(
        'w-[16px] h-[16px] my-[2px] cursor-pointer',
        isCheck ? 'bg-primary' : 'bg-blue-50'
      )}
      onClick={onToggle}
    ></div>
  );
};

const ScoreSquare = ({ value, isCheck, onToggle }) => {
  return (
    <div
      className={classNames(
        'w-[24px] h-[24px] mx-[2px] flex items-center justify-center cursor-pointer',
        isCheck ? 'bg-primary' : 'bg-blue-50'
      )}
      onClick={onToggle}
    >
      <Typography
        className={classNames(
          'font-bold',
          isCheck ? 'text-white' : 'text-primary'
        )}
      >
        {value}
      </Typography>
    </div>
  );
};
