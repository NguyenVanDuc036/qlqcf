import { Dropdown, Menu, Radio, Space, Tabs, Tooltip } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { AudioOutlined, DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { Button } from "primereact/button";
import "./phaChe.css";

import { useDispatch, useSelector } from "react-redux";
import { changeTabActiveAction } from "../../redux/actions/QuanLyUngDung";
import Swal from "sweetalert2";
import { Redirect } from "react-router-dom";
import { history } from "../../App";
import { layDanhSachOrderAction, layDanhSachOrderDetailAction } from "../../redux/actions/QuanLyOrderAction";
import DanhSachOrder from "./danhSachOrder/DanhSachOrder";
import ChiTiet from "./chiTiet/ChiTiet";

import { Checkbox, Col, Row } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";


import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import { RadioButton } from 'primereact/radiobutton';
import CapNhatNuocUong from "./CapNhatNuocUong/CapNhatNuocUong";


const { Search } = Input;

const onChangeCheckBox = (checkedValues) => {
  console.log("checked = ", checkedValues);
};

const { TabPane } = Tabs;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);

export default function PhaChe() {


  const categories = [{name: 'Accounting', key: 'A'}, {name: 'Marketing', key: 'M'}, {name: 'Production', key: 'P'}, {name: 'Research', key: 'R'}];
  const [city, setCity] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(categories[1]);

  
  useEffect(() => {
    dispatch(layDanhSachOrderDetailAction());
    if (!localStorage.getItem("userLogin")) {
      Swal.fire({
        icon: "error",
        title: "Đăng nhập để tiếp tục :))",
        text: "Bạn cần đăng nhập để tiếp tục duy trì!",
        footer: '<a href="/">Đăng nhập</a>',
      });
      history.push("/");
    }


    // if(userLogin.position != 'phaChe'){
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Bạn không có quyền truy cập',
    //     text: 'Bạn cần đăng nhập bằng tài khoản của pha chế!',
    //   })
    //   history.push('/')
    // }


  }, []);

  const { danhSachOrder } = useSelector((state) => state.QuanLyPhaCheReducer);

  const [size, setSize] = useState("large");

  const onChange = (e) => {
    setSize(e.target.value);
  };

  // Lấy tabActive
  const { tabActive } = useSelector((state) => state.QuanLyUngDung);
  const { chiTietBill } = useSelector((state) => state.QuanLyPhaCheReducer);



  var userLogin = { name: "" };
  if (localStorage.getItem("userLogin")) {
    userLogin = JSON.parse(localStorage.getItem("userLogin"));
  }
  const dispatch = useDispatch();

  const onSearch = (value) => {};
  const handleChange = (value) => {};

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
              onClick={() => {
                localStorage.removeItem("userLogin");
                history.push("/");
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
              <h4>{userLogin ? userLogin.name : <></>}</h4>
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

  return (
    <div className="thungan">
      <Tabs
        className="phucvu-tab"
        type="card"
        activeKey={tabActive}
        tabBarExtraContent={operations}
        onChange={(key) => {
          dispatch(changeTabActiveAction(key));
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
          <DanhSachOrder danhSachOrder={danhSachOrder} />
        </TabPane>

        <TabPane

          className="menu mt-2"
          tab={
            <>
              <i class="fas text-info fa-calculator"></i>
              <span>Chi tiết</span>
            </>
          }
          key="2"
        >
          <ChiTiet chiTietBill={chiTietBill} />
        </TabPane>
        <TabPane

          className="menu mt-2"
          tab={
            <>
              <i class="fas text-warning fa-edit"></i>
              <span>Quản lý nước uống</span>
            </>
          }
          key="3"
        >
          <CapNhatNuocUong/>
        </TabPane>
      </Tabs>
    </div>
  );
}
