import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  stats: {
    "totalTasks": 0,
    "serviceTasks": 0,
    "newPumpInquiryTasks": 0,
    "currentTasks": 0,
    "currentHighPriorityTasks": 0,
    "currentTaskCompleted": 0,
    "totalCustomers": 0
  }
}

export const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    setStats: (state, action) => {
      state.stats = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setStats } = statsSlice.actions

export const selectStats = (state) => state.stats.stats;

export default statsSlice.reducer