import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type OptionType = {
    value: string;
    label: string;
};

interface dataItem {
    blue: OptionType[],
    red: OptionType[]
}

interface DataState {
    valId: string,
    value: dataItem,
    val: OptionType[]
}

const initialState: DataState = {
    valId: '',
    value: { blue: [{ value: '', label: '' }], red: [{ value: '', label: '' }] },
    val: [{ value: '', label: '' }],
};

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setVal: (state, action: PayloadAction<any>) => {
            state.value = action.payload;
         
        },
        shuffleVal: (state, action: PayloadAction<any>) => {
            state.val = shuffle(action.payload);
        },
        SetId: (state, action: PayloadAction<any>) => {
            state.valId = action.payload;
        },
    },
});

const shuffle = (array: OptionType[]) => {
    const shuffled = array.slice();
    let currentIndex = shuffled.length;
    let temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = shuffled[currentIndex];
        shuffled[currentIndex] = shuffled[randomIndex];
        shuffled[randomIndex] = temporaryValue;
    }
    return shuffled;
};


export const { setVal, shuffleVal, SetId } = dataSlice.actions;
export default dataSlice.reducer;