import { DifficultyLevels, GameSetting } from '../models/difficulty-levels';

export const apiBaseURL = 'https://emoji-api.com/';
export const accessKey = 'access_key=45c5c74efa900124aaec1da2064ca304cf13dc03';
export const difficultyLevels: DifficultyLevels[] = [
  { name: 'easy', value: 12 },
  { name: 'medium', value: 18 },
  { name: 'difficult', value: 24 },
];

export const defaultGameSettings: GameSetting = {
  category: 'animals-nature',
  difficultyLevel: { name: 'easy', value: 10 },
};
