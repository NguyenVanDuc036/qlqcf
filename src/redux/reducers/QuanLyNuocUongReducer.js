import { LAY_DANH_SACH_NUOC_UONG, LAY_CHI_TIET_NUOC_UONG, LAY_DANH_SACH_LOAI_NUOC, CHON_NUOC_UONG, HUY_MON, THEM_HUY_MON, RESET_BILL_DETAIL, UPDATE_BILL, THEM_HUY_MON_UPDATE, HUY_MON_UPDATE } from "../actions/types/QuanLyNuocUongType";

const stateDefault = {
    danhSachNuocUong :[],
    chiTietNuocUong : {},
    chiTietBill : [
    ],
    isUpdate : false,
    danhSachLoaiNuoc : []
}

export const QuanLyNuocUongReducer = (state = stateDefault,action)=>{
    switch (action.type) {
        
        case LAY_DANH_SACH_NUOC_UONG : {
            state.danhSachNuocUong = [...action.payload]
            return {...state}
        }

        case LAY_DANH_SACH_LOAI_NUOC : {
            state.danhSachLoaiNuoc = [...action.payload]
            return {...state}
        }

        case UPDATE_BILL : {
            state.chiTietBill = [...action.payload]
            state.isUpdate = true;
            return {...state}
        }

        case LAY_CHI_TIET_NUOC_UONG : {
            state.chiTietNuocUong = {...action.payload}
            return {...state}
        }

        case CHON_NUOC_UONG : {
            
            const oldChiTietBill  = [...state.chiTietBill]
            let index = oldChiTietBill.findIndex(bill => bill.id === action.payload.id)

            if(index == -1){
                state.chiTietBill = [...state.chiTietBill,action.payload]
            }
            
            console.log({index});
            return {...state}
        }

        case HUY_MON : {
            let chiTietBillOld = [...state.chiTietBill];
            chiTietBillOld = chiTietBillOld.filter(item=>item.id !== action.payload);
            state.chiTietBill = [...chiTietBillOld]
            return {...state}
        }

        case HUY_MON_UPDATE : {
            let chiTietBillOld = [...state.chiTietBill];
            chiTietBillOld = chiTietBillOld.filter(item=>item.waterId !== action.payload);
            state.chiTietBill = [...chiTietBillOld]
            return {...state}
        }


        case THEM_HUY_MON : {

            const {id , number} = action.payload

            var oldChiTietBill  = [...state.chiTietBill]
            let index = oldChiTietBill.findIndex(bill => bill.id === id)

            if( state.chiTietBill[index].amount >= 1){
                state.chiTietBill[index].amount += number;
                state.chiTietBill[index].totalMoney =  state.chiTietBill[index].price *  state.chiTietBill[index].amount ;
                if( state.chiTietBill[index].amount == 0){
                    state.chiTietBill[index].amount = 1;
                    state.chiTietBill[index].totalMoney =  state.chiTietBill[index].price
                }
            }     
            return {...state}
        }

        case THEM_HUY_MON_UPDATE : {

            const {waterId , number} = action.payload

            var oldChiTietBill  = [...state.chiTietBill]
            let index = oldChiTietBill.findIndex(bill => bill.waterId === waterId)

            if( state.chiTietBill[index].amount >= 1){
                state.chiTietBill[index].amount += number;
                state.chiTietBill[index].totalMoney =  state.chiTietBill[index].price *  state.chiTietBill[index].amount ;
                if( state.chiTietBill[index].amount == 0){
                    state.chiTietBill[index].amount = 1;
                    state.chiTietBill[index].totalMoney =  state.chiTietBill[index].price
                }
            }     
            return {...state}
        }
        
        
        case RESET_BILL_DETAIL : {
            state.chiTietBill =[];
            state.isUpdate =false;
            return {...state}
        }


        default:
            return {...state};
    }
}

// name , imgSrc , price , size , typeOfDrink_id , status