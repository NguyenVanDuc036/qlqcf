import axios from "axios"
import { DOMAIN } from "../util/config";
import { baseService } from "./baseService";

export class ThongKeService extends baseService { 

    layTopSix = (form) => {
        return this.post(`${DOMAIN}/billsdetail/top`,form)
    }

    layDoanhThu = (form) => {
        return this.post(`${DOMAIN}/billsdetail/proceeds`,form)
    }

}


export const qlThongKeService = new ThongKeService();