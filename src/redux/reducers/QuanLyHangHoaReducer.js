import { LAY_CHI_TIET_HANG_HOA, LAY_DANH_SACH_HANG_HOA } from "../actions/types/QuanLyHangHoaType";

const stateDefault = {
    danhSachHangHoa : [],
    chiTietHangHoa : {},
}

export const QuanLyHangHoaReducer = (state = stateDefault,action)=>{
    switch (action.type) {

        case LAY_DANH_SACH_HANG_HOA : {
            state.danhSachHangHoa = [...action.payload]
            return {...state}
        }

        case LAY_CHI_TIET_HANG_HOA : {
            state.chiTietHangHoa = {...action.payload}
            return {...state}
        }
        
        default:
            return {...state};
    }
}