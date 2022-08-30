import axios from "axios";
import { ACCESS_TOKEN } from "../util/config";


export class baseService {

    get = (url) =>{
        return axios({
            url:url,
            method:'GET',
        })
    }

    post = (url,data) =>{
        return axios({
            url:url,
            data:data,
            method:'POST',
        })
    }

    put = (url,data) => {
        return axios({
            url:url,
            data:data,
            method:'PUT',
        })
    }
    delete = (url) => {
        return axios({
            url:url,
            method:'DELETE',
        })
    }
}