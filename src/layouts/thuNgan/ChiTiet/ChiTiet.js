
import React, { useState } from 'react'
import '../thungan.css'
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
 
import { Button } from "primereact/button";
import moment from 'moment';
import NotFoundWater from '../../phucVu/Order/NotFound/NotFoundWater';
import { Tooltip } from 'antd';
import { useDispatch } from 'react-redux';
import {changeTabActiveAction} from '../../../redux/actions/QuanLyUngDung'
import { useRef } from 'react';
import { Toast } from 'primereact/toast';
import HoaDon from '../HoaDon/HoaDon';
export default function ChiTiet(props) {

    const toast = useRef(null);
    const [openModal, setOpenModel] = useState('')
    const showError = () => {
      toast.current.show({severity:'error', summary: 'Error Message', detail:'Bạn chưa chọn order', life: 3000});
    }


    const {chiTietBill} = props

    const dispatch = useDispatch()

    const renderBillDetail = ()=>{
        return chiTietBill.map((item, index)=>{
            return <tr key={index} >
            <th scope="row">{item.name}</th>
            <td>{item.amount}</td>
            <td>{item.size}</td>
            <td>
                <Tooltip title={item.decription} >
                    <button className='btn btn-outline-primary' ><i class="fa-solid fa-comment-medical"></i></button>
                    
                </Tooltip>
            </td>
            <td>{item.price.toLocaleString()}VND</td>
            <td>{item.totalMoney.toLocaleString()}VND</td>

          </tr>
        })
    }   

  return (
    
    <div className="col-8 thanh-toan">
      <HoaDon chiTietBill={chiTietBill}/>
    <div  style={{overflow:'scroll'}} className="card">
      <div className="card-header">
        <div className="tt-info">
        <h5>Mã hóa đơn : {chiTietBill[0].id} - {chiTietBill[0].ban} - Tầng {chiTietBill[0].area}</h5>
        <h5>{moment(chiTietBill[0].createdAt).format('hh:mm A - dd/mm/yyyy')}</h5>
        </div>
      </div>

      {chiTietBill[0].name != '' ? <div>
          

        
        <div className="card-body">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Tên nước uống</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Kích thước</th>
                <th scope="col">Mô tả</th>
                <th scope="col">Giá</th>
                <th scope="col">Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {renderBillDetail()}
            </tbody>
          </table>
        </div>
        </div> : <NotFoundWater message="Vui lòng chọn order để thanh toán !"  />}
    </div>
    <div className="xac-nhan" >
      <div className="d-flex row" >
        <h5 className="col-5" >Thành tiền</h5>
        {chiTietBill[0].name != '' ?<h5 className="col-7" >Tổng tiền thanh toán : <span className="text-success" >{chiTietBill[0].total.toLocaleString()} VND</span> </h5> : <h5 className="col-7" >Tổng tiền thanh toán : <span className="text-success" >{chiTietBill[0].total  } VND</span> </h5>}
      </div>
      <div className="button-demo p-1" style={{borderTop:'1px solid grey'}}>
        <div className="template">
        <Button onClick={()=>{
            dispatch(changeTabActiveAction("1"))
        }} className="youtube ml-2 p-0" aria-label="Discord">
        <i class="fas fa-chevron-left"></i>
                <span className="px-3">QUAY LẠI</span>
        </Button>
        <Toast ref={toast} />
        <Button data-toggle="modal" data-target={`#${openModal}`}  onClick={()=>{
           
           if(chiTietBill[0].name == ''){
            setOpenModel('')
            showError();
          }else{
            setOpenModel('hoadon')
          }


        }} className="vimeo ml-2 p-0" aria-label="Discord">
        <i class="fas fa-print"></i>
                <span className="px-3">IN HÓA ĐƠN</span>
        </Button>
        

        <Button onClick={()=>{

          

           if(chiTietBill[0].name == ''){
            showError();
            setOpenModel('')
          }else{
            setOpenModel('exampleModal')
          }

        }} className="slack ml-2 p-0"  data-toggle="modal" data-target={`#${openModal}`} aria-label="Discord">
        <i class="fas fa-dollar-sign"></i>
                <span className="px-3">THU TIỀN</span>
        </Button>


        </div>
      </div>
    </div>
  </div>
  )
}
