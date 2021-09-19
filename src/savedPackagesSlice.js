
import { createSlice, createAction } from '@reduxjs/toolkit';


// actions
export const setData = createAction('setData');

const slice = createSlice({
  name: 'savedPackages',
  initialState: {
    byId: {},
    allIds: []
  },
  extraReducers: {
    [setData]: (state, action) => {
      const { payload } = action;
      const { data } = payload;
      console.log(data)
      state.byId = data.reduce((map, d) => {
        map[d.id] = d;
        return map;
      },{});
      state.allIds = data.map(d => d.id);
    }
  }
});

export default slice.reducer;

// selectors
export const getSavedPackages = (state, props) => {
  return state.savedPackages.allIds.map(id => state.savedPackages.byId[id]);
};
    