import { MOCK_DATA } from './mock';

export const MC_LABELS = ['A', 'B', 'C', 'D'];

export const MC_ANSWERS = [
  'Khi qua nơi đông người tụ họp, đi lại trên đường đi lại trên đường',
  'Khi qua nơi đông người tụ họp, đi lại trên đường đi lại trên đường đi lại trên đường đi lại trên đường',
  'Khi qua nơi đông người tụ họp, đi lại trên đường',
  'Khi qua nơi đông người tụ họp, đi lại trên đường đi lại trên đường đi lại trên đường đi lại trên đường đi lại trên đường',
];

export const QUESTION_TYPE = {
  MultipleChoice: 'TracNghiem',
  Image: 'HinhAnh',
  Video: 'XuLyTinhHuong',
};

export const QUESTION = {
  request:
    'Trong đô thị trường hợp nào dưới đây xe không được dùng còi (trừ các xe ưu tiên theo Luật định)?',
  answer:
    'A. Khi qua nơi đông người tụ họp, đi lại trên đường B. Khi qua nơi có trường học trẻ em đi lại trên đường C. Từ 22h đến 5h sáng hôm sau D. Khi qua ngã ba, ngã tư, trong thành phố, thị xã, thị trấn đông người qua lại',
  correctAnswer: 'C',
  type: QUESTION_TYPE.MultipleChoice,
  schoolLevel: 'TH',
};
const RANDOM_SENTENCES = MOCK_DATA.data.map(({ sentence }) => sentence);

const getRandomSentence = () => {
  const index = Math.floor(Math.random() * RANDOM_SENTENCES.length);
  return RANDOM_SENTENCES[index];
};

const generateQuestions = (number) => {
  let result = [];
  for (let i = 0; i < number; i++) {
    result.push({
      request: getRandomSentence(),
      answer: generateChoices(),
      correctAnswer: MC_LABELS[Math.floor(Math.random() * 3)],
      type: QUESTION_TYPE.MultipleChoice,
      schoolLevel: 'TH',
    });
  }
  return result;
};

const generateImageQuestions = (number, type) => {
  let result = [];
  for (let i = 0; i < number; i++) {
    result.push({
      request: getRandomSentence(),
      answer: generateChoices(true),
      correctAnswer: MC_LABELS[Math.floor(Math.random() * 3)],
      type,
      schoolLevel: 'TH',
    });
  }
  return result;
};

const generateChoices = (isImage = false) => {
  const total = isImage ? 4 : Math.floor(Math.random() * 2) + 3;
  let result = '';
  for (let i = 0; i < total; i++) {
    result += MC_LABELS[i] + '. ' + getRandomSentence() + ' ';
  }
  return result;
};

export const QUESTIONS = [QUESTION, ...generateQuestions(14)];

export const ROUND2_QUESTIONS = [
  ...generateImageQuestions(5, QUESTION_TYPE.Image),
  ...generateImageQuestions(4, QUESTION_TYPE.Video),
];

export const VIDEO_URLS = [
  'https://www.youtube.com/watch?v=ixNLxzcfnbk',
  'https://www.youtube.com/watch?v=ixNLxzcfnbk',
  'https://www.youtube.com/watch?v=ixNLxzcfnbk',
  'https://www.youtube.com/watch?v=ixNLxzcfnbk',
];
