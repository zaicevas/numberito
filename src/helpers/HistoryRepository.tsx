import { AsyncStorage } from 'react-native';
import { HISTORY_KEY } from '../constants/Storage';
import { SingleGuess } from '../types/index';

const getHistory = async () => {
  const history = await AsyncStorage.getItem(HISTORY_KEY);
  return history;
};

const updateHistory = async (guesses: SingleGuess[], answer: string) => {
  const history = await getHistory();
  const historyEntity = {
    answer,
    history: guesses,
    timestamp: new Date(),
  };
  const newHistory = [...(JSON.parse(history) || []), historyEntity];
  AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
};

export { getHistory, updateHistory };

