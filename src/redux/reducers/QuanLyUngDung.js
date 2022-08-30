import { CHANGE_TAB_ACTIVE } from "../actions/types/QuanLyUngDungType";

const user = localStorage.getItem('userLogin');
const stateDefault = {
    tabActive : '1',
    userLogin :user
}

export const QuanLyUngDung = (state = stateDefault,action)=>{
    switch (action.type) {

        case CHANGE_TAB_ACTIVE : {
            state.tabActive = action.payload.toString();
            return {...state}
        }
        
        default:
            return {...state};
    }
}