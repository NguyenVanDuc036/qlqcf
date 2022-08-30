import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { layDanhSachBanAction } from "../../../redux/actions/QuanLyBanAction";
import './Ban.css'
export default function ThongTinBan() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layDanhSachBanAction(""));
  }, []);

  const { tongBan , tongGhe , tang , banToanQuan , gheToanQuan ,gheTrongToanQuan , gheTrongTang } = useSelector(
    (state) => state.QuanLyBanReducer
  );


  
  return (
    <div className="map-top" >
            <div className="row" >
              <div className="col-4" >
                <h5>Toàn bộ quán : <span>Trống <span style={{color:'green'}} >{gheTrongToanQuan}</span>/{banToanQuan} bàn - {gheToanQuan} ghế</span></h5>
              </div>
              <div className="col-4" >
              <h5>Tầng {tang} : <span>Trống <span style={{color:'green'}} >{gheTrongTang}</span>/{tongBan} bàn - {tongGhe} ghế</span></h5>
              </div>
              <div className="col-4 d-flex" >
                <div style={{alignItems:'center'}} className="d-flex" >
                  <button className="ban mr-2" ></button>
                  Bàn trống
                </div>
                <div style={{alignItems:'center'}} className="d-flex" >
                  <button className="banDangDat mr-2" ></button>
                  Bàn đang phục vụ
                </div>
                <div style={{alignItems:'center'}} className="d-flex" >
                  <button className="banDangBan mr-2" ></button>
                  Bàn đang bận
                </div>
              </div>
              
            </div>
          </div>
  )
}
