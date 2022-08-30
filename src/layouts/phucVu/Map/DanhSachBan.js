import React, { Fragment, useEffect } from "react";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  chiTietTangAction,
  chonBanAction,
  doiTrangThaiBanAction,
  layDanhSachBanAction,
} from "../../../redux/actions/QuanLyBanAction";
import { Tooltip } from "antd";
import { changeTabActiveAction } from "../../../redux/actions/QuanLyUngDung";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space } from "antd";

import "./Ban.css";
export default function DanhSachBan() {
  const dispatch = useDispatch();

  const { danhSachBan } = useSelector((state) => state.QuanLyBanReducer);
  useEffect(() => {
    dispatch(layDanhSachBanAction(""));
    dispatch(chiTietTangAction(danhSachBan[0]));
  }, []);

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <button  className="btn btn-info" >Bàn Bận</button>
          ),
        },
      ]}
    />
  );

  const onChange = (key) => {
    dispatch(chiTietTangAction(danhSachBan[key]));
  };

  const { TabPane } = Tabs;

  const renderDanhSachBan = () => {
    var tableImg;
    var cssImg = false;
    var classDPV = "";

    return danhSachBan.map((tang, index) => {
      return (
        <TabPane
          onClick={(e) => {
            console.log(e);
          }}
          className="menu-item"
          tab={
            <span>
              <i class="fas fa-square mr-3"></i> Tầng {tang[index].area} (
              {tang.length})
            </span>
          }
          key={index}
        >
          <div className="tang">
            <div style={{ marginTop: "10rem" }} className="hangBan row">
              {tang.map((ban, index) => {
                if (ban.status == "Trống") {
                  tableImg = "img/trong.png";
                  cssImg = false;
                } else if (ban.status == "Đang phục vụ" || ban.state == "Đang bận") {
                  tableImg = "img/banvu.png";
                  cssImg = true;
                  classDPV = "banDangPhucVu";
                } else {
                  tableImg = "img/bantruoc.png";
                  classDPV = "banDangPhucVu";
                  cssImg = true;
                }
                // <button  onClick={()=>{
                //   dispatch(doiTrangThaiBanAction(ban.id))
                // }} className="btn btn-info" >Bàn Bận</button>
                return (
                  <Dropdown
                    placement="top"
                    className={`col-2 mt-5 btn-ban ${classDPV}`}
                    overlay={ <Menu
                      items={[
                        {
                          key: "1",
                          label: (
                            <button  onClick={()=>{
                              dispatch(doiTrangThaiBanAction(ban.id))
                            }} className="btn btn-info" >Đổi trạng thái</button>
                          ),
                        },
                      ]}
                    />}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                      <button
                          disabled={cssImg}
                          onClick={() => {
                            dispatch(chonBanAction(ban));
                            dispatch(changeTabActiveAction(3));
                          }}
                          className={`btn-ban ${classDPV}`}
                        >
                            <img src={tableImg} />
                            <h5>{ban.name}</h5>
                        </button>
                        
                      </Space>
                    </a>
                  </Dropdown>

                );
              })}
            </div>
          </div>
        </TabPane>
      );
    });
  };
  return (
    <div className="map-bottom">
      <div className="entrance">
        <img src="img/entrance.png" />
      </div>
      <Tabs
        onChange={onChange}
        tabPosition="left"
        defaultActiveKey="0"
        type="card"
        size="large"
      >
        {renderDanhSachBan()}
      </Tabs>
    </div>
  );
}
