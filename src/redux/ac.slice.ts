import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Achievement {
  title: string;
  percentage: number;
  name: string;
}

interface AchievementsState {
  achievements: Achievement[];
  currentIndex: number;
}

const initialState: AchievementsState = {
  achievements: [
    { title: "First Trade", percentage: 0, name: "A" },
    { title: "Every 5 bets", percentage: 0, name: "B" },
    { title: "5x streak", percentage: 0, name: "C" },
    { title: "5x wins", percentage: 0, name: "D" },
    { title: "10x win streak", percentage: 0, name: "E" },
    { title: "20x win streak", percentage: 0, name: "F" },
    { title: "40x win streak", percentage: 0, name: "G" },
  ],
  currentIndex: 0,
};

const achievementsSlice = createSlice({
  name: 'achievements',
  initialState,
  reducers: {
    incrementPercentage(state) {
      const achievement = state.achievements[state.currentIndex];
      if (achievement.percentage < 100) {
        achievement.percentage += 10;
      } else if (state.currentIndex < state.achievements.length - 1) {
        state.currentIndex += 1;
      }
    },
  },
});

export const { incrementPercentage } = achievementsSlice.actions;

export default achievementsSlice.reducer;
