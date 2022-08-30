import axios from "axios";
import Swal from 'sweetalert2'
import { history } from './../../App';
import { Redirect } from 'react-router';
import { qlNhanVienService } from "../../service/QuanLyNhanVienService";
import { LAY_CHI_CA_LAM, LAY_CHI_TIET_NHAN_VIEN, LAY_DANH_SACH_NHAN_VIEN } from "./types/QuanLyNhanVienType";
export  const layDanhSachNhanVienAction = (name='') => {

    return async (dispatch,getState) => {
        try {

            // Gọi api để lấy danh sách nhân viên
            const result = await qlNhanVienService.layDanhSachNhanVien(name);

            // Nếu lấy thành công thì đẩy danh sách nhân viên lên redux
            dispatch({
                type:LAY_DANH_SACH_NHAN_VIEN,
                payload:result.data
            })      

            console.log(result.data);
            } catch (error) {
            
                console.log('that bai', error);
            }
    }
}


export  const dangNhapAction = (data) => {

    return async (dispatch,getState) => {
        try {

            const result = await qlNhanVienService.dangNhap(data);
            localStorage.setItem("userLogin", JSON.stringify(result.data.employee));  

            if(result.data.employee.position == 'phucVu'){
                history.push('/phucvu')
            }else if(result.data.employee.position == 'quanLy'){
                history.push('/admin/home')
            }else if(result.data.employee.position == 'thuNgan'){
                history.push('/thungan')
            }else if(result.data.employee.position == 'phaChe'){
                history.push('/phaChe')
            }

            } catch (error) {
                await Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Tài khoản hoặc mật khẩu không chính xác',
                })
            }
    }
}



export  const layChiTietNhanVien = (id) => {

    return async (dispatch,getState) => {
        try {

            // Sử dụng service, call api về server để lấy chi tiết nhân viên
            const result = await qlNhanVienService.layChiTietNhanVien(id);

            
            dispatch({
                type:LAY_CHI_TIET_NHAN_VIEN,
                payload:result.data
            })      

            console.log(result.data);
            } catch (error) {
            
                console.log('that bai', error);
            }
    }
}


export  const themNhanVienAction = (formData) => {

    return async (dispatch,getState) => {
        try {

            const result = await qlNhanVienService.themNhanVien(formData);
            
            await Swal.fire({
                icon: 'success',
                title: 'Oops...',
                text: "Thêm nhân viên thành công!",
            })
            
            await history.push('/admin/employees')

            
            
            } catch (error) {
            
                console.log('that bai', error);
            }
    }
}

export  const capNhatNhanVienAction = (formData , id) => {

    return async (dispatch,getState) => {
        try {

            const result = await qlNhanVienService.capNhatNhanVien(formData,id);
            
            await Swal.fire({
                icon: 'success',
                title: 'Oops...',
                text: "Cập nhật nhân viên thành công",
            })
            
            history.push('/admin/employees')

            
            } catch (error) {
                await Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Cập nhật nhân thất bại",
                })
                console.log('that bai', error);
            }
    }
}


export  const xoaNhanVienAction = ( id) => {

    return async (dispatch,getState) => {
        try {

            const result = await qlNhanVienService.xoaNhanVien(id);


            dispatch(layDanhSachNhanVienAction())        
            
            
            } catch (error) {
                await Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Không thể xóa nhân viên",
                })
            }
    }
}


export  const layDanhSachCaLamAction = (id) => {

    return async (dispatch,getState) => {
        try {

            const result = await qlNhanVienService.layDanhSachCaLam(id);
            dispatch({
                type:LAY_CHI_CA_LAM,
                payload:result.data
            })      

            } catch (error) {
            
                console.log('that bai', error);
            }
    }
}