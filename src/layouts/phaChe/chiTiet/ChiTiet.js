import React, { useEffect, useState } from 'react'
import { Button } from "primereact/button";
import { Tooltip } from "antd";
import { useDispatch } from 'react-redux';
import { changeTabActiveAction } from '../../../redux/actions/QuanLyUngDung';
import Swal from 'sweetalert2';
import { hoanThanhMonAction, hoanThanhOrderAction } from '../../../redux/actions/QuanLyOrderAction';
import moment from 'moment';
import { async } from '@firebase/util';
import NotFoundWater from '../../phucVu/Order/NotFound/NotFoundWater';

export default function ChiTiet(props) {

    const {chiTietBill} = props
    console.log({chiTietBill});
    // const [isFinish,setIsFinish] = useState(false);
    var isFinish = false;



    const renderBillDetail = ()=>{
        return chiTietBill.map((item, index)=>{
            return <tr key={index} >
            <th scope="row">{item.name}</th>
            <th scope="row">
              <img src={item.imgSrc} width={70} style={{borderRadius:'5px'}} />   
            </th>
            <td>{item.amount}</td>
            <td>{item.size}</td>
            <td>{item.decription}</td>
            <td>{item.price.toLocaleString()}₫</td>
            <td>
                {item.status == 0 ?
                    <Tooltip title="Chưa hoàn thành">
                        <button onClick={()=>{
                            dispatch(hoanThanhMonAction(item.BillDetailId))
                        }} className="btn btn-danger">
                        <i class="fas fa-check"></i>
                        </button>
                    </Tooltip>
                    :
                    <Tooltip title="hoàn thành">
                        <button  onClick={()=>{
                            dispatch(hoanThanhMonAction(item.BillDetailId))
                        }} className="btn btn-success">
                        <i class="fas fa-check"></i>
                        </button>
                    </Tooltip>
                }
                
          
              
            </td>
          </tr>
        })
    }   

    const dispatch = useDispatch()
    
  return (
    <div className="phache">
    <div className=" pha-che">
      <div style={{overflow:'scroll'}} className="card">
      <div className="card-header">
          <div className="tt-info">
            {chiTietBill[0].statusBill  !=3 
              ? <h5>Mã hóa đơn : {chiTietBill[0].id} - {chiTietBill[0].ban} - Tầng {chiTietBill[0].area}</h5>
              :<h5>Mã hóa đơn : {chiTietBill[0].id} - Mang về <img width={50} src='./img/juice.png' /></h5>
            }
           
            <h5>{moment(chiTietBill[0].createdAt).format('hh:mm A - dd/mm/yyyy')}</h5>
          </div>
        </div>
        {chiTietBill[0].name != '' ? <div>
          

        
        <div className="card-body">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Tên nước uống</th>
                <th scope="col">Hình ảnh</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Kích thước</th>
                <th scope="col">Mô tả</th>
                <th scope="col">Giá</th>
                <th scope="col">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {renderBillDetail()}
            </tbody>
          </table>
        </div>
        </div> : <NotFoundWater message="Vui lòng chọn order để pha chế !"  />}
      </div>
      <div className="xac-nhan" >
        <div className="d-flex row" >
          <h5 className="col-5" >Thành tiền</h5>
          {chiTietBill[0].name != '' ?<h5 className="col-7" >Tổng tiền thanh toán : <span className="text-success" >{chiTietBill[0].total.toLocaleString()} ₫</span> </h5> : <h5 className="col-7" >Tổng tiền thanh toán : <span className="text-success" >{chiTietBill[0].total  } ₫</span> </h5>}
          
        </div>
        <div className="button-demo p-1" style={{borderTop:'1px solid grey'}}>
          <div className="template">
          <Button onClick={()=>{
            dispatch(changeTabActiveAction("1"))
          }} className="youtube ml-2 p-0" aria-label="Discord">
          <i class="fas fa-chevron-left"></i>
                  <span className="px-3">QUAY LẠI</span>
          </Button>

          <Button onClick={async()=>{
             isFinish = false
            for(var i = 0 ; i<chiTietBill.length ; i++){
                if(chiTietBill[i].status == 1){
                  isFinish = true
                  break;
                }
      
            }

            console.log({isFinish});

            if(isFinish){
              Swal.fire({
                title: `Bạn có chắc đã hoàn thành pha chế ? `,
                text: "Bạn sẽ không thể hoàn nguyên lại !",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Đồng ý!',
                cancelButtonText: 'Hủy'
              }).then((result) => {
                if (result.isConfirmed) {
  
                  dispatch(hoanThanhOrderAction(chiTietBill[0].id))
  
                  Swal.fire(
                    'Hoàn thành pha chế!',
                    `Bạn đã hoàn thành pha chế`,
                    'success'
                  )
                }
              })
            }else{
               Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Bạn cần hoàn thành tất cả các món',
            })
            }


           

          }} className="vimeo ml-2 p-0" aria-label="Discord">
          <i class="fas fa-check"></i>
                  <span className="px-3">HOÀN THÀNH </span>
          </Button>

          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
