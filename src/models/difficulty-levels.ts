export interface DifficultyLevels {
  name: string;
  value: number;
}

export interface GameSetting {
  category: string;
  difficultyLevel: DifficultyLevels;
}
