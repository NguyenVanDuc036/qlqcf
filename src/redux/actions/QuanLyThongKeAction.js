import axios from "axios";
import Swal from 'sweetalert2'
import { qlThongKeService } from "../../service/ThongKeService";
import { GET_PROCEEDS, GET_TOP_SIX } from "./types/QuanLyThongKeType";

export  const layTopSixAction = (formData) => {

    return async (dispatch,getState) => {
        try {

            const result = await qlThongKeService.layTopSix(formData);
            
            dispatch({
                type:GET_TOP_SIX,
                 payload : {data:result.data, month : formData}
            })

            
            } catch (error) {
            
                console.log('that bai', error);
            }
    }
}

export  const layDoanhThuAction = (formData) => {

    return async (dispatch,getState) => {
        try {

            const result = await qlThongKeService.layDoanhThu(formData);
            
            dispatch({
                type:GET_PROCEEDS,
                 payload : result.data
            })

            
            } catch (error) {
            
                console.log('that bai', error);
            }
    }
}

