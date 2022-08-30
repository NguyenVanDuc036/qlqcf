import { LAY_CHI_CA_LAM, LAY_CHI_TIET_NHAN_VIEN, LAY_DANH_SACH_NHAN_VIEN } from "../actions/types/QuanLyNhanVienType";

const stateDefault = {
    danhSachNhanVien : [],
    chiTietNhanVien : {},
    danhSachCaLam : []
}

export const QuanLyNguoiDungReducer = (state = stateDefault,action)=>{
    switch (action.type) {

        case LAY_DANH_SACH_NHAN_VIEN : {
            state.danhSachNhanVien = [...action.payload]
            return {...state}
        }

        case LAY_CHI_TIET_NHAN_VIEN : {
            state.chiTietNhanVien = action.payload
            return {...state}
        }

        case LAY_CHI_CA_LAM : {
            state.danhSachCaLam = [...action.payload]
            return {...state}
        }
        
        default:
            return {...state};
    }
}