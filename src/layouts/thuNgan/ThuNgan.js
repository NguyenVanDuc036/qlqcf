import { Dropdown, Menu, Radio, Space, Tabs } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { AudioOutlined, DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { Button } from "primereact/button";
import "./thungan.css";

import { useDispatch, useSelector } from "react-redux";
import { changeTabActiveAction } from "../../redux/actions/QuanLyUngDung";
import Swal from "sweetalert2";
import { Redirect } from "react-router-dom";
import { history } from "../../App";
import {
  layDanhSachOrderAction,
  layDanhSachOrderDetailAction,
} from "../../redux/actions/QuanLyOrderAction";
import DanhSachOrder from "./danhSachOrder/DanhSachOrder";

import { Checkbox, Col, Row } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import { RadioButton } from "primereact/radiobutton";
import ChiTiet from "./ChiTiet/ChiTiet";
import TinhTien from "./TinhTien/TinhTien";
import HoaDon from "./HoaDon/HoaDon";

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

export default function PhucVu() {
  const categories = [
    { name: "Accounting", key: "A" },
    { name: "Marketing", key: "M" },
    { name: "Production", key: "P" },
    { name: "Research", key: "R" },
  ];
  const [city, setCity] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(categories[1]);

  const { chiTietBill } = useSelector((state) => state.QuanLyPhaCheReducer);

  console.log('ccc' , chiTietBill);
  useEffect(() => {
    dispatch(layDanhSachOrderDetailAction());
    if (!localStorage.getItem("userLogin")) {
      Swal.fire({
        icon: "error",
        title: "????ng nh???p ????? ti???p t???c :))",
        text: "B???n c???n ????ng nh???p ????? ti???p t???c duy tr??!",
        footer: '<a href="/">????ng nh???p</a>',
      });
      history.push("/");
    }


    // if(userLogin.position != 'thuNgan'){
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'B???n kh??ng c?? quy???n truy c???p',
    //     text: 'B???n c???n ????ng nh???p b???ng t??i kho???n c???a thu ng??n!',
    //   })
    //   history.push('/')
    // }

  }, []);

  const { danhSachOrder } = useSelector((state) => state.QuanLyOrderReducer);

  const [size, setSize] = useState("large");

  const onChange = (e) => {
    setSize(e.target.value);
  };

  // L???y tabActive
  const { tabActive } = useSelector((state) => state.QuanLyUngDung);

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
              <i class="fas mr-2 fa-sign-out"></i>????ng xu???t
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
              <span>Thanh to??n</span>
            </>
          }
          key="2"
        >
          <TinhTien
            id={chiTietBill[0].id}
            ban={chiTietBill[0].ban}
            area={chiTietBill[0].area}
            moneyToPay={chiTietBill[0].total}
          />

          <div className="row">
            <div className="col-4 khuyen-mai">
              <div className="card">
                <div className="card-header ">
                  <h4>
                    <img width={60} src="img/voucher.png" />
                    <span className="ml-3">M?? ??u ????i</span>
                  </h4>
                  <Space className="mr-5 pb-2" direction="vertical">
                    <Search
                      placeholder="Nh???p m?? ??u ????i"
                      onSearch={onSearch}
                      onChange={handleChange}
                      style={{
                        width: 300,
                      }}
                    />
                  </Space>
                </div>
              </div>
              <div className="card">
                <div className="card-header  bg-light">
                  <h4>
                    <i class="fas fa-gifts mr-2"></i>
                    <span>Ch????ng tr??nh khuy???n m???i</span>
                  </h4>
                </div>
                <div className="card-body km">
                  <div>
                    <div className="">
                      <div className="field-radiobutton">
                        <RadioButton
                          inputId="city1"
                          name="city"
                          value="Chicago"
                          onChange={(e) => setCity(e.value)}
                          checked={city === "Chicago"}
                        />
                        <label htmlFor="city1">T???ng 7UP cho kh??ch h??ng</label>
                      </div>
                      <div className="field-radiobutton">
                        <RadioButton
                          inputId="city2"
                          name="city"
                          value="Los Angeles"
                          onChange={(e) => setCity(e.value)}
                          checked={city === "Los Angeles"}
                        />
                        <label htmlFor="city2">
                          Gi???m 20% cho to??n b??? ????n h??ng
                        </label>
                      </div>
                      <div className="field-radiobutton">
                        <RadioButton
                          inputId="city3"
                          name="city"
                          value="New York"
                          onChange={(e) => setCity(e.value)}
                          checked={city === "New York"}
                        />
                        <label htmlFor="city3">
                          Gi???m 50k cho ????n h??ng t???i ??a 400k
                        </label>
                      </div>
                      <div className="field-radiobutton">
                        <RadioButton
                          disabled={true}
                          inputId="city4"
                          name="city"
                          value="San Francisco"
                          onChange={(e) => setCity(e.value)}
                          checked={city === "San Francisco"}
                        />
                        <label htmlFor="city4">
                          Gi???m 25% cho ????n h??ng t???i ??a 300k
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ChiTiet chiTietBill={chiTietBill} />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}
