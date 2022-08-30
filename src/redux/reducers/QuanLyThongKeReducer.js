import { GET_PROCEEDS, GET_TOP_SIX } from "../actions/types/QuanLyThongKeType";


const stateDefault = {
    topSix : [],
    month : '',
    proceedsList : []
}

export const QuanLyThongKeReducer = (state = stateDefault,action)=>{
    switch (action.type) {

        case GET_TOP_SIX : {
            const newTopSix = [...action.payload.data];
            state.topSix = [...newTopSix]
            state.month = action.payload.month.month
            return {...state}
        }

        case GET_PROCEEDS : {
            const proceeds = [...action.payload];
            state.proceedsList = [...proceeds]
            return {...state}
        }
        
        default:
            return {...state};
    }
}