import axios from "axios"
import { DOMAIN } from "../util/config";
import { baseService } from "./baseService";

export class QuanLyHangHoaService extends baseService { 

    layDanhHangHoa = (name='') => {
        return this.get(`${DOMAIN}/goods?name=${name}`)
    }

    layChiTietHangHoa = (id) => {
        return this.get(`${DOMAIN}/goods/${id}`)
    }

    themHangHoa =(formData)=>{
        return this.post(`${DOMAIN}/goods`,formData)
    }

    capNhatHangHoa = (formData , id)=>{
        return this.put(`${DOMAIN}/goods/${id}`,formData)
    }

    xoaHangHoa = ( id)=>{
        return this.delete(`${DOMAIN}/goods/${id}`)
    }

    

}


export const qlHangHoaService = new QuanLyHangHoaService();