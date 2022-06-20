import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    actor: "",
    firstName: 'opp',
    lastName: '',
    img: '',
    fundraiseText: '',
    twitter: '',
    discord: '',
    category: '',
    name: '',
    amount: '',
    youtube: '',
    fundraiseReason: '',
}

const createProjectSlice = createSlice({
    name: 'create',
    initialState,
    reducers: {
        updateActor: (state, action) => {
            return {
                ...state,
                actor: action.payload.actor
            }
        },
        updateStep1: (state, action) => {
            console.log(action)
            return {
                ...state,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                fundraiseText: action.payload.fundraiseText,
            }
        },
        updateStep2: (state, action) => {
            return {
                ...state,
                twitter: action.payload.twitter,
                discord: action.payload.discord,
                name: action.payload.name,
                category: action.payload.category
            }
        },
        updateStep3: (state, action) => {
            return {
                ...state,
                amount: action.payload.amount
            }
        },
        updateStep4: (state, action) => {
            return {
                ...state,
                img: action.payload.img,
                youtube: action.payload.youtube
            }
        },
        updateStep5: (state, action) => {
            return {
                ...state,
                fundraiseReason: action.payload.fundraiseReason
            }
        }
    }
})

export default createProjectSlice.reducer
export const {
    updateActor,
    updateStep1,
    updateStep2,
    updateStep3,
    updateStep4,
    updateStep5
} = createProjectSlice.actions