'use client';
import React, { useEffect, useState } from 'react';
import Banner from '@/components/Banner';
import { Button, Typography } from '@material-tailwind/react';
import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline';

import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import ScoreDrawer from '@/components/ScoreDrawer';
import DrawerButton from '@/components/DrawerButton';
import MultipleChoiceQuestionWithImage from '@/components/MultipleChoiceQuestionWithImage';
import Rule from '@/components/Rule';
import RuleTwo from '@/components/RuleTwo';
import RuleThree from '@/components/RuleThree';
import { QUESTION_TYPE, VIDEO_URLS } from '@/utils/constants';
import MultipleChoiceQuestion from '@/components/MultipleChoiceQuestion';
import ScoreBoardScreen from '@/components/ScoreBoardScreen';
import SituationCard from '@/components/SituationCard';
import axios from 'axios';
import { ApiGetTopicById } from '@/utils/endpoints';
import useSound from 'use-sound';
//import tickSound from '../../public/tick.mp3';

export default function Game() {
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [open, setOpen] = useState(false);
  const [players, setPlayers] = useState([]);

  const [questions, setQuestions] = useState([]);
  const [topicName, setTopicName] = useState('');

  const [questionIndex, setQuestionIndex] = useState(0);

  const [isStartGame, setIsStartGame] = useState(false);

  const [timerKey, setTimerKey] = useState(0);
  const [isCounting, setIsCounting] = useState(false);

  const [answerClickCount, setAnswerClickCount] = useState(0);

  const [isShowAnswer, setIsShowAnswer] = useState(false);

  const [isStar, setIsStar] = useState(false);

  const [isFinish, setIsFinish] = useState(false);

  // SOUND
  const [playTick, { stop: stopTick }] = useSound('/tick.mp3');
  const [playCorrect] = useSound('/correct.mp3');
  const [playStar] = useSound('star.mp3');
  const [playNext] = useSound('next.wav');
  const [playFinish, finishProps] = useSound('ceremony.mp3', { loop: true });
  const [playNervous, { stop: stopNervous }] = useSound('nervous.mp3');

  // --- ROUND 2 variables & functions ----

  const [stage, setStage] = useState(0); // 0: Phong cách giao thông, 1: 5 câu hỏi, 2: giao thông khoẻ, 3: 4 câu tình huống
  const [scoreDrawerKey, setScoreDrawerKey] = useState(0);
  const [videoUrls, setVideoUrls] = useState([]);
  // --------

  const isRoundOne =
    questions?.length > 0 &&
    questions[0]?.type === QUESTION_TYPE.MultipleChoice;

  const isDisabledCounter = !isRoundOne && (stage === 1 || stage === 2);
  const isSubQuestion = questionIndex >= 11;

  const shouldShowTimer =
    (isRoundOne && questionIndex < 8) || (!isRoundOne && stage < 2);

  const hasLuckyStar = isRoundOne && questionIndex > 7 && questionIndex < 12;

  const isClickableAnswer = isRoundOne && questionIndex > 7;

  const isDisabledMCAnswer = answerClickCount === 2;
  useEffect(() => {
    setIsLoading(true);
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let topicId = urlParams.get('topicId');
    let newPlayers = urlParams.get('players')?.split(',');
    setPlayers(newPlayers.map((name) => ({ name, score: 0 })));
    // const mocks = topicId % 2 === 0 ? ROUND2_QUESTIONS : QUESTIONS;

    // setQuestions(mocks.sort((a, b) => ('' + a.type).localeCompare(b.type)));

    (async () => {
      try {
        const response = await axios.get(ApiGetTopicById + topicId);
        if (response?.data?.questions?.length > 0) {
          setTopicName(response?.data?.topic?.name);
          setQuestions(
            response.data.questions.filter(
              (x) => x.type !== QUESTION_TYPE.Video
            )
          );
          setVideoUrls(
            response.data.questions.filter(
              (x) => x.type === QUESTION_TYPE.Video
            )
          );
        }
        setNotFound(response.data == null);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (isCounting && (isRoundOne || stage === 1)) {
      playTick();
      playNervous();
    } else {
      stopTick();
      stopNervous();
    }
  }, [isCounting, stage]);
  const handleShowCorrectAnswer = () => {
    setIsShowAnswer(true);
    playCorrect();
  };

  const resetState = () => {
    setIsCounting(false);
    setAnswerClickCount(0);
    setIsShowAnswer(false);
    setTimerKey((prev) => prev + 1);
    setIsStar(false);
    playNext();
  };
  const handleGoNextQuestion = () => {
    if (questionIndex === questions?.length - 1) {
      return;
    }
    setQuestionIndex((prev) => prev + 1);
    resetState();
  };

  const handleFinishStageOne = () => {
    resetState();
    setStage(2);
    setScoreDrawerKey((prev) => prev + 1);
  };

  const handleFinishTopic = () => {
    setIsFinish(true);
    playFinish();
  };

  const setScore = (index) => (value) => {
    const newPlayers = [...players];
    newPlayers[index].score += value;
    setPlayers(newPlayers);
  };

  if (notFound) return <div>404 Not Found</div>;
  if (isLoading) return <div>Loading...</div>;
  if (isFinish)
    return (
      <ScoreBoardScreen
        isRoundOne={isRoundOne}
        players={players}
        stopMusic={finishProps.stop}
        topicName={topicName}
      />
    );
  // ------ ROUND 1 ---------
  if (isRoundOne)
    return (
      <>
        <div
          className='flex flex-col items-center justify-center w-screen h-screen'
          style={{
            backgroundImage: "url('/1.jpeg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <Banner title={'Tri thức an toàn'} />
          {!isStartGame ? (
            // BẮT ĐẦU THI
            <>
              <Rule />
              <Button
                className='bg-primary-dark h-[60px] flex items-center justify-center gap-3 w-60 !absolute right-[6.25vw] bottom-4 border-2 border-white'
                onClick={() => {
                  playNext();
                  setIsStartGame(true);
                }}
              >
                <Typography className='text-xl font-semibold'>
                  BẮT ĐẦU THI
                </Typography>
                <ChevronDoubleRightIcon className='w-5 h-5' />
              </Button>
            </>
          ) : (
            // CÁC CÂU HỎI
            <>
              {shouldShowTimer && (
                <div className='absolute right-10 top-5 bg-[#EDECEC] rounded-full'>
                  <CountdownCircleTimer
                    isPlaying={isCounting}
                    key={timerKey}
                    duration={5}
                    colors={'#EC1C24'}
                    size={150}
                    onComplete={() => setIsCounting(false)}
                  >
                    {({ remainingTime }) => (
                      <Typography className='text-5xl font-bold'>
                        {remainingTime}
                      </Typography>
                    )}
                  </CountdownCircleTimer>
                </div>
              )}

              {isRoundOne && (
                <MultipleChoiceQuestion
                  key={questionIndex}
                  index={questionIndex}
                  data={questions[questionIndex]}
                  hasLuckyStar={hasLuckyStar}
                  isDisabled={isDisabledMCAnswer}
                  onClickAnswer={() => setAnswerClickCount((prev) => prev + 1)}
                  isShowAnswer={isShowAnswer}
                  isSelectStar={isStar}
                  onToggleStar={() => {
                    if (!isStar) {
                      playStar();
                    }
                    setIsStar((prev) => !prev);
                  }}
                  isClickableAnswer={isClickableAnswer}
                />
              )}

              {/* <MultipleChoiceQuestionWithImage
              isDisabled={isDisabledMCAnswer}
              onClickAnswer={() => setAnswerClickCount((prev) => prev + 1)}
              isShowAnswer={isShowAnswer}
            /> */}
              <div className='flex justify-between w-[87.5vw] absolute bottom-4'>
                <div className='flex gap-4'>
                  {shouldShowTimer && (
                    <Button
                      className='bg-red-500 w-[150px] h-[60px] flex items-center justify-center border-2 border-white'
                      onClick={() => {
                        setTimerKey((prev) => prev + 1);
                        if (!isCounting) {
                          setIsCounting(true);
                        } else {
                          setIsCounting(false);
                        }
                      }}
                    >
                      <Typography className='text-xl font-semibold'>
                        {isCounting ? 'Dừng lại' : 'Bắt đầu'}
                      </Typography>
                    </Button>
                  )}

                  <Button
                    className='bg-primary h-[60px] flex items-center justify-center border-2 border-white'
                    onClick={handleShowCorrectAnswer}
                  >
                    <Typography className='text-xl font-semibold'>
                      Đáp án đúng
                    </Typography>
                  </Button>
                </div>
                <div className='flex gap-4'>
                  {questionIndex < questions?.length - 1 && (
                    <Button
                      className='bg-primary-dark h-[60px] flex items-center justify-center border-2 border-white'
                      onClick={handleGoNextQuestion}
                    >
                      <Typography className='text-xl font-semibold'>
                        {isSubQuestion ? 'Câu hỏi phụ' : 'Câu kế tiếp'}
                      </Typography>
                      <ChevronDoubleRightIcon className='w-5 h-5 ml-2' />
                    </Button>
                  )}
                  {questionIndex > 10 && (
                    <Button
                      className='bg-red-500 h-[60px] flex items-center justify-center border-2 border-white'
                      onClick={handleFinishTopic}
                    >
                      <Typography className='text-xl font-semibold'>
                        Kết thúc
                      </Typography>
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
          <DrawerButton onClick={() => setOpen(true)} />
        </div>
        <ScoreDrawer
          players={players}
          open={open}
          onClose={() => setOpen(false)}
          isDisabledCounter={isDisabledCounter}
          isStar={isStar}
          setScore={setScore}
        />
      </>
    );

  // ------ ROUND 2 ---------
  return (
    <>
      <div
        className='flex flex-col items-center justify-center w-screen h-screen'
        style={{
          backgroundImage: "url('/1.jpeg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Banner title={BANNER_TITLE[stage]} />

        {stage === 0 && (
          <>
            <RuleTwo />
            <div className='absolute flex justify-between w-[87.5vw] bottom-4'>
              <Button
                className='bg-red-500 w-[150px] h-[60px] flex items-center justify-center border-2 border-white'
                onClick={() => {
                  setTimerKey((prev) => prev + 1);
                  if (!isCounting) {
                    setIsCounting(true);
                  } else {
                    setIsCounting(false);
                  }
                }}
              >
                <Typography className='text-xl font-semibold'>
                  {isCounting ? 'Dừng lại' : 'Bắt đầu'}
                </Typography>
              </Button>
              <Button
                className='bg-primary-dark h-[60px] flex items-center justify-center gap-3 w-100  border-2 border-white'
                onClick={() => {
                  resetState();
                  setStage(1);
                }}
              >
                <Typography className='text-xl font-semibold'>
                  Tinh nhuệ giao thông
                </Typography>
                <ChevronDoubleRightIcon className='w-5 h-5' />
              </Button>
            </div>
          </>
        )}
        {stage === 1 && (
          <>
            <MultipleChoiceQuestionWithImage
              key={questionIndex}
              index={questionIndex}
              data={questions[questionIndex]}
              isDisabled={isDisabledMCAnswer}
              onClickAnswer={() => setAnswerClickCount((prev) => prev + 1)}
              isShowAnswer={isShowAnswer}
            />
            <div className='flex justify-between w-[87.5vw] absolute bottom-4'>
              <div className='flex gap-4'>
                {shouldShowTimer && (
                  <Button
                    className='bg-red-500 w-[150px] h-[60px] flex items-center justify-center border-2 border-white'
                    onClick={() => {
                      setTimerKey((prev) => prev + 1);
                      if (!isCounting) {
                        setIsCounting(true);
                      } else {
                        setIsCounting(false);
                      }
                    }}
                  >
                    <Typography className='text-xl font-semibold'>
                      {isCounting ? 'Dừng lại' : 'Bắt đầu'}
                    </Typography>
                  </Button>
                )}

                <Button
                  className='bg-primary h-[60px] flex items-center justify-center border-2 border-white'
                  onClick={handleShowCorrectAnswer}
                >
                  <Typography className='text-xl font-semibold'>
                    Đáp án đúng
                  </Typography>
                </Button>
              </div>
              <Button
                className='bg-primary-dark h-[60px] flex items-center justify-center border-2 border-white'
                onClick={
                  questionIndex === 4
                    ? handleFinishStageOne
                    : handleGoNextQuestion
                }
              >
                <Typography className='text-xl font-semibold'>
                  {questionIndex === 4 ? 'Giao thông khoẻ' : 'Câu kế tiếp'}
                </Typography>
                <ChevronDoubleRightIcon className='w-5 h-5 ml-2' />
              </Button>
            </div>
          </>
        )}
        {stage === 2 && (
          <>
            <RuleThree />
            <Button
              className='!absolute bottom-4 right-[6.25vw] bg-primary-dark h-[60px] flex items-center justify-center gap-3 w-100 border-2 border-white'
              onClick={() => setStage(3)}
            >
              <Typography className='text-xl font-semibold'>
                Văn minh giao thông
              </Typography>
              <ChevronDoubleRightIcon className='w-5 h-5' />
            </Button>
          </>
        )}
        {stage === 3 && (
          <>
            <div className='w-[87.5vw] h-[70vh] grid grid-cols-2 gap-4 mt-10'>
              {videoUrls.length > 0 &&
                videoUrls
                  .sort((a, b) => a.request.localeCompare(b.request))
                  .map(({ attachmentUrl }, index) => (
                    <SituationCard
                      key={index}
                      index={index}
                      url={attachmentUrl}
                    />
                  ))}
            </div>
            <Button
              className='!absolute bottom-4 right-[6.25vw] bg-red-500 h-[60px] flex items-center justify-center gap-3 w-100 border-2 border-white'
              onClick={handleFinishTopic}
            >
              <Typography className='text-xl font-semibold'>
                Kết thúc
              </Typography>
            </Button>
          </>
        )}
        <DrawerButton onClick={() => setOpen(true)} />
      </div>
      <ScoreDrawer
        key={scoreDrawerKey}
        players={players}
        open={open}
        onClose={() => setOpen(false)}
        isDisabledCounter={isDisabledCounter}
        setScore={setScore}
        isHiddenSquareColumn={stage === 2}
      />
      {shouldShowTimer && (
        <div className='absolute right-10 top-5 bg-[#EDECEC] rounded-full'>
          <CountdownCircleTimer
            isPlaying={isCounting}
            key={timerKey}
            duration={TIMER_DURATION[stage] ?? 0}
            colors={'#EC1C24'}
            size={150}
            onComplete={() => setIsCounting(false)}
          >
            {({ remainingTime }) => (
              <Typography className='text-5xl font-bold'>
                {remainingTime}
              </Typography>
            )}
          </CountdownCircleTimer>
        </div>
      )}
    </>
  );
}

const TIMER_DURATION = [120, 10];
const BANNER_TITLE = [
  'Phong cách giao thông',
  'Tinh nhuệ giao thông',
  'Giao thông khoẻ',
  'Văn minh giao thông',
  'Sắc màu giao thông',
];
export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
