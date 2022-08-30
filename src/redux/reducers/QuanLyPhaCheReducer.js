import { CHI_TIET_BILL, DANH_SACH_ORDER, HOAN_THANH_MON, RESET_BILL } from "../actions/types/QuanLyPhaCheType";

const stateDefault = {
    trangThaiMon : false,
    chiTietBill : [
        {name:'',ban:'',size:'',decription:'',status:'',id:'',area:'',totalMoney:0,numberOfSeat:'',total:0,createdAt:'',price : 0}
    ],
    danhSachOrder : []
}

export const QuanLyPhaCheReducer = (state = stateDefault,action)=>{
    switch (action.type) {
        
        case HOAN_THANH_MON : {
            const chiTietBill = [...state.chiTietBill]
            const index = chiTietBill.findIndex((item => item.BillDetailId == action.payload));

            if(index != -1){
                if(chiTietBill[index].status == 0 ){
                    chiTietBill[index].status = 1;
                }else{
                    chiTietBill[index].status = 0;
                }
            }

            state.chiTietBill = [...chiTietBill]
            console.log(action.payload);
            return {...state}
        }

        case CHI_TIET_BILL : {
            const detailBill = [...action.payload];
            state.chiTietBill = [...detailBill]
            return {...state}
        }

        case DANH_SACH_ORDER : {
            const danhSachOrder = [...action.payload];
            state.danhSachOrder = [...danhSachOrder];
            return {...state}
        }

        case RESET_BILL : {
            state.chiTietBill = [{name:'',ban:'',size:'',decription:'',status:'',id:'',area:'',totalMoney:'',numberOfSeat:'',moneyDetail:'',createdAt:''}
            ]
            return {...state}
        }
        
        default:
            return {...state};
    }
}