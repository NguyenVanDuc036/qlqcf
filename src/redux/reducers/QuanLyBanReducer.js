import { LAY_DANH_SACH_BAN ,LAY_CHI_TIET_TANG, CHON_BAN, TIM_BAN, RESET_ALL} from "../actions/types/QuanLyBanType";


const stateDefault = {
    danhSachBan : [],
    chiTietTang : [],

    tongBan : 0 ,
    tongGhe: 0,
    banDangPhucVu : 0,

    tang : 1,
    banToanQuan:0,
    gheToanQuan : 0,
    gheTrongToanQuan:0,
    gheTrongTang : 0,

    banDuocChon : {name:0 , numberOfSeat : 0},

    tongBanTrong : []
}

export const QuanLyBanReducer = (state = stateDefault,action)=>{
    switch (action.type) {

        case LAY_DANH_SACH_BAN : {
            state.danhSachBan = [...action.payload]
            const tableList = state.danhSachBan[0];

            // Lấy thông tin toàn bộ quán
            //Bàn toàn quán
            state.banToanQuan = 0;
            for(var i = 0; i< state.danhSachBan.length ; i++){
                state.banToanQuan += state.danhSachBan[i].length;
            }

            // Lấy ghế trống toàn quán
            state.gheTrongToanQuan = 0;
            for(var i = 0; i< state.danhSachBan.length ; i++){
                for(var j = 0; j < state.danhSachBan[i].length;j++){
                    if(state.danhSachBan[i][j].status == 'Trống'){
                        state.gheTrongToanQuan ++;
                    }
                }
            }


            // Lấy danh sách bàn trông
            state.tongBanTrong =[]
            const danhSachBanTrong = [...state.tongBanTrong]
            for(var i = 0; i< state.danhSachBan.length ; i++){
                for(var j = 0; j < state.danhSachBan[i].length;j++){
                    if(state.danhSachBan[i][j].status == 'Trống'){
                        danhSachBanTrong.push(state.danhSachBan[i][j])
                    }
                }
            }
            state.tongBanTrong = [...danhSachBanTrong]


        
            
            // Ghế toàn quán
            state.gheToanQuan = 0;
            for(var i = 0; i< state.danhSachBan.length ; i++){
                for(var j = 0; j < state.danhSachBan[i].length;j++){
                    // state.gheToanQuan += state.danhSachBan[i][j].numberOfSeat
                    state.gheToanQuan +=  state.danhSachBan[i][j].numberOfSeat
                }
            }


            // Lấy thông tin tầng 1
            state.tongBan = tableList.length;
            state.tongGhe  = tableList.reduce((tongGhe,item,index)=>{
                return tongGhe+= item.numberOfSeat;
            },0)
            state.tang = tableList[0].area;

            

            return {...state}
        }

        case LAY_CHI_TIET_TANG : {
            const tableList = [...action.payload]
        
            // Lấy số bàn
            state.tongBan = tableList.length;
            
            // Lấy số ghế
            state.tongGhe  = tableList.reduce((tongGhe,item,index)=>{
                return tongGhe+= item.numberOfSeat;
            },0)

            // Lấy số tầng
            state.tang = tableList[0].area;

            // Lấy số bàn trống 
            state.gheTrongTang=0;
            for(var i=0 ; i<tableList.length;i++){
                if(tableList[i].status == 'Trống'){
                    state.gheTrongTang++;
                }
            }
        
            return {...state}
        }

        case CHON_BAN : {
            state.banDuocChon = action.payload
            console.log(action.payload);
            return {...state}
        }
        
        case TIM_BAN : {
            const danhSachBanTrong = [...state.tongBanTrong]
            let index = danhSachBanTrong.findIndex(ban => ban.id === action.payload)
            state.banDuocChon = {...danhSachBanTrong[index]}
            return {...state}
        }


        
        case RESET_ALL : {

            state.banDuocChon = {name:0 , numberOfSeat : 0};

            return {...state}
        }
        
        default:  return {...state};
    }
}