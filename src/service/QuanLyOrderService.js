import axios from "axios"
import { DOMAIN } from "../util/config";
import { baseService } from "./baseService";

export class QuanLyOrderService extends baseService { 

    taoOrderService = (form) => {
        return this.post(`${DOMAIN}/bills`,form)
    }

    layDanhSachOrder = () => {
        return this.get(`${DOMAIN}/bills/detail`)
    }

    layDanhSachDetailOrder = () => {
        return this.get(`${DOMAIN}/bills/details`)
    }
    
    layDanhSachDetailOrderTakeAway = () => {
        return this.get(`${DOMAIN}/bills/takeaway`)
    }
  

    huyOrderService = ( id)=>{
        return this.delete(`${DOMAIN}/bills/${id}`)
    }

    hoanThanhOderService = (id)=>{
        return this.get(`${DOMAIN}/bills/finish/${id}`)
    }

    thanhToanService = ( id)=>{
        return this.get(`${DOMAIN}/bills/billpayment/${id}`)
    } 

    thayDoiTrangThaiMonService = (id)=>{
        return this.get(`${DOMAIN}/billsdetail/changestatus/${id}`)
    }

    
    layDanhSachBangTableService = ( id)=>{
        return this.post(`${DOMAIN}/bills/bytableid` , id)
    }


}


export const qlOrderService = new QuanLyOrderService();