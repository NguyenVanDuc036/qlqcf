import React, { Fragment, useEffect } from "react";
import { Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Input, Space , Tooltip  } from "antd";
import { AudioOutlined, DeleteOutlined, EditOutlined, ProfileOutlined } from "@ant-design/icons";
import moment from 'moment';
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { capNhatConHangAction, capNhatHetHangAction, layDanhSachNuocUongAction } from "../../../redux/actions/QuanLyNuocUongAction";
import { history } from "../../../App";


export default function CapNhatNuocUong() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(layDanhSachNuocUongAction(""));
  }, []);

  const { danhSachNuocUong } = useSelector(
    (state) => state.QuanLyNuocUongReducer
  );
    var data = []
  for(var i = 0 ; i<danhSachNuocUong.length ; i++){
    data.push(danhSachNuocUong[i][0])
  }


  const columns = [
    {
      title: "Mã nước uống",
      dataIndex: "id",
      sorter: {
        compare: (a, b) => a.id - b.id,
        multiple: 4,
      },
    },
    {
      title: "Tên hàng hóa",
      dataIndex: "name",
      sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 3,
      },
    },
    {
      title: "Giá nước uống",
      dataIndex: "price",
      sorter: {
        compare: (a, b) => a.price - b.price,
        multiple: 3,
      },
    },
    {
      title: "Kích thước",
      dataIndex: "size",
      sorter: {
        compare: (a, b) => a.size - b.size,
        multiple: 3,
      },
    },
    {
      title: "Hình ảnh",
      dataIndex: "srcImg",
      render: (text, goods) => {
        return <Fragment>
          <img style={{width:'100px',height:'50px',objectFit:'cover',borderRadius:'7px'}} src={goods.imgSrc}/>
        </Fragment>
      }
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (text, goods) => {
        return <Fragment>
            <Tooltip title={goods.status}>
                {goods.status == 'Còn hàng' ? <div onClick={()=>{
                    dispatch(capNhatHetHangAction(goods.name))
                }} className="conHang btn" style={{color:'green'}}><p>Còn hàng</p></div> : <div onClick={()=>{
                    dispatch(capNhatConHangAction(goods.name))
                }} className="hetHang btn" style={{color:'red'}}><p>Hết hàng</p></div>} 
            </Tooltip>
        </Fragment>
      }
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
  const onSearch = (value) => {
    dispatch(layDanhSachNuocUongAction(value))
  }

  const handleChange = (value) => {
    dispatch(layDanhSachNuocUongAction(value.target.value))
  }
  
  
  



  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <div className="p-3">
      <div className="card hangBan">
        <div className="card-header d-flex">
          <h3 className=" text-dark mr-5" >Danh sách nước uống</h3>
          <Space className="mb-5" direction="vertical">
              <Search
                placeholder="Tìm kiếm hàng hóa"
                onSearch={onSearch}
                style={{ width: 200 }}
                onChange={handleChange}
              />
            </Space>
        </div>
        <div  className="card-body">
          <div className="d-flex" >
            

          </div>
         
          <Table className="nhanvien" scroll={{ y: 400 , x : 1100}}   columns={columns} dataSource={data} onChange={onChange} />
        </div>
      </div>
    </div>
  );
}
    