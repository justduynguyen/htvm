import ClickableMCAnswer from './ClickableMCAnswer';
import { Typography } from '@material-tailwind/react';
import { MC_LABELS } from '@/utils/constants';
import { getChoicesByAnswer } from '@/utils/utilities';
import { useState } from 'react';
const DEFAULT_IMAGE_URL =
  'https://drive.google.com/file/d/15uBqIbN0pEcATguVreRmIqLE2Etf_gg_/view?usp=share_link';

const getImageURL = (url) => {
  return url
    .replace('file/d/', 'uc?export=view&id=')
    .replace('/view?usp=share_link', '')
    .replace('/view?usp=sharing', '');
};
const MultipleChoiceQuestionWithImage = ({
  index,
  data,
  isDisabled,
  onClickAnswer,
  isShowAnswer,
}) => {
  const { request, answer, correctAnswer, attachmentUrl } = data;

  const [isLoadingImg, setIsLoadingImg] = useState(true);
  const url = getImageURL(attachmentUrl);
  const choices = getChoicesByAnswer(answer);

  return (
    <div className='flex w-[87.5vw] mt-[10vh] justify-between h-[60vh]'>
      <div className='relative w-1/2 p-8 mr-12 bg-white shadow rounded-xl'>
        <div className='w-[108px] h-[40px] bg-primary-1 flex items-center justify-center rounded-t-2xl absolute top-0 -translate-y-full'>
          <Typography className='text-xl font-semibold text-white'>
            {`Câu ${(index + 1).toString().padStart(2, '0')}`}
          </Typography>
        </div>
        <div className='relative flex flex-col h-full'>
          {isLoadingImg && (
            <div className='animate-pulse absolute mx-auto w-full h-[70%] rounded-xl bg-gray-300'></div>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className='mx-auto w-full h-[70%] rounded-xl'
            alt='image'
            src={url}
            onLoad={() => setIsLoadingImg(false)}
          />
          <Typography className='font-bold text-center text-[38px] mt-4'>
            {request}
          </Typography>
        </div>
      </div>
      <div className='flex flex-col w-1/2 gap-2'>
        {choices.map((item, index) => (
          <ClickableMCAnswer
            key={item + index}
            text={item}
            label={MC_LABELS[index]}
            answerLabel={correctAnswer}
            isShowAnswer={isShowAnswer}
            isDisabled={isDisabled}
            onClick={onClickAnswer}
            isImageQuestion
          />
        ))}
      </div>
    </div>
  );
};

export default MultipleChoiceQuestionWithImage;
