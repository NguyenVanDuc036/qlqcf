import React, { Fragment } from 'react'
import {Tabs,Space ,Input } from "antd";
import Bills from '../Bills/Bills'
import { Tooltip } from 'antd';
import '../Bills/Bills.css'
import { useDispatch } from 'react-redux';
import { huyOrderAction, layDanhSachBangTableService } from '../../../redux/actions/QuanLyOrderAction';
import Swal from 'sweetalert2';
import NotFoundWater from '../Order/NotFound/NotFoundWater';
import { updateBillAction } from '../../../redux/actions/QuanLyNuocUongAction';
import { chonBanAction } from '../../../redux/actions/QuanLyBanAction';
import { useSelector } from 'react-redux';
const { TabPane } = Tabs;
export default function DanhSachOrder(props) {


  

    const dispatch = useDispatch()
    const {danhSachOrder} = props;
    const {danhSachOrderTakeAway} = props



    const { Search } = Input;
    const onSearch = (value) => {
      const id = {id:value}
      dispatch(layDanhSachBangTableService(id))
    }
    const handleChange = (value) => {
      const id = {id:value.target.value}
      dispatch(layDanhSachBangTableService(id))
    }

    const operationsOders = (
        <Fragment>
          <Space className="mr-5" direction="vertical">
            <Search
              placeholder="Tìm số bàn"
              onSearch={onSearch}
              onChange={handleChange}
              style={{
                width: 200,
              }}
            />
          </Space>
        </Fragment>
      );

      const danhSachOrderUpdate = []
      const danhSachOrderTakeAwayUpdate = []

      for(var i = 0 ; i<danhSachOrder.length ; i++){
        if(danhSachOrder[i][0].statusBill == 1 || danhSachOrder[i][0].statusBill == 0){
          danhSachOrderUpdate.push(danhSachOrder[i])
        }
      }

      for(var i = 0 ; i<danhSachOrderTakeAway.length ; i++){
        if(danhSachOrderTakeAway[i][0].statusBill == 3){
          danhSachOrderTakeAwayUpdate.push(danhSachOrderTakeAway[i])
        }
      }


      const renderBill =() => {
          return danhSachOrderUpdate.map((bill, index)=>{
            if(bill[0].statusBill == 0 || bill[0].statusBill == 1){
              var status = ''
              var statusCss = ''
              var cancelDisable = false;
              if(bill[0].status == 0){
                status = 'Chờ pha chế'
                statusCss ='text-warning'
              }else{
                status = 'Pha chế xong'
                statusCss ='text-success'
              }

              return   <div className="col-3 pt-2 order-item" >
              <div className="card card-order" >
                <div className="card-header bg-light" >
                    <div className="col-5" >
                      <span className='h5' >{bill[0].ban}</span>
                    </div>
                    <div className="col-7 p-0" style={{textAlign:'right'}} >
                      <span className={`h5 ${statusCss}`} >{status}</span>
                    </div>
                </div>
                <div className="card-body" >
                  <table style={{width:'100%'}} >
                  <tr >
                      <td style={{padding:'0 22px'}}  colSpan={2} rowSpan={2} className="h5 text-center" >
                        Tầng:{bill[0].area}
                      </td>
                      <td colSpan={2} className="h5  text-center">
                        {bill[0].total.toLocaleString()}VND
                      </td>
                    </tr>    
                    <tr>
    <td className="text-center minutes " colSpan={4} >
      <div>
      <i className="float-start mr-1 text-success fa fa-clock"> 
          
          </i><span className='text-dark h5' >1'</span>
      </div>
      <img  src="img/drinks.png" style={{width:'45%'}} />
    </td>
  </tr>                     
                  </table>
                </div>
                <div className="card-footer " >
                  <table>
                    <thead>
                    <Tooltip title="Chỉnh sửa">


                      <th onClick={ async ()=>{
                        if(bill[0].status ==0){
                          await dispatch(updateBillAction(bill))
                          const table = {
                            area : bill[0].area,
                            name : bill[0].ban,
                            numberOfSeat : bill[0].numberOfSeat,
                            id : bill[0].tableId
                          }
                          await dispatch(chonBanAction(table))
                        }else{
                          Swal.fire(
                            'Opps...',
                            `Bạn không thể hủy hóa đơn khi đã hoàn thành pha chế!`,
                            'error'
                          )
                        }
                        
                      }} ><i class="fas text-primary fa-pen-alt"></i></th>
                      </Tooltip>
                      
                      <Tooltip title="Hủy hóa đơn">
                      <th  onClick={()=>{
                          if(bill[0].status ==0){
                            Swal.fire({
                              title: `Bạn có chắc chắn hủy hóa đơn ${bill[0].ban} `,
                              text: "Bạn sẽ không thể hoàn nguyên lại !",
                              icon: 'warning',
                              showCancelButton: true,
                              confirmButtonColor: '#3085d6',
                              cancelButtonColor: '#d33',
                              confirmButtonText: 'Đồng ý!',
                              cancelButtonText: 'Hủy'
                            }).then((result) => {
                              if (result.isConfirmed) {
          
                                dispatch(huyOrderAction(bill[0].id))
          
                                Swal.fire(
                                  'Hủy hóa đơn thành công!',
                                  `Bạn đã hủy thành công hóa đơn ${bill[0].ban}`,
                                  'success'
                                )
                              }
                            })
                          }else{
                            Swal.fire(
                              'Bạn không thể hủy hóa đơn khi đã pha chế xong!',
                              `Oops...`,
                              'error'
                            )
                          }
                         
                        
                      }} ><i class="fas text-danger fa-window-close"></i></th>
                      </Tooltip>
                      <Tooltip title="Khác">
                      <th><i class="fas fa-ellipsis-h"></i></th>
                      </Tooltip>
                      
                    </thead>
                    
                  </table>

                </div>
              </div>
            </div>
            }

              
          })
      }

      const renderBillMangVe =() => {
        return danhSachOrderTakeAwayUpdate.map((bill, index)=>{
          // if(bill[0].statusBill == 3){
            var status = ''
            var statusCss = ''
            var cancelDisable = false;
            if(bill[0].statusBill == 3){
              status = 'Chờ pha chế'
              statusCss ='text-warning'
            }else{
              status = 'Pha chế xong'
              statusCss ='text-success'
            }

            return   <div className="col-3 pt-2 order-item" >
            <div className="card card-order" >
              <div className="card-header bg-light d-inline text-center" >
                  <div className=" p-0" style={{textAlign:'center'}} >
                    <h4 className='m-0' >Mang về</h4>
                  </div>
              </div>
              <div className="card-body" >
                <table style={{width:'100%'}} >
                <tr >
                    {/* <td style={{padding:'0 22px'}}  colSpan={2} rowSpan={2} className="h5 text-center" >
                      Tầng:{bill[0].area}
                    </td> */}
                    <td colSpan={2} className="h5 py-3   text-center">
                    <i class="fas fa-donate text-warning mr-2"></i><span >Tổng tiền :</span> <span className='text-danger' >{bill[0].total.toLocaleString()}VND</span> 
                    </td> 
                  </tr>    
                  <tr>
  <td className="text-center minutes " colSpan={4} >
    <div>
    <div className="p-0" style={{textAlign:'right'}} >
                    <span className={`h5 ${statusCss}`} >{status}</span>
                  </div>
    </div>
    <img  src="img/juice.png" style={{width:'30%'}} />
  </td>
</tr>                     
                </table>
              </div>
              <div className="card-footer " >
                <table>
                  <thead>
                  <Tooltip title="Chỉnh sửa">


                    <th onClick={ async ()=>{
                      if(bill[0].status ==0){
                        await dispatch(updateBillAction(bill))
                        const table = {
                          area : bill[0].area,
                          name : bill[0].ban,
                          numberOfSeat : bill[0].numberOfSeat,
                          id : bill[0].tableId
                        }
                        await dispatch(chonBanAction(table))
                      }else{
                        Swal.fire(
                          'Opps...',
                          `Bạn không thể hủy hóa đơn khi đã hoàn thành pha chế!`,
                          'error'
                        )
                      }
                      
                    }} ><i class="fas text-primary fa-pen-alt"></i></th>
                    </Tooltip>
                    
                    <Tooltip title="Hủy hóa đơn">
                    <th  onClick={()=>{

                        if(bill[0].status ==0){
                          Swal.fire({
                            title: `Bạn có chắc chắn hủy hóa đơn ? `,
                            text: "Bạn sẽ không thể hoàn nguyên lại !",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Đồng ý!',
                            cancelButtonText: 'Hủy'
                          }).then((result) => {
                            if (result.isConfirmed) {
        
                              dispatch(huyOrderAction(bill[0].id))
        
                              Swal.fire(
                                'Hủy hóa đơn thành công!',
                                `Bạn đã hủy thành công hóa đơn `,
                                'success'
                              )
                            }
                          })
                        }else{
                          Swal.fire(
                            'Bạn không thể hủy hóa đơn khi đã pha chế xong!',
                            `Oops...`,
                            'error'
                          )
                        }
                       
                      
                    }} ><i class="fas text-danger fa-window-close"></i></th>
                    </Tooltip>
                    <Tooltip title="Khác">
                    <th><i class="fas fa-ellipsis-h"></i></th>
                    </Tooltip>
                    
                  </thead>
                  
                </table>

              </div>
            </div>
          </div>
          // }

            
        })
    }

  return (
    <Tabs
            tabBarExtraContent={operationsOders}
            defaultActiveKey="1"
            type="card"
            size='large'
          >
            <TabPane className="menu-item tab-border" tab={`Chờ thanh toán (${danhSachOrderUpdate.length})`} key="1">
              {/* <Bills/> */}
              <div className="content-top bill-card p-4" >
                <div className="row" >
                  { danhSachOrderUpdate.length !== 0 ?renderBill() : <NotFoundWater message="Hiện tại chưa có order nào!" />}
                    
            </div>
            </div>
              <div  className="content-bottom">
                <h5 className="p-3"  >Tổng số order : <span className="text-success" >{danhSachOrderUpdate.length}</span></h5>
              </div>
            </TabPane>
            <TabPane className="menu-item" tab={`Mang về  (${danhSachOrderTakeAwayUpdate.length}) `} key="2">
            <div className="content-top bill-card p-4" >
                <div className="row" >
                  { danhSachOrderTakeAwayUpdate.length !== 0 ?renderBillMangVe(): <NotFoundWater message="Hiện tại chưa có order nào!" />}
                    
            </div>
            </div>
              <div  className="content-bottom">
                <h5 className="p-3"  >Tổng số order : <span className="text-success" >{danhSachOrderTakeAwayUpdate.length}</span></h5>
              </div>
            </TabPane>
            {/* <TabPane className="menu-item" tab="Đặt trước (0) " key="3"></TabPane> */}

          </Tabs>
  )
}
