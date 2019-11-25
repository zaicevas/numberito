import { MAX_DIGITS } from '../constants/index';

const getRandomAnswer = () => {
  const shuffledNumbers = [...Array(10).keys()].sort(() => Math.random() - 0.5);
  return shuffledNumbers.slice(0, MAX_DIGITS).join('');
};

const getBulls = (input: string, answer: string) =>
  answer.split('').filter((char, index) => char === input.charAt(index)).length;

const getCows = (input: string, answer: string) =>
  answer
    .split('')
    .filter(
      (char, index) => input.includes(char) && input.charAt(index) !== char,
    ).length;

export { getRandomAnswer, getBulls, getCows };
