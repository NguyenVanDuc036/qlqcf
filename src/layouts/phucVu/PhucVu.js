import {  Dropdown, Menu, Radio, Space, Tabs } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { AudioOutlined, DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
// import 'primereact/resources/primereact.css';
// import 'primeflex/primeflex.css';

import "./phucVu.css";
import ChonNuoc from "./chonNuoc/ChonNuoc";
import WaterList from "./Order/WatersList/WaterList";
import Bills from "./Bills/Bills";
import ChuaChonMon from "./chuaChonMon/ChuaChonMon";
import { useDispatch, useSelector } from "react-redux";
import DanhSachBan from "./Map/DanhSachBan";
import ThongTinBan from "./Map/ThongTinBan";
import { layDanhSachNuocUongAction } from "../../redux/actions/QuanLyNuocUongAction";
import NotFoundWater from "./Order/NotFound/NotFoundWater";
import { changeTabActiveAction } from "../../redux/actions/QuanLyUngDung";
import Order from "./Order/Order";
import Swal from "sweetalert2";
import { Redirect } from "react-router-dom";
import { history } from "../../App";
import { layDanhSachBanAction } from "../../redux/actions/QuanLyBanAction";
import DanhSachOrder from './danhSachOrder/DanhSachOrder'
import { layDanhSachOrderAction, layDanhSachOrderDetailAction, layDanhSachOrderTakeAwayAction } from "../../redux/actions/QuanLyOrderAction";
const { Search } = Input;

const { TabPane } = Tabs;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);

export default function PhucVu() {

  useEffect(() => {
    dispatch(layDanhSachBanAction(""));
    // dispatch(layDanhSachOrderAction());
    dispatch(layDanhSachOrderDetailAction());

    
    if(!localStorage.getItem('userLogin')){
        Swal.fire({
         icon: 'error',
         title: 'Đăng nhập để tiếp tục :))',
         text: 'Bạn cần đăng nhập để tiếp tục duy trì!',
         footer: '<a href="/">Đăng nhập</a>'
       })
       history.push('/')
    }

    if(userLogin.position != 'phucVu'){
      Swal.fire({
        icon: 'error',
        title: 'Bạn không có quyền truy cập',
        text: 'Bạn cần đăng nhập bằng tài khoản của phục vụ!',
      })
      history.push('/')
    }


  }, []);


  const [size, setSize] = useState("large");

  const onChange = (e) => {
    setSize(e.target.value);
  };

  useEffect(() => {
    dispatch(layDanhSachNuocUongAction(""));
    dispatch(layDanhSachOrderTakeAwayAction(""))
  }, []);
  
  const { danhSachNuocUong } = useSelector(
    (state) => state.QuanLyNuocUongReducer
  );

  const { tongBanTrong } = useSelector(
    (state) => state.QuanLyBanReducer
  );




  const { chiTietBill } = useSelector(
    (state) => state.QuanLyNuocUongReducer
  );

  // const { danhSachOrder } = useSelector(
  //   (state) => state.QuanLyOrderReducer
  // );
const { danhSachOrder } = useSelector((state) => state.QuanLyPhaCheReducer);
const { danhSachOrderTakeAway } = useSelector((state) => state.QuanLyOrderReducer);



  // Lấy tabActive
  const { tabActive } = useSelector(
    (state) => state.QuanLyUngDung
  );
  
  var userLogin =  {name:''};
  if(localStorage.getItem('userLogin')){
   userLogin = JSON.parse(localStorage.getItem('userLogin'));
  }
  const dispatch = useDispatch()
  


  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <h5
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.antgroup.com"
              onClick={()=>{
                localStorage.removeItem('userLogin');
                history.push('/')
              }}
            >
              <i class="fas mr-2 fa-sign-out"></i>Đăng xuất
            </h5>
          ),
        },
      ]}
    />
  );

  const operations = (
    <Fragment>
      <div className="d-flex info mr-4">
        <img
          className="mr-4"
          style={{ width: "50px" }}
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        />
        <Dropdown overlay={menu}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <h4>
                {userLogin ? userLogin.name : <></>}
              </h4>
              <i
                style={{ fontSize: "20px", marginBottom: "1.3rem" }}
                class="fas fa-sort-down"
              ></i>
              {/* <DownOutlined /> */}
            </Space>
          </a>
        </Dropdown>
      </div>
    </Fragment>
  );
 




  const onSearchWater =(value) => {
    dispatch(layDanhSachNuocUongAction(value));
  }


  const handleChangeWater = (value) => {
    dispatch(layDanhSachNuocUongAction(value.target.value));
  }
  

  
  return (
    <div className="phucvu" >
      <Tabs
      className="phucvu-tab"
        type="card"
        activeKey={tabActive}
        tabBarExtraContent={operations}
        onChange={(key)=>{
          dispatch(changeTabActiveAction(key))
        }}
        size={size}
        style={{
          marginBottom: 32,
        }}
      >
        <TabPane
          className="menu mt-2"
          tab={
            <>
              <i class="fas fa-edit"></i>
              <span>Order</span>
            </>
          }
          key="1"
        >
          <DanhSachOrder danhSachOrderTakeAway={danhSachOrderTakeAway} danhSachOrder={danhSachOrder}/>
        </TabPane>
        
        <TabPane
          className="menu tab-sodo"
          tab={
            <>
              <i class="fas fa-map"></i>
              <span>Sơ đồ</span>
            </>
          }
          key="2"
        >
          <ThongTinBan/>
          <DanhSachBan/>
          
          
        </TabPane>
        <TabPane
          className="menu plush-order"
          tab={
            <>
              <i class="fas fa-plus"></i>
              <span>Order</span>
            </>
          }
          key="3"
        >
          <Order tongBanTrong={tongBanTrong} danhSachNuocUong={danhSachNuocUong} chiTietBill={chiTietBill}/>
        </TabPane>
      </Tabs>
    </div>
  );
}
