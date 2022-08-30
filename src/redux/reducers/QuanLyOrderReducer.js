import { LAY_DANH_SACH_ORDER, LAY_DANH_SACH_ORDER_TAKE_AWAY } from "../actions/types/QuanLyOrderType";

const stateDefault = {
    danhSachOrder : [],
    danhSachOrderTakeAway : []
}

export const QuanLyOrderReducer = (state = stateDefault,action)=>{
    switch (action.type) {

        case LAY_DANH_SACH_ORDER : {
            state.danhSachOrder = [...action.payload]

            return {...state}
        }

        case LAY_DANH_SACH_ORDER_TAKE_AWAY : {
            state.danhSachOrderTakeAway = [...action.payload]


            return {...state}
        }
        
        default:
            return {...state};
    }
}