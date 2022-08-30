import { RESET_BILL } from "./types/QuanLyPhaCheType"
import { CHANGE_TAB_ACTIVE } from "./types/QuanLyUngDungType"


export  const changeTabActiveAction =  (key) => {

    return async (dispatch,getState) => {
        dispatch({
            type:CHANGE_TAB_ACTIVE,
            payload:key
        })  

    }
}

