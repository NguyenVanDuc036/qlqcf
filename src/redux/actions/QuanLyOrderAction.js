import axios from "axios";
import Swal from 'sweetalert2'
import { history } from './../../App';
import { Redirect } from 'react-router';
import { qlNhanVienService } from "../../service/QuanLyNhanVienService";
import { qlHangHoaService } from "../../service/QuanLyHangHoaService";
import { LAY_CHI_TIET_HANG_HOA, LAY_DANH_SACH_HANG_HOA } from "./types/QuanLyHangHoaType";
import { qlOrderService } from "../../service/QuanLyOrderService";
import { changeTabActiveAction } from "./QuanLyUngDung";
import { layDanhSachBanAction, resetBanAction } from "./QuanLyBanAction";
import { resetChiTietBillAction } from "./QuanLyNuocUongAction";
import { LAY_DANH_SACH_ORDER, LAY_DANH_SACH_ORDER_TAKE_AWAY } from "./types/QuanLyOrderType";
import { CHI_TIET_BILL, DANH_SACH_ORDER, HOAN_THANH_MON, RESET_BILL } from "./types/QuanLyPhaCheType";

export  const taoOrderAction = (form) => {

    return async (dispatch,getState) => {
        try {

            const result = await qlOrderService.taoOrderService(form);
            await Swal.fire(
                'Good job!',
                'Bạn đã tạo hóa đơn thành công !',  
                'success'
              )
            await dispatch(layDanhSachBanAction(''))
            // await dispatch(layDanhSachOrderAction(''))
            await   dispatch(layDanhSachOrderDetailAction());
            await   dispatch(layDanhSachOrderTakeAwayAction());

            await dispatch(changeTabActiveAction(1))
            await dispatch(resetChiTietBillAction())
            await dispatch(resetBanAction())
            } catch (error) {
                await Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Không thể tạo hóa đơn',
                })
                console.log('that bai', error);
            }
    }
}



export  const layDanhSachOrderAction = () => {

    return async (dispatch,getState) => {
        try {

            const result = await qlOrderService.layDanhSachOrder();

            await dispatch({
                type:LAY_DANH_SACH_ORDER,
                 payload : result.data
            })
            } catch (error) {
                await Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Không thể lấy danh sách order',
                })
                console.log('that bai', error);
            }
    }
}

export  const layDanhSachOrderDetailAction = () => {

    return async (dispatch,getState) => {
        try {

            const result = await qlOrderService.layDanhSachDetailOrder();

            await dispatch({
                type:DANH_SACH_ORDER,
                 payload : result.data
            })
            
            } catch (error) {
                await Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Không thể lấy danh sách order',
                })
                console.log('that bai', error);
            }
    }
}




export  const layDanhSachOrderTakeAwayAction = () => {

    return async (dispatch,getState) => {
        try {

            const result = await qlOrderService.layDanhSachDetailOrderTakeAway();

            await dispatch({
                type:LAY_DANH_SACH_ORDER_TAKE_AWAY,
                payload : result.data
            })
            
            } catch (error) {
                await Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Không thể lấy danh sách order',
                })
                console.log('that bai', error);
            }
    }
}

export  const hoanThanhOrderAction = (id) => {

    return async (dispatch,getState) => {
        try {

            const result = await qlOrderService.hoanThanhOderService(id);
            await dispatch(layDanhSachOrderDetailAction())
            await Swal.fire({
                icon: 'success',
                text: 'Cập nhật thành công!',
            })

            await dispatch({
                type:RESET_BILL
            })
            
            await dispatch(layDanhSachOrderTakeAwayAction())
            await dispatch(changeTabActiveAction("1"))
            } catch (error) {
                console.log('that bai', error);
            }
    }
}

export  const thanhToanAction = (id) => {

    return async (dispatch,getState) => {
        try {

            const result = await qlOrderService.thanhToanService(id);
           
            await Swal.fire({
                icon: 'success',
                text: 'Thanh toán thành công!',
            })
            await dispatch(layDanhSachOrderDetailAction())
            await dispatch(layDanhSachOrderTakeAwayAction())
            
            await dispatch({
                type:RESET_BILL
            })
            
            await dispatch(changeTabActiveAction("1"))
            } catch (error) {
                console.log('that bai', error);
            }
    }
}
export  const layChiTietBillAction = (payload) => {

    return  (dispatch,getState) => {

        
             dispatch({
                type:CHI_TIET_BILL,
                 payload : payload
            })
            
            dispatch(changeTabActiveAction("2"))

    }
}

export  const hoanThanhMonAction =  (id) => {

    return async  (dispatch,getState) => {
            await dispatch({
                type:HOAN_THANH_MON,
                 payload : id
            })

            try {
                const result = await qlOrderService.thayDoiTrangThaiMonService(id);
                await dispatch(layDanhSachOrderDetailAction())
            } catch (error) {
                console.log(error);
            }

    }
}


export  const layDanhSachBangTableService = (id) => {

    return async (dispatch,getState) => {
        try {

            const result = await qlOrderService.layDanhSachBangTableService(id);

            await dispatch({
                type:LAY_DANH_SACH_ORDER,
                 payload : result.data
            })

            } catch (error) {
            }
    }
}



export  const huyOrderAction = (id='') => {

    return async (dispatch,getState) => {
        try {

            const result = await qlOrderService.huyOrderService(id);
            await dispatch(layDanhSachOrderDetailAction());
            await dispatch(layDanhSachOrderTakeAwayAction());
            await dispatch(layDanhSachBanAction())
            } catch (error) {
                await Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hủy order không thành công',
                })
                console.log('that bai', error);
            }
    }
}



