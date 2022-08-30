import { CHANGE_MONEY_BY_CASH, CHANGE_MONEY_BY_DEFAULT, RESET_MONEY } from "./types/QuanLyThuNganType"



export  const changeMoneyByCashAction =  (payload,total) => {

    return async (dispatch,getState) => {
        dispatch({
            type:CHANGE_MONEY_BY_CASH,
            payload:{payload,total}
        })  

    }
}

export  const changeMoneyByDefaultAction =  (payload,total) => {

    return async (dispatch,getState) => {
        dispatch({
            type:CHANGE_MONEY_BY_DEFAULT,
            payload:{payload,total}
        })  

    }
}

export  const resetMoneyAction =  () => {

    return async (dispatch,getState) => {
        dispatch({
            type:RESET_MONEY,
        })  

    }
}
