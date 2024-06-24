import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  status: false
}

export const fetchAgainSlice = createSlice({
  name: 'fetchAgain',
  initialState,
  reducers: {
    setFetchAgainStatus: (state, action) => {
      state.status = !state.status;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setFetchAgainStatus } = fetchAgainSlice.actions

export const selectFetchAgainStatus = (state) => state.fetchAgain.status;

export default fetchAgainSlice.reducer