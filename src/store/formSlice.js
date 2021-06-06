import { createSlice } from '@reduxjs/toolkit'

export const formSlice = createSlice({
    name: 'form',
    initialState: {
        dishName: "",
        durationTime: "",
        dishType: "",
        number_of_slice: 0,
        diameter: 0.0,
        spiceness_scale: 0,
        slice_of_bread: 0

    },
    reducers: {
        setDishName: (state, action) =>{
            state.dishName=action.payload
        },
        setDurationTime: (state, action) =>{
            state.durationTime=action.payload
        },
        setDishType: (state, action) =>{
            state.dishType=action.payload
        },
        setNumber_of_slic: (state, action) =>{
            state.number_of_slic=action.payload
        },
        setDiameter: (state, action) =>{
            state.diameter=action.payload
        },
        setSpiceness_scale: (state,action) => {
            state.spiceness_scale=action.payload
        },
        setSlice_of_bread: (state, action) => {
            state.slice_of_bread=action.payload
        }

    }

})

export const {setDishName, setDurationTime, setDishType, setNumber_of_slic, setDiameter, setSpiceness_scale,
     setSlice_of_bread} = formSlice.actions

export default formSlice.reducer;