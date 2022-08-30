import React, { Fragment, useEffect } from "react";
import { Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {  layChiTietNhanVien, layDanhSachCaLamAction } from "../../../../redux/actions/QuanLyNhanVienAction";
import axios from "axios";
import { LAY_DANH_SACH_NHAN_VIEN } from "../../../../redux/actions/types/QuanLyNhanVienType";
import { qlNhanVienService } from "../../../../service/QuanLyNhanVienService";
import { Input, Space } from "antd";
import { AudioOutlined, DeleteOutlined, EditOutlined, ProfileOutlined } from "@ant-design/icons";
import '../employeeList/employeeList.css'
import moment from 'moment';
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { history } from '../../../../App';

export default function Shifts(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(layDanhSachCaLamAction(props.match.params.id));
    dispatch(layChiTietNhanVien(props.match.params.id))
  }, []);

  const { danhSachCaLam } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );

  const { chiTietNhanVien } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );


  const data = danhSachCaLam
  const columns = [
    {
      title: "Mã ca làm",
      dataIndex: "id",
      sorter: {
        compare: (a, b) => a.id - b.id,
        multiple: 4,
      },
    },
    {
      title: "Tên ca",
      dataIndex: "name",
      sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 3,
      },
    },
    {
      title: "Ngày",
      dataIndex: "day",
      sorter: {
        compare: (a, b) => a.day - b.day,
        multiple: 2,
      },
    }, 
    {
      title: "Thời gian bắt đầu",
      dataIndex: "startTime",
      render: (text, user) => {
        return <Fragment>
            {moment(user.startedDate).format("DD-MM-YYYY")}
        </Fragment>
    },
    },  
    {
      title: "Thời gian kết thúc",
      dataIndex: "finishTime",
      sorter: {
        compare: (a, b) => a.position - b.position,
        multiple: 1,
      },
    },
  ];
  
  
  




  const { Search } = Input;
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1890ff",
      }}
    />
  );

  
  



  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <div className="p-3">
      <div className="card">
        <div className="card-header">
          <h3>Các ca làm việc của nhân viên {chiTietNhanVien.name}</h3>
        </div>
        <div  className="card-body">

        <button  style={{height:'45px',width:'13rem !important'}} onClick={()=>{
              history.push('/admin/employees')
            }} className=" p-2 btn-them mb-4  " >Danh sách nhân vên</button>
         
          <Table className="nhanvien" scroll={{ y: 720 , x : 1100}}   columns={columns} dataSource={data} onChange={onChange} />
        </div>
      </div>
    </div>
  );
}
