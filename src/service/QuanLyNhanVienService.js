import axios from "axios"
import { DOMAIN } from "../util/config";
import { baseService } from "./baseService";


export class QuanLyNhanVienService extends baseService { 


    dangNhap =(formData)=>{
        return this.post(`${DOMAIN}/employees/login`,formData)
    }

    layDanhSachNhanVien = (name='') => {

        return this.get(`${DOMAIN}/employees?name=${name}`)

    }

    layChiTietNhanVien = (id) => {

        return this.get(`${DOMAIN}/employees/${id}`)

    }

    themNhanVien =(formData)=>{
        return this.post(`${DOMAIN}/employees`,formData)
    }

    capNhatNhanVien = (formData , id)=>{
        return this.put(`${DOMAIN}/employees/${id}`,formData)
    }

    xoaNhanVien = ( id)=>{
        return this.delete(`${DOMAIN}/employees/${id}`)
    }


    layDanhSachCaLam = (id) => {

        return this.get(`${DOMAIN}/employee_shift/getAllShiftOfAEmployee/${id}`)

    }
   

}


export const qlNhanVienService = new QuanLyNhanVienService();