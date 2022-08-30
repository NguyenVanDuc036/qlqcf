import React, { Fragment, useEffect } from "react";
import { Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { layDanhSachNhanVienAction, xoaNhanVienAction } from "../../../../redux/actions/QuanLyNhanVienAction";
import axios from "axios";
import { Input, Space , Tooltip  } from "antd";
import { AudioOutlined, DeleteOutlined, EditOutlined, ProfileOutlined } from "@ant-design/icons";
import '../../employee/employeeList/employeeList.css'
import moment from 'moment';
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { history } from '../../../../App';
import { layDanhSachNuocUongAction, xoaNuocUongAction } from "../../../../redux/actions/QuanLyNuocUongAction";
import { layDanhSachHangHoaAction } from "../../../../redux/actions/QuanLyHangHoaAction";

export default function GoodsList() {
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
          <img style={{width:'140px',height:'80px',objectFit:'cover'}} src={goods.imgSrc}/>
        </Fragment>
      }
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (text, goods) => {
        return <Fragment>

          {goods.status == 'Còn hàng' ? <div className="conHang" style={{color:'green'}}><p>Còn hàng</p></div> : <div className="hetHang" style={{color:'red'}}><p>Hết hàng</p></div>}
        </Fragment>
      }
    },
    {
      title: 'Tác vụ',
      dataIndex: 'hanhDong',
      render: (text, goods) => {
          return <Fragment>
              <div className="flex" >
              <Tooltip title="Cập nhật">
                  <NavLink key={1} className="mr-3 text-blue-700 text-xl" to={`/admin/water/updatewater/${goods.id}`}><EditOutlined style={{fontSize:'25px', color:'#1890ff'}} /></NavLink>
              </Tooltip>
              <Tooltip title="Xóa">
              <span onClick={()=>{

                      
                  Swal.fire({
                    title: `Bạn có chắc muốn xóa ${goods.name} `,
                    text: "Bạn sẽ không thể hoàn nguyên lại !",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Đồng ý!',
                    cancelButtonText: 'Hủy'
                  }).then((result) => {
                    if (result.isConfirmed) {

                      dispatch(xoaNuocUongAction(goods.id))

                      Swal.fire(
                        'Xóa thành công!',
                        `Bạn đã xóa ${goods.name}`,
                        'success'
                      )
                    }
                  })
                  }} key={2} className="text-xl mr-3 cursor-pointer text-red-600" ><DeleteOutlined style={{fontSize:'25px', color:'red'}} /></span>

              </Tooltip>
              </div>
          </Fragment>
      },
      sortDirections: ['descend'],
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
      <div className="card">
        <div className="card-header">
          <h3>Danh sách nước uống</h3>
        </div>
        <div  className="card-body">
          <div className="d-flex" >
            <Space className="mb-5" direction="vertical">
              <Search
                placeholder="Tìm kiếm hàng hóa"
                onSearch={onSearch}
                style={{ width: 200 }}
                onChange={handleChange}
              />
            </Space>
            <button  style={{height:'45px'}} onClick={()=>{
              history.push('/admin/water/addwater')
            }} className=" p-2 btn-them  ml-5" >Thêm nước uống</button>


          </div>
         
          <Table className="nhanvien" scroll={{ y: 720 , x : 1100}}   columns={columns} dataSource={data} onChange={onChange} />
        </div>
      </div>
    </div>
  );
}
    