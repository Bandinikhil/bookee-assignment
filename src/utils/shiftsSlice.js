import { createSlice } from "@reduxjs/toolkit";


const shiftsSlice = createSlice({

    name : 'shiftslist',
    initialState:{
        shifts : [],
        myShifts : [],
        availableShifts : [],
        loading : false,
        selectedCity : null,
    },
    reducers : {
        setShifts : (state,action)=>{
            state.shifts = action.payload;
        },
        setMyShifts : (state,action)=>{
            state.myShifts.push(action.payload);
        },
        setAvailableShifts : (state,action)=>{
            state.availableShifts = action.payload;
        },
        setLoading : (state,action)=>{
            state.loading = action.payload;
        },
        setSelectedCity : (state,action)=>{
            state.selectedCity = action.payload;
        },
        cancelShift: (state, action) => {
            state.myShifts = state.myShifts.filter(shift => shift.id !== action.payload);
          },
    }
})

export const {setAvailableShifts, setLoading, setMyShifts, setSelectedCity, setShifts, cancelShift} = shiftsSlice.actions;
export default shiftsSlice.reducer;

