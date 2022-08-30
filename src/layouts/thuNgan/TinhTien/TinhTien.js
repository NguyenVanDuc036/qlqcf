import { async } from "@firebase/util";
import React, { useState } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { changeMoneyByCashAction, changeMoneyByDefaultAction, resetMoneyAction } from "../../../redux/actions/QuanLyThuNganAction";
import "../thungan.css";

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { thanhToanAction } from "../../../redux/actions/QuanLyOrderAction";
import Swal from "sweetalert2";

export default function TinhTien(props) {

  const toast = useRef(null);


    const showError = () => {
      toast.current.show({severity:'error', summary: 'Error Message', detail:'Đầu vào phải là số', life: 3000});
    }
  
  const { suggestions } = useSelector((state) => state.QuanLyThuNganReducer);

  const { cash } = useSelector((state) => state.QuanLyThuNganReducer);

  const { moneyReceived } = useSelector((state) => state.QuanLyThuNganReducer);

  const { excessMoney } = useSelector((state) => state.QuanLyThuNganReducer);


  
  const {moneyToPay,id,ban,area} = props;
  const [total, setTotal] = useState(moneyToPay);
  const [excessCash,setExcessCash] = useState(0)

  const refMoney = useRef('');
  const valMoney= useRef('');



  const dispatch = useDispatch()

  const renderSuggestions =()=>{
    return suggestions.map((item, index)=>{
      return  <div key={index} className="col-4">
      <button
        className="btn w-100 btn-outline-info"
        onClick={async ()=>{

          await dispatch(changeMoneyByCashAction(item.value,total))

        }}
      >
        {item.value.toLocaleString()}
      </button>
    </div>
    })
  }

  const renderCash =()=>{
    return cash.map((item, index)=>{
      return <div key={index} className="col-3  p-1">
      <button
        style={{ padding: "10px 25px" }}
        className="btn btn-success"
        onClick={ async ()=>{
          
          await dispatch(changeMoneyByDefaultAction(item.value,total))

        }}
      >
        {item.value.toLocaleString()}
      </button>
    </div>
    })
  }


  return (
    <div>
      <div
        className="modal mymodel fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"

      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title" id="exampleModalLabel">
                Thu tiền
              </h3>
              <button
                type="button"
                className="btn"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">
                  <i style={{color:'red',fontSize:'35px'}} class="fas fa-window-close"></i>
                </span>
              </button>
            </div>
            <div className="modal-body row p-4">
              
              
              <div style={{}} className="col-7  maytinh ">
              <div className="detail" >
                <h5>Mã hóa đơn : {id} - {ban} - Tầng {area}</h5>
              </div>
                <div className="p-2">
                  {" "}
                  <span className="h5">Nhập tiền khách đưa</span>
                  <i
                    style={{ fontSize: "20px" }}
                    class="fas fa-arrow-right mr-4 ml-4"
                  ></i>
                  <span className="h5">Chọn hình thức thanh toán</span>
                </div>
                <div className="row">
                  <div className="col-8 ">
                  <Toast ref={toast} />
                  <form className="d-flex" >
                  <input ref={refMoney}  onChange={()=>{
                         
                    }} className="form-control" style={{border:' 2.5px solid hsl(172, 67%, 45%)',padding:'10px !impotant',width:'96%',height:'3rem'}} />
                    <button onClick={(e)=>{
                          e.preventDefault();
                          var bill = refMoney.current.value;
                          if(bill == ''){
                              bill = 0;
                          }
                          var regexNumber = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/;
                          if(regexNumber.test(bill) || bill ==''){
                              dispatch(changeMoneyByDefaultAction(Number(refMoney.current.value),total))
                          }else{
                              showError()
                          }
                    }} className="btn btn-outline-success ml-1" type="submit"  >Tính tiền</button>
                  </form>
                    
                    <h5 className="p-2" >Nhập số tiền theo mệnh giá</h5>
                    <div className="row">
                      {renderSuggestions()}
              
                    </div>
                  </div>
                  <div className="col-4">
                    <button
                      style={{ padding: "10px 25px" }}
                      className="btn w-100 btn-success"
                    >
                      Tiền mặt
                    </button>
                  </div>
                </div>

                <h5>Gợi ý tiền mặt</h5>
                <div className="row">
                  {renderCash()}
                </div>
              </div>
              <div style={{flexDirection:'column',justifyContent:'space-between',border:'1px solid gray',borderRadius:'20px'}} className="col-5 d-flex p-4 cantra ">
                <div>
                <div
                  style={{ justifyContent: "space-between" }}
                  className="d-flex"
                >
                  <h5>Số tiền cần trả</h5>
                  <h5>{total.toLocaleString()} VND</h5>
                </div>

                <table style={{fontSize:'18px'}} class="table">
                  <thead>
                    <tr>
                      <th scope="col" className="col-6" >Loại thanh toán</th>
                      <th scope="col" className="col-6">Số tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Tiền mặt</td>
                      <td>{moneyReceived.toLocaleString()} VND</td>
                    </tr>
                    <tr>
                      <td><button style={{fontSize:'20px'}} onClick={()=>{
                        dispatch(resetMoneyAction())
                        setExcessCash(0);
                        refMoney.current.value = ''
                      }} className="btn btn-outline-danger" >Reset</button></td>
                    </tr>
                  </tbody>
                </table>
                </div>
                <div style={{borderTop:'1px solid gray',fontSize:'18px'}} >
                    <div className="row" >
                        <p className="col-6" >Tiền thối</p>
                        {excessMoney >=0 ? <h5 className="col-6 text-right" >{excessMoney.toLocaleString()} VND</h5>  :
                          <h5 className="col-6 text-danger text-right" >Chưa đủ tiền</h5>  
                        }

                        
                    </div>
                    <div className="row" >
                        <div className="col-8" >
                                                    <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultValue id="defaultCheck1" />
                            <label className="form-check-label" htmlFor="defaultCheck1">
                                Khách không lấy lại tiền thừa
                            </label>
                            </div>

                        </div>
                        <div  className="col-4 text-right " >0</div>
                    </div>
                </div>
                
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
                <i class="fas fa-times mr-2"></i> Đóng
              </button>
              <button onClick={()=>{
                if(excessMoney > 0){
                  dispatch(thanhToanAction(Number(id)))
                }else{
                   Swal.fire({
                    icon: 'error',
                    title: 'Tiền khách thanh toán chưa đủ!',
                    text: 'Vui lòng thanh toán đủ để hoàn thành thanh toán',
                })
                }

              }} type="button" className="btn btn-primary">
              <i class="fas fa-donate mr-2"></i> Thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
