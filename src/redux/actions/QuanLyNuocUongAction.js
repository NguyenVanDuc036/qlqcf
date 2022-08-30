import axios from "axios";
import Swal from 'sweetalert2'
import { history } from './../../App';
import { Redirect } from 'react-router';

import { LAY_DANH_SACH_NUOC_UONG, LAY_CHI_TIET_NUOC_UONG, LAY_DANH_SACH_LOAI_NUOC, CHON_NUOC_UONG, HUY_MON, THEM_MON, GIAM_MON, THEM_HUY_MON, RESET_BILL_DETAIL, UPDATE_BILL, THEM_HUY_MON_UPDATE, HUY_MON_UPDATE } from "./types/QuanLyNuocUongType";
import { qlNuocUongService } from "../../service/QuanLyNuocUongService";
import { changeTabActiveAction } from "./QuanLyUngDung";

export  const layDanhSachNuocUongAction = (name='') => {

    return async (dispatch,getState) => {
        try {

            const result = await  qlNuocUongService.layDanhSachNuocUong(name);

            
            dispatch({
                type:LAY_DANH_SACH_NUOC_UONG,
                payload:result.data
            })      

            console.log(result.data);
            } catch (error) {
            
                console.log('that bai', error);
            }
    }
}


export  const layChiTietNuocUongAction = (id) => {

    return async (dispatch,getState) => {
        try {

            const result = await qlNuocUongService.layChiTietNuocUong(id);
            dispatch({
                type:LAY_CHI_TIET_NUOC_UONG,
                payload:result.data
            })      

            console.log(result.data);
            } catch (error) {
            
                console.log('that bai', error);
            }
    }
}


export  const themNuocUongAction = (formData) => {

    return async (dispatch,getState) => {
        try {

            const result = await qlNuocUongService.themNuocUong(formData);
            
            await Swal.fire({
                icon: 'success',
                title: 'Oops...',
                text: "Thêm nước uống thành công!",
            })
            
            await history.push('/admin/waters')

            
            
            } catch (error) {
            
                console.log('that bai', error);
            }
    }
}

export  const capNhatNuocUongAction = (formData , id) => {

    return async (dispatch,getState) => {
        try {

            const result = await qlNuocUongService.capNhatNuocUong(formData,id);
            
            await Swal.fire({
                icon: 'success',
                title: 'Oops...',
                text: "Cập nhật nước uống thành công",
            })
            
            history.push('/admin/waters')

            
            } catch (error) {
                await Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Cập nhật nước uống thất bại",
                })
                console.log('that bai', error?.respone);
            }
    }
}


export  const xoaNuocUongAction = ( id) => {

    return async (dispatch,getState) => {
        try {

            const result = await qlNuocUongService.xoaNuocUong(id);

            dispatch(layDanhSachNuocUongAction())           
            
            } catch (error) {
                await Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Không thể lấy nước uống",
                })
            }
    }
}






export  const layDanhSachLoaiNuocAction = () => {

    return async (dispatch,getState) => {
        try {
            const result = await qlNuocUongService.layDanhSachLoaiNuoc();        
            dispatch({
                type:LAY_DANH_SACH_LOAI_NUOC,
                payload:result.data
            })      
            } catch (error) {
                await Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Không thể nước uống",
                })
            }
    }
}


export  const layBangTen = (name ) => {

    return async (dispatch,getState) => {
        try {
            const result = await qlNuocUongService.layBangTen(name);        
            return result.data     
            } catch (error) {
                await Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Không thể nước uống",
                })
            }
    }
}
export  const capNhatConHangAction = (name ) => {

    return async (dispatch,getState) => {
        try {
            const result = await qlNuocUongService.capNhatConHang(name);        
            await dispatch(layDanhSachNuocUongAction())
            } catch (error) {
                console.log(error);
            }
    }
}

export  const capNhatHetHangAction = (name ) => {

    return async (dispatch,getState) => {
        try {
            const result = await qlNuocUongService.capNhatHetHang(name);        
            await dispatch(layDanhSachNuocUongAction())
            } catch (error) {
                console.log(error);
            }
    }
}



export const chonNuocAction = (nuoc) => {
    return async (dispatch,getState) => {
        await dispatch({
            type:CHON_NUOC_UONG,
            payload : nuoc
        })

    }
}

export const updateBillAction = (nuoc) => {
    return async (dispatch,getState) => {
        await dispatch({
            type:UPDATE_BILL,
            payload : nuoc
        })

        await dispatch(changeTabActiveAction(3))

    }
}

export const huyMonAction= (id) => {
    return async (dispatch,getState) => {
        await dispatch({
            type:HUY_MON,
            payload : id
        })

    }
}

export const huyMonUpdateAction= (id) => {
    return async (dispatch,getState) => {
        await dispatch({
            type:HUY_MON_UPDATE,
            payload : id
        })

    }
}

export const themHuyMonAction= (payload) => {
    return async (dispatch,getState) => {
        await dispatch({
            type:THEM_HUY_MON,
            payload : payload
        })

    }
}

export const themHuyMonUpdateAction= (payload) => {
    return async (dispatch,getState) => {
        await dispatch({
            type:THEM_HUY_MON_UPDATE,
            payload : payload
        })

    }
}
export const resetChiTietBillAction= (payload) => {
    return async (dispatch,getState) => {
        await dispatch({
            type:RESET_BILL_DETAIL,
        })

    }
}




