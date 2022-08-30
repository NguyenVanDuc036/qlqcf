import React, { useEffect } from 'react'
import './ChonNuoc.css'
import { Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { huyMonAction, huyMonUpdateAction, themHuyMonAction, themHuyMonUpdateAction } from "../../../redux/actions/QuanLyNuocUongAction";
import Swal from 'sweetalert2';
export default function ChonNuoc() {
  const dispatch = useDispatch();
  const { chiTietBill } = useSelector(
    (state) => state.QuanLyNuocUongReducer
  );

  console.log({chiTietBill});

  const { isUpdate } = useSelector(
    (state) => state.QuanLyNuocUongReducer
  );



  const renderNuocUong =()=>{

    return chiTietBill.map((item, index) => {
      return <tr key={index} >
      <td><h6>{item.name}</h6></td>
      <td>
            
            <Tooltip title="Thêm số lượng">
                <button onClick={()=>{
                  if(!isUpdate){
                    const payload = {id : item.id , number : 1}
                    dispatch(themHuyMonAction(payload))
                  }else{
                    const payload = {waterId : item.waterId , number : 1}
                    dispatch(themHuyMonUpdateAction(payload))
                  }
                  
                }} className='btn btn-outline-success' ><i class="fas fa-plus"></i></button>
            </Tooltip>
            <Tooltip title="Số lượng">
                <button className='btn btn-sl'  >{item.amount}</button>
            </Tooltip>
           
            <Tooltip title="Giảm số lượng">
                <button onClick={()=>{
                  const payload = {id : item.id , number : -1}
                  dispatch(themHuyMonAction(payload))
                }} className='btn btn-outline-danger'><i class="fas fa-minus"></i></button>
            </Tooltip>
      </td>
      <td>
        {item.size}
      </td>
      <td>{item.totalMoney.toLocaleString()}VND</td>
      <td>
        <Tooltip title="Hủy món">
            <button onClick={()=>{
               if(!isUpdate){
                dispatch(huyMonAction(item.id))
              }else{
                dispatch(huyMonUpdateAction(item.waterId))
              }
              
            }} className='btn btn-outline-danger' ><i class="fas fa-window-close"></i></button>
        </Tooltip>
      </td>
    </tr>
    })
  }


  return (
    <table className="table order-table mt-3">
  <thead>
    <tr>
      <th scope="col">Tên món</th>
      <th scope="col">Số lượng</th>
      <th scope="col">Kích thước</th>
      <th scope="col">Thành tiền</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    {renderNuocUong()}
  </tbody>
</table>

  )
}
