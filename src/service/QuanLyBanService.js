import axios from "axios"
import { DOMAIN } from "../util/config";
import { baseService } from "./baseService";

export class QuanLyBanService extends baseService { 

    layDanhSachBanService = (name='') => {
        return this.get(`${DOMAIN}/tables?name=${name}`)
    }

    doiTrangThaiService = (id) => {
        return this.get(`${DOMAIN}/tables/status/${id}`)
    }
  

}


export const qlBanService = new QuanLyBanService();