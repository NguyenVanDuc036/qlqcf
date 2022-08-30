import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { layDanhSachOrderDetailAction } from '../../../redux/actions/QuanLyOrderAction';

export default function HoaDon(props) {


    const {chiTietBill} = props

    const dispatch = useDispatch()



    const user = JSON.parse(localStorage.getItem('userLogin'))
   console.log({chiTietBill});
    const renderBill = ()=>{
        return chiTietBill.map((item, index) => {
            return  <tr key={index} >
                        <th scope="row">{item.name}</th>
                        <td>{item.amount}</td>
                        <td>{item.price.toLocaleString()} ₫</td>
                        <td>{item.totalMoney.toLocaleString()} ₫</td>
                </tr>
        })
    }

  return (
    <div>
    <div>
  {/* Button trigger modal */}

  {/* Modal */}
  <div className="modal fade" id="hoadon" tabIndex={-1} role="dialog" aria-labelledby="hoadonLabel" aria-hidden="true">
    <div className="modal-dialog modal-lg" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title " id="hoadonLabel">Hóa đơn thanh toán</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">
            <i style={{color:'red',fontSize:'35px'}} class="fas fa-window-close"></i>
            </span>
          </button>
        </div>
        <div className="modal-body">
          <div className='container text-center'   >
                <div className='card m-0' >
                    <div className='card-header' >
                        <h3 className='text-dark m-0 p-0'>HÓA ĐƠN THANH TOÁN</h3>
                        <span>SỐ : {chiTietBill[0].id}</span><br/>
                        <span className='text-dark' style={{fontWeight:'500'}} ><span>Bàn {chiTietBill[0].ban} - Tầng {chiTietBill[0].area}</span></span>
                    </div>
                    <div className='card-body text-left p-3' >
                        <div className='row' >
                            <div className='col-6'>
                                <span>Ngày : {moment(chiTietBill[0].createdAt).format('DD/MM/YYYY')} </span><br/>
                                <span>Thu ngân : {user.name} </span><br/>
                                <span>Giờ vào :  {moment(chiTietBill[0].createdAt).format('HH:MM:SS')}</span>
                            </div>
                            <div className='col-6 text-right'>
                                <span>Mã hóa đơn :{chiTietBill[0].id}</span><br/>
                                <span>In lúc : {moment(Date.now()).format('HH:MM:SS')}</span><br/>
                                <span>Giờ ra : {moment(Date.now()).format('HH:MM:SS')}</span>
                            </div>
                            <table class="table">
                            <thead>
                                <tr>
                                <th scope="col">Mặt hàng</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Giá</th>
                                <th scope="col">Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>

                                {renderBill()}
                            
                            </tbody>
                            </table>
                        </div>
                    </div>
                    
                    
                </div>
                <div className='row' >
                        <div className='col-6 text-left' >
                            <h4 className='p-0 m-0' >Tổng : </h4>
                        </div>
                        <div className='col-6 text-right' >
                            <h4 className='p-0 m-0'>{chiTietBill[0].total.toLocaleString()} ₫</h4>
                        </div>
                    </div>
                    <i>Xin cảm ơn Quý Khách, hẹn gặp lại</i>

          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
          <button type="button" className="btn btn-success">  <i class="fas fa-print mr-2"></i>In hóa đơn</button>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}
