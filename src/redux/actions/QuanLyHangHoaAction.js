import axios from "axios";
import Swal from 'sweetalert2'
import { history } from './../../App';
import { Redirect } from 'react-router';
import { qlNhanVienService } from "../../service/QuanLyNhanVienService";
import { qlHangHoaService } from "../../service/QuanLyHangHoaService";
import { LAY_CHI_TIET_HANG_HOA, LAY_DANH_SACH_HANG_HOA } from "./types/QuanLyHangHoaType";

export  const layDanhSachHangHoaAction = (name='') => {

    return async (dispatch,getState) => {
        try {

            const result = await qlHangHoaService.layDanhHangHoa(name);
            dispatch({
                type:LAY_DANH_SACH_HANG_HOA,
                payload:result.data
            })      

            console.log(result.data);
            } catch (error) {
            
                console.log('that bai', error);
            }
    }
}


export  const layChiTietHangHoaAction = (id) => {

    return async (dispatch,getState) => {
        try {

            const result = await qlHangHoaService.layChiTietHangHoa(id);
            dispatch({
                type:LAY_CHI_TIET_HANG_HOA,
                payload:result.data
            })      

            console.log(result.data);
            } catch (error) {
            
                console.log('that bai', error);
            }
    }
}


export  const themHangHoaAction = (formData) => {

    return async (dispatch,getState) => {
        try {

            const result = await qlHangHoaService.themHangHoa(formData);
            
            await Swal.fire({
                icon: 'success',
                title: 'Oops...',
                text: "Thêm hàng hóa thành công!",
            })
            
            await history.push('/admin/goods')

            
            
            } catch (error) {
            
                console.log('that bai', error);
            }
    }
}

export  const capNhatHangHoaAction = (formData , id) => {

    return async (dispatch,getState) => {
        try {

            const result = await qlHangHoaService.capNhatHangHoa(formData,id);
            
            await Swal.fire({
                icon: 'success',
                title: 'Oops...',
                text: "Cập nhật hàng hóa thành công",
            })
            
            history.push('/admin/goods')

            
            } catch (error) {
                await Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Cập nhật hàng hóa thất bại",
                })
                console.log('that bai', error);
            }
    }
}


export  const xoaHangHoaAction = ( id) => {

    return async (dispatch,getState) => {
        try {

            const result = await qlHangHoaService.xoaHangHoa(id);
            dispatch(layDanhSachHangHoaAction())           
            } catch (error) {
                await Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Không thể Hàng hóa",
                })
            }
    }
}
