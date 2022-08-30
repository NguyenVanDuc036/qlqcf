import { CHANGE_MONEY_BY_CASH, CHANGE_MONEY_BY_DEFAULT, RESET_MONEY } from "../actions/types/QuanLyThuNganType";

const stateDefault = {
    suggestions : [
        {id:1,value:500000},
        {id:2,value:200000},
        {id:3,value:100000},
        {id:4,value:50000},
        {id:5,value:20000},
        {id:6,value:10000},
        {id:7,value:5000},
        {id:8,value:2000},
        {id:9,value:1000},
    ],
    cash : [
        {id:1,value:100000},
        {id:1,value:150000},
        {id:1,value:200000},
        {id:1,value:250000},
        {id:1,value:300000},
        {id:1,value:350000},
        {id:1,value:400000},
        {id:1,value:500000},
    ],
    moneyReceived : 0,
    isCash : true,
    excessMoney : 0
}

export const QuanLyThuNganReducer = (state = stateDefault,action)=>{
    switch (action.type) {
        
        case CHANGE_MONEY_BY_DEFAULT : {
            state.moneyReceived = action.payload['payload'];
            state.isCash = true

            state.excessMoney = state.moneyReceived -  action.payload['total']

            return {...state}
        }

        case RESET_MONEY : {
            state.moneyReceived = 0;
            state.excessMoney = 0;
            return {...state}
        }

        case CHANGE_MONEY_BY_CASH : {
            if(state.isCash){
                state.moneyReceived = 0;
            }
            state.isCash = false

            state.moneyReceived += action.payload['payload']

            state.excessMoney = state.moneyReceived -  action.payload['total']
            return {...state}
        }

        default:
            return {...state};
    }
}